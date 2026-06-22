"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "../components/Layout";
import { useAuth } from "../lib/auth";
import { fetchSavedQuotes } from "../lib/api";
import { SavedQuote } from "../lib/types";

const formatCredits = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace("$", "₩");

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const QuotesPage = () => {
  const { user, token, isLoading } = useAuth();
  const router = useRouter();
  const [quotes, setQuotes] = useState<SavedQuote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (!user || !token) return;
    fetchSavedQuotes(token)
      .then(setQuotes)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [user, token]);

  if (isLoading || !user) return null;

  return (
    <Layout
      currentStep="origin"
      originComplete={false}
      destinationComplete={false}
      cargoComplete={false}
      quoteComplete={false}
    >
      <div className="p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-nebula-purple-light mb-2">
              My Quotes
            </h1>
            <p className="text-starlight-gray">
              Saved shipping quotes for{" "}
              <span className="text-starlight-white">{user.email}</span>
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-supernova-red bg-opacity-20 border border-supernova-red text-supernova-red rounded-lg">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-16">
              <p className="text-nebula-purple-light text-xl font-semibold">
                Loading quotes…
              </p>
            </div>
          ) : quotes.length === 0 ? (
            <div className="p-8 bg-space-gray border-2 border-nebula-purple rounded-lg text-center glow-purple">
              <p className="text-starlight-gray text-lg">No saved quotes yet.</p>
              <p className="text-starlight-gray mt-2 text-sm">
                Calculate a quote while signed in and it will appear here automatically.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {quotes.map((q) => (
                <div
                  key={q.id}
                  className="p-6 bg-space-gray border-2 border-nebula-purple rounded-lg glow-purple"
                >
                  {/* Route header */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3 text-lg font-bold text-starlight-white">
                      <span className="text-nebula-purple-light">
                        {q.originPlanetName}
                      </span>
                      <span className="text-starlight-gray">→</span>
                      <span className="text-nebula-purple-light">
                        {q.destinationPlanetName}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-star-gold font-bold text-xl glow-gold">
                        {formatCredits(q.total)}
                      </span>
                      <span className="text-starlight-gray text-sm">
                        {formatDate(q.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Details grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-space-dark p-3 rounded border border-nebula-purple">
                      <div className="text-xs text-starlight-gray mb-1">Cargo</div>
                      <div className="text-starlight-white capitalize font-semibold">
                        {q.cargoType}
                      </div>
                    </div>
                    <div className="bg-space-dark p-3 rounded border border-nebula-purple">
                      <div className="text-xs text-starlight-gray mb-1">Weight</div>
                      <div className="text-starlight-white font-semibold">
                        {q.cargoWeight.toLocaleString()} kg
                      </div>
                    </div>
                    <div className="bg-space-dark p-3 rounded border border-nebula-purple">
                      <div className="text-xs text-starlight-gray mb-1">Distance cost</div>
                      <div className="text-starlight-white font-semibold">
                        {formatCredits(q.distanceCost)}
                      </div>
                    </div>
                    <div className="bg-space-dark p-3 rounded border border-nebula-purple">
                      <div className="text-xs text-starlight-gray mb-1">Fees & taxes</div>
                      <div className="text-starlight-white font-semibold">
                        {formatCredits(
                          q.originTax +
                            q.originPoliticalFee +
                            q.destinationTax +
                            q.destinationPoliticalFee
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default QuotesPage;
