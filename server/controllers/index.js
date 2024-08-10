const ytdl = require("@distube/ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

exports.getVideoInfo = async (req, res) => {
	const videoUrl = req.query.url;
	if (!ytdl.validateURL(videoUrl)) {
		return res.status(400).send("Invalid YouTube URL");
	}
	try {
		const info = await ytdl.getInfo(videoUrl);
		const videoTitle = info.videoDetails.title;
		const url = info.videoDetails.video_url;
		const thumbnail =
			info.videoDetails.thumbnails[
				info.videoDetails.thumbnails.length - 1
			].url;
		const availableFormats = [
			...new Set(
				info.formats.map((format) => format.container).filter(Boolean)
			),
		];
		const qualityOptions = [
			...new Set(
				info.formats
					.map((format) => format.qualityLabel)
					.filter(Boolean)
			),
		];
		const authorName = info.videoDetails.author.name;
		return res.status(200).json({
			info: info,
			url: encodeURI(url),
			title: videoTitle,
			thumbnail: thumbnail,
			availableFormats: availableFormats,
			qualityOptions: qualityOptions,
			author: authorName,
		});
	} catch (err) {
		return res.status(500).send("Error processing video");
	}
};

// Function to validate the YouTube URL
const validateUrl = (url) => {
	return ytdl.validateURL(url);
};

// Function to download the video or audio stream
const downloadStream = (url, format, filePath) => {
	return new Promise((resolve, reject) => {
		ytdl(url, { format })
			.pipe(fs.createWriteStream(filePath))
			.on("finish", resolve)
			.on("error", reject);
	});
};

// Function to combine video and audio using ffmpeg
const combineVideoAudio = (videoPath, audioPath, outputPath) => {
	return new Promise((resolve, reject) => {
		ffmpeg()
			.input(videoPath)
			.input(audioPath)
			.output(outputPath)
			.on("end", resolve)
			.on("error", reject)
			.run();
	});
};

// Function to clean up temporary files
const cleanUpFiles = (files) => {
	files.forEach((file) => {
		fs.unlink(file, (err) => {
			if (err) console.error(`Error deleting file ${file}:`, err);
		});
	});
};

exports.download = async (req, res) => {
	const videoUrl = req.query.url;
	const selectedFormat = req.query.format;
	const quality = req.query.quality;
	if (!validateUrl(videoUrl)) {
		return res.status(400).send("Invalid YouTube URL");
	}

	try {
		const info = await ytdl.getInfo(videoUrl);
		let videoFormat = info.formats.find(
			(format) =>
				format.container === selectedFormat &&
				format.qualityLabel === quality &&
				format.hasVideo &&
				!format.hasAudio
		);
		const audioFormat = ytdl.chooseFormat(info.formats, {
			quality: "highestaudio",
		});

		// If the exact format and quality aren't found, select the next best quality
		if (!videoFormat) {
			const availableQualities = info.formats
				.filter(
					(f) =>
						f.container === selectedFormat &&
						f.hasVideo &&
						!f.hasAudio
				)
				.map((f) => ({
					format: f,
					quality: parseInt(f.qualityLabel.replace("p", ""), 10),
				}))
				.sort((a, b) => b.quality - a.quality);

			videoFormat =
				availableQualities.find(
					(f) => f.quality < parseInt(quality.replace("p", ""), 10)
				)?.format || availableQualities[0]?.format;
		}
		if (!videoFormat || !audioFormat) {
			return res.status(400).send("Invalid format or quality");
		}

		const videoTitle = info.videoDetails.title.replace(
			/[^a-zA-Z0-9 ]/g,
			""
		);
		const tempVideoPath = path.join(
			__dirname,
			`${uuidv4()}_video.${selectedFormat}`
		);
		const tempAudioPath = path.join(
			__dirname,
			`${uuidv4()}_audio.${audioFormat.container}`
		);
		const outputFilePath = path.join(
			__dirname,
			`${uuidv4()}_${videoTitle}.${selectedFormat}`
		);

		// Download video and audio streams
		await downloadStream(videoUrl, videoFormat, tempVideoPath);
		await downloadStream(videoUrl, audioFormat, tempAudioPath);

		// Combine video and audio
		await combineVideoAudio(tempVideoPath, tempAudioPath, outputFilePath);

		// Stream the combined file to the client
		res.setHeader(
			"Content-Disposition",
			`attachment; filename="${videoTitle}.${selectedFormat}"`
		);
		res.setHeader("Content-Type", videoFormat.mimeType.split(";")[0]);

		const readStream = fs.createReadStream(outputFilePath);
		readStream.pipe(res);

		// Cleanup temporary files after streaming
		readStream.on("close", () => {
			cleanUpFiles([tempVideoPath, tempAudioPath, outputFilePath]);
		});
	} catch (err) {
		console.error(err);
		if (!res.headersSent) {
			return res.status(500).send("Error processing video");
		}
	}
};
