const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "test-roomme-app")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "test-roomme-app", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
