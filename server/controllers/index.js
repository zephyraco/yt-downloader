const ytdl = require("@distube/ytdl-core");
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

exports.download = async (req, res) => {
	const videoUrl = req.query.url;
	const selectedFormat = req.query.format;
	const quality = req.query.quality;

	if (!ytdl.validateURL(videoUrl)) {
		return res.status(400).send("Invalid YouTube URL");
	}

	try {
		const info = await ytdl.getInfo(videoUrl);
		const format = info.formats.find(
			(format) =>
				format.container === selectedFormat &&
				format.qualityLabel === quality
		);

		if (!format) {
			return res.status(400).send("Invalid format or quality");
		}

		const videoTitle = info.videoDetails.title.replace(
			/[^a-zA-Z0-9 ]/g,
			""
		);
		const fileName = `${videoTitle}.${selectedFormat}`;

		// Set headers before piping
		res.setHeader(
			"Content-Disposition",
			`attachment; filename="${fileName}"`
		);
		res.setHeader("Content-Type", format.mimeType.split(";")[0]);

		// Stream the video to the client
		const videoStream = ytdl(videoUrl, {
			format: format,
			highWaterMark: 1 << 30, // 1 GB buffer
			requestOptions: {
				headers: {
					"User-Agent":
						"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
					"Accept-Language": "en-US,en;q=0.8",
					Referrer: "https://www.youtube.com/",
				},
			},
		});
		console.log(";po");
		videoStream.on("error", (err) => {
			console.error("Stream error:", err);
			// Only send a response if it hasn't been sent yet
			if (!res.headersSent) {
				res.status(500).send("Error processing video");
			}
		});

		// Pipe the video stream to the response
		videoStream.pipe(res);
	} catch (err) {
		console.error(err);
		if (!res.headersSent) {
			return res.status(500).send("Error processing video");
		}
	}
};
