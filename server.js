import express from "express";
import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";

// Load environment variables from .env.local into process.env
dotenv.config({ path: ".env.local" });

const app = express();
app.use(express.json()); // Parse JSON request bodies
app.use(express.static("."));

const SYSTEM_PROMPT = `
- You are an assistant that helps users write and understand HTML, CSS, and JavaScript code.
- If you don't know the answer, say "I don't know".
- Explain concepts clearly and concisely, and provide code examples.
- Do not get ahead of yourself, always go step-by-step.
`;

const tools = [
  {
    name: "display_code",
    description:
      "Display code in the editor/preview area. Use this whenever you want to show code examples that the user should see rendered in the editor. This is perfect for demonstrating examples or showing code that users can experiment with.",
    input_schema: {
      type: "object",
      properties: {
        code: {
          type: "string",
          description: "The complete code to display in the editor",
        },
        language: {
          type: "string",
          description: "Programming language: one of 'html', 'css', 'js'.",
        },
      },
      required: ["code", "language"],
    },
  },
];

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    const msg = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
      tools,
    });

    console.log("✅ API call successful!");
    console.log(msg);

    const response = {
      message: "",
      code: null,
      language: null,
    };

    msg.content.forEach((block) => {
      if (block.type === "text") {
        response.message += block.text;
      } else if (block.type === "tool_use" && block.name === "display_code") {
        response.code = block.input.code;
        response.language = block.input.language;
      }
    });

    res.json(response);
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
