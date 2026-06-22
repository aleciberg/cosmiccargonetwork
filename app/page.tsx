"use client";

import Link from "next/link";
import Layout from "./components/Layout";

const HomePage = () => {
  return (
    <Layout
      currentStep="origin"
      originComplete={false}
      destinationComplete={false}
      cargoComplete={false}
      quoteComplete={false}
    >
      <div className="h-full flex flex-col justify-center items-center gap-8 p-8">
        <h1 className="text-4xl font-bold text-nebula-purple-light">
          Welcome to Cosmic Cargo Network
        </h1>
        <p className="text-xl text-starlight-white">
          Ready to start your journey? Choose an origin to begin selecting your
          route.
        </p>
        <Link
          href="/select-origin"
          className="px-6 py-3 bg-gradient-to-r from-nebula-purple to-nebula-purple-dark text-white rounded-md hover:glow-purple-strong transition-all font-semibold text-lg border border-nebula-purple-light"
        >
          Start Route Selection
        </Link>
      </div>
    </Layout>
  );
};

export default HomePage;
