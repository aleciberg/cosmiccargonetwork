"use client";

import React, { useState } from "react";
import Link from "next/link";
import ProgressTracker from "./ProgressTracker";
import AuthModal from "./AuthModal";
import { useAuth } from "../lib/auth";

interface SidebarProps {
  currentStep: "origin" | "destination" | "cargo" | "quote";
  originComplete: boolean;
  destinationComplete: boolean;
  cargoComplete: boolean;
  quoteComplete: boolean;
  onNewQuote?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  currentStep,
  originComplete,
  destinationComplete,
  cargoComplete,
  quoteComplete,
  onNewQuote,
}) => {
  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <aside className="w-64 bg-space-gray border-r-2 border-nebula-purple flex flex-col h-full overflow-hidden glow-purple">
        {/* Logo/Header */}
        <div className="p-6 border-b-2 border-nebula-purple">
          <Link href="/">
            <h1 className="text-2xl font-bold text-nebula-purple-light">
              Cosmic Cargo
            </h1>
            <p className="text-sm text-starlight-gray">Network</p>
          </Link>
        </div>

        {/* Progress Tracker */}
        <div className="flex-1 p-6 overflow-y-auto">
          <ProgressTracker
            currentStep={currentStep}
            originComplete={originComplete}
            destinationComplete={destinationComplete}
            cargoComplete={cargoComplete}
            quoteComplete={quoteComplete}
          />
        </div>

        {/* Auth + Actions */}
        <div className="p-6 border-t-2 border-nebula-purple space-y-3">
          {user ? (
            <>
              {/* Logged-in user info */}
              <div className="px-3 py-2 bg-space-dark rounded border border-nebula-purple">
                <p className="text-xs text-starlight-gray truncate">{user.email}</p>
              </div>

              <Link
                href="/quotes"
                className="block w-full px-4 py-2 text-center bg-space-dark text-nebula-purple-light rounded-md hover:bg-space-gray transition-all font-semibold border border-nebula-purple hover:glow-purple text-sm"
              >
                My Quotes
              </Link>

              <button
                onClick={logout}
                className="w-full px-4 py-2 text-center text-starlight-gray rounded-md hover:text-starlight-white transition-all font-semibold text-sm border border-starlight-gray border-opacity-30 hover:border-opacity-60"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="w-full px-4 py-2 bg-gradient-to-r from-nebula-purple to-nebula-purple-dark text-white rounded-md hover:glow-purple-strong transition-all font-semibold border border-nebula-purple-light text-sm"
            >
              Sign In
            </button>
          )}

          {onNewQuote && (
            <button
              onClick={onNewQuote}
              className="w-full px-4 py-2 bg-space-dark text-starlight-white rounded-md hover:bg-nebula-purple transition-all font-semibold border-2 border-nebula-purple hover:glow-purple text-sm"
            >
              New Quote
            </button>
          )}

          <Link
            href="/"
            className="block w-full px-4 py-2 text-center bg-space-gray text-starlight-white rounded-md hover:bg-space-dark transition-all font-semibold border-2 border-nebula-purple hover:glow-purple text-sm"
          >
            Home
          </Link>
        </div>
      </aside>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
};

export default Sidebar;
