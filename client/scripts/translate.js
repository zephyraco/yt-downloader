const { readFileSync, writeFileSync, existsSync, mkdirSync } = require('fs');
const { join } = require('path');
const { gemini_translate } = require('./gemini_translator');
const { GoogleGenerativeAIFetchError, GoogleGenerativeAIError } = require('@google/generative-ai');

require('dotenv').config();

const targetLanguages = ['fr', 'es', 'hi', 'de', 'it', 'ar', 'zh', 'nl', 'ko'];

// Function to translate text
const translateText = async (data, targetLang) => {
    let retryCount = 0;
    const maxRetries = 3;
    const retryDelay = 30000;

    while (retryCount < maxRetries) {
        try {
            const response = await gemini_translate(data, targetLang);
            return response;
        } catch (error) {
            if (
                error instanceof GoogleGenerativeAIFetchError ||
                error instanceof GoogleGenerativeAIError
            ) {
                console.error(`Translation failed: ${error.message}`);
                retryCount++;
                if (retryCount < maxRetries) {
                    console.log(
                        `Retrying translation in ${retryDelay / 1000} seconds...`
                    );
                    await new Promise(resolve => setTimeout(resolve, retryDelay));
                } else {
                    console.error(`Maximum retries reached for translation`);
                    throw error;
                }
            } else {
                console.error(`Translation failed: ${error.message}`);
                break;
            }
        }
    }
};

// Function to translate JSON file
const translateFile = async (data, targetLang) => {
    const targetDir = join(__dirname, `../locales/${targetLang}`);
    if (!existsSync(targetDir)) {
        mkdirSync(targetDir, { recursive: true });
    }

    const targetFile = join(targetDir, 'messages.json');
    let translatedData = {};

    try {
        translatedData = await translateText(data, targetLang);
        const messages = JSON.parse(translatedData);
        writeFileSync(targetFile, JSON.stringify(messages, null, 2));
        console.log(`Translation for ${targetLang} complete`);
    } catch (error) {
        console.error(`Translation for ${targetLang} failed: ${error.message}`);
        throw error;
    }
};

const translateAllLanguages = async () => {
    const sourceFilePath = join(__dirname, '../locales/en/messages.json');
	const data = readFileSync(sourceFilePath, 'utf-8').replace(/\n/g, '');

	for (const targetLang of targetLanguages) {
		try {
			await translateFile(data, targetLang);
			console.log(`Translation for ${targetLang} complete`);
		} catch (err) {
			console.error(
				`Translation for ${targetLang} failed: ${err.message}`
			);
		}
	}
};

translateAllLanguages();
