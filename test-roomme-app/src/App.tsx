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
        .then(response => response.json())
        .then(data => {
          console.log("Response JSON:", data);  // Logs the actual JSON data
          if (data.authenticated) {
            console.log("User authenticated:", data.user);
            // Store user info in state
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
