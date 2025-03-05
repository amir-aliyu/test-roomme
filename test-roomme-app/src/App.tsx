import React, { useEffect, useState } from "react";

const LOGIN_REDIRECT = 'https://login.case.edu/cas/login'
const HOMEPAGE = 'https://test-roomme-fd000e69abe5.herokuapp.com/'
const VALIDATE = 'https://login.case.edu/cas/serviceValidate?ticket='

const App: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if CAS ticket is in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const ticket = urlParams.get("ticket");

    if (ticket) {
      console.log("CAS Ticket received:", ticket);

      // Send request to CAS server to validate the ticket
      const casValidateUrl = `${VALIDATE}${ticket}&service=${HOMEPAGE}`;

      fetch(casValidateUrl)
        .then((response) => response.text()) // Get the response as text (XML)
        // .then((xmlText) => {
        //   // Parse the XML text into an XML Document object
        //   const parser = new DOMParser();
        //   const xmlDoc = parser.parseFromString(xmlText, "application/xml");

        //   // Check if there was an authentication success in the XML response
        //   const authSuccess = xmlDoc.querySelector('cas\\:authenticationSuccess, authenticationSuccess');
        //   if (authSuccess) {
        //     // Extract the username from the XML
        //     const username = authSuccess.querySelector('cas\\:user, user')?.textContent;
        //     setUser(username || 'Unknown user');
        //   } else {
        //     setError("Invalid ticket or authentication failed");
        //   }
        // })
        .catch((error) => {
          console.error("Error during CAS validation:", error);
          setError("An error occurred while validating the ticket.");
        });
    }

      // // Query the CAS server
      // window.location.href = `${VALIDATE}${ticket}&service=${HOMEPAGE}`;
      
      
      // // Redirect the user back to homepage
      // window.location.href = `${HOMEPAGE}`;
    // }
  }, []);   

  const handleLogin = () => {
    // Redirect to CAS login with the service URL
    window.location.href = `${LOGIN_REDIRECT}?service=${encodeURIComponent(HOMEPAGE)}`;
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default App;
