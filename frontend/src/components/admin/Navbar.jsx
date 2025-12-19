import React from "react";

const Navbar = ({ adminName, onLogout }) => {
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">Welcome, {adminName}</h1>
      <button
        className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        onClick={onLogout}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
