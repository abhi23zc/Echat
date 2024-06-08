import React from "react";

function Navbar() {
  return (
    <div className="w-full bg-gray-800 h-16 flex  justify-between">
      <div className="flex items-center justify-center">
        <img src="/zen.png" className="w-14 p-2" alt="" srcset="" />
        <h1 className="text-lg text-white ">Chathub</h1>
      </div>
      <button
        onClick={() => {
          localStorage.setItem("chatdata", null);
          window.location.href = "/";
        }}
        className="bg-gray-700 text-white p-2 rounded-md text-sm m-2"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
