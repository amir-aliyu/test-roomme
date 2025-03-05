import React from "react";

const App: React.FC = () => {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <button 
        onClick={handleClick} 
        className="px-6 py-3 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        Click Me
      </button>
    </div>
  );
};

export default App;
