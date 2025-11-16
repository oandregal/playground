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
- When using the display_code tool:
  * Always send COMPLETE HTML documents (starting with <!DOCTYPE html> or <html>)
  * If showing CSS, wrap it in <style> tags within a complete HTML document
  * If showing JavaScript, wrap it in <script> tags within a complete HTML document
  * Do not send code fragments - always provide a minimal but complete HTML structure
- If you don't know the answer, say "I don't know".
- Explain concepts clearly and concisely, and provide code examples.
- Do not get ahead of yourself, always go step-by-step.
`;

const tools = [
  {
    name: "display_code",
    description:
      "Display rendered code in the preview area using an iframe. Use this whenever you want to show code examples that will be rendered live for the user to see and interact with. This is perfect for demonstrating examples or showing code that users can experiment with.",
    input_schema: {
      type: "object",
      properties: {
        code: {
          type: "string",
          description:
            "A complete HTML document to display and render in the preview area. Must include <!DOCTYPE html> or <html> tags. If showing CSS, wrap it in <style> tags. If showing JavaScript, wrap it in <script> tags.",
        },
      },
      required: ["code"],
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
    };

    msg.content.forEach((block) => {
      if (block.type === "text") {
        response.message += block.text;
      } else if (block.type === "tool_use" && block.name === "display_code") {
        console.log(block.input);
        response.code = block.input.code;
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
