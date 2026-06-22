"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../lib/auth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = "login" | "register";

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, register } = useAuth();
  const [tab, setTab] = useState<Tab>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setError(null);
      setLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (tab === "login") {
        await login(email, password);
      } else {
        await register(email, password);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black opacity-70" />

      {/* Modal card */}
      <div
        className="relative z-10 w-full max-w-md mx-4 bg-space-gray border-2 border-nebula-purple rounded-lg shadow-2xl glow-purple"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-nebula-purple">
          <h2 className="text-xl font-bold text-nebula-purple-light">
            {tab === "login" ? "Sign In" : "Create Account"}
          </h2>
          <button
            onClick={onClose}
            className="text-starlight-gray hover:text-starlight-white transition-colors text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-nebula-purple">
          <button
            onClick={() => { setTab("login"); setError(null); }}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              tab === "login"
                ? "text-nebula-purple-light border-b-2 border-nebula-purple-light"
                : "text-starlight-gray hover:text-starlight-white"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setTab("register"); setError(null); }}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              tab === "register"
                ? "text-nebula-purple-light border-b-2 border-nebula-purple-light"
                : "text-starlight-gray hover:text-starlight-white"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-supernova-red bg-opacity-20 border border-supernova-red rounded text-supernova-red text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-starlight-white mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="block w-full bg-space-dark text-starlight-white p-3 border-2 border-nebula-purple rounded-md focus:outline-none focus:ring-2 focus:ring-nebula-purple transition-all"
              placeholder="pilot@cosmicfreight.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-starlight-white mb-2">
              Password
              {tab === "register" && (
                <span className="text-starlight-gray font-normal ml-2 text-xs">
                  (min 8 characters)
                </span>
              )}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={tab === "login" ? "current-password" : "new-password"}
              className="block w-full bg-space-dark text-starlight-white p-3 border-2 border-nebula-purple rounded-md focus:outline-none focus:ring-2 focus:ring-nebula-purple transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-gradient-to-r from-nebula-purple to-nebula-purple-dark text-white rounded-md hover:glow-purple-strong transition-all font-semibold border border-nebula-purple-light disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Please wait…"
              : tab === "login"
              ? "Sign In"
              : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
