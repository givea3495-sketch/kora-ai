const express = require("express");
const path = require("path");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..")));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.json({
    message: "Kora AI backend is running 🌍"
  });
});

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({
      error: "Message is required"
    });
  }

  try {
    res.setHeader("Content-Type", "text/event-stream");
res.setHeader("Cache-Control", "no-cache");
res.setHeader("Connection", "keep-alive");

const stream = await openai.responses.create({
  model: "gpt-6-luna",
  input: userMessage,
  stream: true
});

for await (const event of stream) {
  if (event.type === "response.output_text.delta") {
    res.write(`data: ${JSON.stringify(event.delta)}\n\n`);
  }
}

res.write("data: [DONE]\n\n");
res.end();

  } catch (error) {
    console.error("OpenAI error:", error);

    res.status(500).json({
      error: "Kora could not reach the AI"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Kora backend running on port ${PORT}`);
});
