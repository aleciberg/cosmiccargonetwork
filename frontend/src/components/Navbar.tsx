import React from "react";

interface NavbarProps {
  resetApp: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ resetApp }) => {
  return (
    <nav className="bg-miami-blue text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo or Branding */}
        <h1 className="text-xl font-bold text-miami-pink">
          <button onClick={resetApp}>Cosmic Cargo Network</button>
        </h1>

        {/* Navigation Links */}
        <div className="space-x-6">
          <a>Home</a>
          <a>Account</a>
          <a>Logout</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
