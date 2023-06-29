import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

exports.handler = async function (event) {
    try {
        const response = await openai.createCompletion({
            model: 'davinci', // fine-tuned model name here if available. see https://platform.openai.com/docs/guides/fine-tuning
            prompt: event.body,
            presence_penalty: 0,
            frequency_penalty: 0.3,
            max_tokens: 500,
            temperature: 0,
            stop: ['->', '\n'] // stops the ai generating further text when it generates any string in provided array. stop strings are not included in the output
        })
        return {
            statusCode: 200,
            body: JSON.stringify({
                reply: response.data
            })
        }
    } catch (error) {
        return { statusCode: 500, body: error.toString() }
    }
};

