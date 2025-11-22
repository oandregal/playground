import express from "express";
import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";
import displayTableDefinition from "./tools/display-table.js";

// Load environment variables from .env.local into process.env
dotenv.config({ path: ".env.local" });

const app = express();
app.use(express.json()); // Parse JSON request bodies
app.use(express.static("public"));

const SYSTEM_PROMPT = `
- You are an assistant that helps users visualize data in tables.
- You have a display-table tool available:
  * You must Use it when users ask to see tabular data or want to visualize data in a table format
  * Generate appropriate data based on the user's request (e.g., "show me a table of fruits" should generate fruit data)
  * Always provide both data (array of objects) and fields (array with id and label properties)
  * Each object in data should have properties matching the field ids
- If you don't know the answer, say "I don't know".
- Explain concepts clearly and concisely.
- Do not get ahead of yourself, always go step-by-step.
`;

const tools = [displayTableDefinition];

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
      code: {
        data: null,
        fields: null,
      },
    };

    msg.content.forEach((block) => {
      if (block.type === "text") {
        response.message += block.text;
      } else if (block.type === "tool_use" && block.name === "display-table") {
        response.code.data = block.input.data;
        response.code.fields = block.input.fields;
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
