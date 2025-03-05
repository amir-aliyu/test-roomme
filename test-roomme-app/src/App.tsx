import React, { useEffect } from "react";

const LOGIN_REDIRECT = 'https://login.case.edu/cas/login'
const HOMEPAGE = 'https://test-roomme-fd000e69abe5.herokuapp.com/'

const App: React.FC = () => {
  useEffect(() => {
    // Check if CAS ticket is in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const ticket = urlParams.get("ticket");

    if (ticket) {
      console.log("CAS Ticket received:", ticket);
      // You can now use the ticket for authentication
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
