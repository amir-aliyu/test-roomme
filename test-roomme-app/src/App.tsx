import React, { useEffect } from "react";

const LOGIN_REDIRECT = 'https://login.case.edu/cas/login'
const HOMEPAGE = 'https://test-roomme-fd000e69abe5.herokuapp.com/'
// const VALIDATE = 'https://login.case.edu/cas/serviceValidate?ticket='

const App: React.FC = () => {
  // const [user, setUser] = useState<string | null>(null);
  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const ticket = urlParams.get("ticket");
  
    if (ticket) {
      fetch(`/api/cas-validate?ticket=${ticket}&service=${window.location.origin}`)
      .then(response => {
        // Check if the response is HTML (e.g., a login page)
        if (response.headers.get("content-type")?.includes("text/html")) {
          // If it's HTML, it means the CAS server is redirecting us to the login page
          window.location.href = "https://login.case.edu/cas/login?service=" + window.location.origin;
          return;  // Exit the function, no need to process further
        }

        // If it's JSON, continue processing the response
        return response.json();
      }).then(data => {
          console.log("Response JSON:", data);  // Logs the actual JSON data
          if (data.authenticated) {
            // Remove 'ticket' from the URL
            const newUrl = window.location.origin + window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
            console.log("User authenticated:", data.caseID); // Store user info in state
            // Show the message
            alert("Welcome, " + data.firstName + data.lastName + "!");
          } else {
            console.error("CAS authentication failed:", data.error);
          }
        })
        .catch(error => console.error("Error during CAS validation:", error));
    }
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
