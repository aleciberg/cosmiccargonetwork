"use client";

import React from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
  currentStep?: "origin" | "destination" | "cargo" | "quote";
  originComplete?: boolean;
  destinationComplete?: boolean;
  cargoComplete?: boolean;
  quoteComplete?: boolean;
  onNewQuote?: () => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  currentStep = "origin",
  originComplete = false,
  destinationComplete = false,
  cargoComplete = false,
  quoteComplete = false,
  onNewQuote,
}) => {
  return (
    <div className="h-screen w-screen overflow-hidden flex bg-space-dark starfield">
      <Sidebar
        currentStep={currentStep}
        originComplete={originComplete}
        destinationComplete={destinationComplete}
        cargoComplete={cargoComplete}
        quoteComplete={quoteComplete}
        onNewQuote={onNewQuote}
      />
      <main className="flex-1 overflow-y-auto bg-space-dark">
        {children}
      </main>
    </div>
  );
};

export default Layout;

