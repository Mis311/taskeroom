import { Configuration, OpenAIApi } from "openai";
import { NextApiHandler } from "next";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function generatePrompt(taskResult) {
  return `
    Based on the provided task result, provide a cheering feedback report. In case there are no clue, just complement the productivity level.

    Task Result: ${taskResult}
  `;
}

const Feedback = async (req, res) => {
    const { taskResult } = req.body;
    const prompt = generatePrompt(taskResult);
  
    try {
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.6,
        max_tokens: 100,
      });
  
      if (completion.data.choices && completion.data.choices.length > 0) {
        res.status(200).json({ feedback: completion.data.choices[0].text });
      } else {
        throw new Error("No choices returned from OpenAI API.");
      }
    } catch(error) {
      if (error.response) {
        console.error(error.response.status, error.response.data);
        res.status(error.response.status).json(error.response.data);
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
        res.status(500).json({
          error: {
            message: 'An error occurred during your request.',
          }
        });
      }
    }
  }
  
export default Feedback
