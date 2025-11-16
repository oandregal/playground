import express from "express";

const app = express();

// Serve static files (index.html, index.js, etc.)
app.use(express.static("."));

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
