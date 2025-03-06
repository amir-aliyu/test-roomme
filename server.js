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
  const { ticket } = req.query;
  const service = "https://test-roomme-fd000e69abe5.herokuapp.com/";
  if (!ticket || !service) {
    return res.status(400).json({ error: "Missing ticket or service" });
  }

  try {
    const casResponse = await axios.get("https://login.case.edu/cas/serviceValidate", {
      params: { ticket, service },
    });

    // Check if the response is HTML (this indicates a login page or error)
  if (casResponse.data.includes("<html")) {
    // Log the HTML response for debugging purposes
    console.error("CAS response is an HTML error or login page.");
    
    // Redirect to the CAS login page
    const loginUrl = `https://login.case.edu/cas/login?service=${service}`;
    res.redirect(loginUrl);  // Redirect to the CAS login page

    return; // Exit after redirect
  }
  // console.log("the data is: " + casResponse.data)

  // If it's not HTML, attempt to parse the response as XML
  const json = await parseStringPromise(casResponse.data);

  console.log("CAS Response JSON:", JSON.stringify(json, null, 2));
    
    // Extract authentication result
    if (json["cas:serviceResponse"]["cas:authenticationSuccess"]) {
      const caseID = json["cas:serviceResponse"]["cas:authenticationSuccess"][0]["cas:user"][0];
      const firstName = json["cas:serviceResponse"]["cas:authenticationSuccess"][0]["cas:attributes"][0]["cas:givenName"][0];
      const lastName = json["cas:serviceResponse"]["cas:authenticationSuccess"][0]["cas:attributes"][0]["cas:sn"][0];
      res.json({ authenticated: true, caseID, firstName, lastName });
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