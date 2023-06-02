// server.js
const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/api/completion", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await openai.createCompletion({
      engine: "davinci-codex",
      prompt: prompt,
      max_tokens: 60,
    });
    res.json(response.data.choices);
  } catch (error) {
    console.error("Failed to fetch:", error);
    res.status(500).send(error);
  }
});

app.listen(3001, () => {
  console.log("Server is listening on port 3001");
});
