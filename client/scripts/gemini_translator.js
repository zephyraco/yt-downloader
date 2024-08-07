const { GoogleGenerativeAI } = require('@google/generative-ai');
const { GEMINI_API_KEY } = require('./keys');

const apiKey = GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const systemPrompt =
	'You will be provided with an object of keys as message key and values as english sentences/phrases, and a language code, you have to translate the english sentence/phrase into the language code provided and return an object of keys as original keys and values as translated values. For example, if the user prompt is [gm_msg: "Hello, good morning",  hru_msg: "Hey, how are you", misu_msg: "Long time no see"], "hi", then you have to translate all the sentences "Hello, good morning", "Hey, how are you" and "Long time no see" into Hindi. Return a string in an object format in the same order as you obtained them in the input. Don\'t add additional texts like here are the translations and/or english pronounciations.';

const model = genAI.getGenerativeModel({
	model: 'gemini-1.5-pro',
	systemInstruction: systemPrompt,
});

const generationConfig = {
	temperature: 0.4,
	topP: 0.95,
	topK: 64,
	maxOutputTokens: 8192,
	responseMimeType: 'text/plain',
};
async function gemini_translate(text, lang) {
	try {
		const chatSession = model.startChat({
			generationConfig,
			history: [
				{
					role: 'user',
					parts: [
						{
							text: '{gm_msg: "Hello, good morning", hru_msg: "Hey, how are you", m_msg: "Long time no see"}, "hi"',
						},
					],
				},
				{
					role: 'model',
					parts: [
						{
							text: '{"gm_msg": "नमस्ते, शुभ प्रभात","hru_msg": "अरे, तुम कैसे हो","m_msg": "बहुत दिनों बाद मिले"}',
						},
					],
				},
			],
		});

		const result = await chatSession.sendMessage(
			`${text}, "${lang}"\n`
		);
        console.log(result.response.text());
		return result.response.text();
	} catch (error) {
        console.log(error);
		throw error;
	}
}

module.exports = {
	gemini_translate,
};
