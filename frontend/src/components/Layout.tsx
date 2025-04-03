import React from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
  resetApp: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, resetApp }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar resetApp={resetApp} />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default Layout;
