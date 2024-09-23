const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { question } = req.body;

        try {
            const response = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: question }],
                max_tokens: 4096,
            });
            res.status(200).json({ answer: response.data.choices[0].message.content });
        } catch (error) {
            console.error(error);
            res.status(500).json({ answer: "Error fetching answer from OpenAI." });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
