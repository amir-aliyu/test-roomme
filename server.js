const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 5000;

// Serve static files with proper MIME types
app.use(express.static(path.join(__dirname, "test-roomme-app", "dist"), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith(".js")) {
      res.setHeader("Content-Type", "application/javascript");
    }
  }
}));

// Handle all routes by serving index.html (for React Router)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "test-roomme-app", "dist", "index.html"));
});

// Use Heroku's assigned port or default to 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));