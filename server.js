import express from "express";
import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const app = express();
app.use(express.json()); // Parse JSON request bodies
app.use(express.static("."));

const SYSTEM_PROMPT = `
You are an assistant that helps users write and understand code using the @wordpress/packages library.
If you don't know the answer, say "I don't know".
Explain concepts clearly and concisely, and provide code examples.
Do not get ahead of yourself, always go step-by-step.
`;

const anthropic = new Anthropic();
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    const msg = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    });

    console.log("✅ API call successful!");
    console.log("Response:", msg);

    res.json(msg);
  } catch (error) {
    console.error("❌ API call failed:", error);

    res.status(500).json({
      success: false,
      error,
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
  console.log("Chat API endpoint: http://localhost:3000/api/chat");
});
