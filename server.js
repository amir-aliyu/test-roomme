const express = require("express");
const axios = require("axios");
const path = require("path");
const cors = require("cors");
const { parseStringPromise } = require("xml2js");

const app = express();

// Enable CORS (Optional)
app.use(cors());

// Serve static frontend files
app.use(express.static(path.join(__dirname, "test-roomme-app", "dist")));

// Proxy CAS ticket validation request
app.get("/api/cas-validate", async (req, res) => {
  const { ticket, service } = req.query;
  if (!ticket || !service) {
    return res.status(400).json({ error: "Missing ticket or service" });
  }

  try {
    const casResponse = await axios.get("https://login.case.edu/cas/serviceValidate", {
      params: { ticket, service },
    });

    // Convert XML response to JSON
    const json = await parseStringPromise(casResponse.data);
    
    // Extract authentication result
    if (json["cas:serviceResponse"]["cas:authenticationSuccess"]) {
      const user = json["cas:serviceResponse"]["cas:authenticationSuccess"][0]["cas:user"][0];
      res.json({ authenticated: true, user });
    } else {
      res.json({ authenticated: false, error: "Invalid ticket" });
    }
  } catch (error) {
    res.status(500).json({ error: "CAS validation request failed" });
  }
});

// Serve React frontend for all routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "test-roomme-app", "dist", "index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));