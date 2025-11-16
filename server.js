import express from "express";
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const app = express();
app.use(express.static("."));

app.get("/api/chat", async (req, res) => {
  try {
    console.log("✅ API call successful!");

    res.json({
      success: true,
      message: "okay",
      usage: "usage",
    });
  } catch (error) {
    console.error("❌ API call failed:", error);

    res.status(500).json({
      success: false,
      error: "error.message",
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
  console.log("Chat API endpoint: http://localhost:3000/api/chat");
});
