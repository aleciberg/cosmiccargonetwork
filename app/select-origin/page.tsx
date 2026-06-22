"use client";

import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import SelectionBox from "../components/SelectionBox";
import RouteDisplay from "../components/RouteDisplay";
import CargoForm from "../components/CargoForm";
import QuoteDisplay from "../components/QuoteDisplay";
import {
  Supercluster,
  Galaxy,
  Planet,
  Cargo,
  Quote,
} from "../lib/types";
import {
  fetchSuperclusters,
  fetchGalaxies,
  fetchPlanets,
  calculateQuote,
} from "../lib/api";
import { useAuth } from "../lib/auth";

type SelectionStep = "origin" | "destination" | "cargo" | "quote";

const ShippingRouteCalculator = () => {
  const { token } = useAuth();

  // Origin state
  const [originSupercluster, setOriginSupercluster] =
    useState<Supercluster | null>(null);
  const [originGalaxy, setOriginGalaxy] = useState<Galaxy | null>(null);
  const [originPlanet, setOriginPlanet] = useState<Planet | null>(null);

  // Destination state
  const [destinationSupercluster, setDestinationSupercluster] =
    useState<Supercluster | null>(null);
  const [destinationGalaxy, setDestinationGalaxy] = useState<Galaxy | null>(
    null
  );
  const [destinationPlanet, setDestinationPlanet] = useState<Planet | null>(
    null
  );

  // Data state
  const [superclusters, setSuperclusters] = useState<Supercluster[]>([]);
  const [originGalaxies, setOriginGalaxies] = useState<Galaxy[]>([]);
  const [originPlanets, setOriginPlanets] = useState<Planet[]>([]);
  const [destinationGalaxies, setDestinationGalaxies] = useState<Galaxy[]>([]);
  const [destinationPlanets, setDestinationPlanets] = useState<Planet[]>([]);

  // Cargo and quote state
  const [cargo, setCargo] = useState<Cargo | null>(null);
  const [quote, setQuote] = useState<Quote | null>(null);

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingGalaxies, setLoadingGalaxies] = useState(false);
  const [loadingPlanets, setLoadingPlanets] = useState(false);
  const [loadingQuote, setLoadingQuote] = useState(false);

  // Fetch superclusters on mount
  useEffect(() => {
    const loadSuperclusters = async () => {
      try {
        setLoading(true);
        const data = await fetchSuperclusters();
        setSuperclusters(data);
        setError(null);
      } catch (err: any) {
        setError(`Failed to load superclusters: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    loadSuperclusters();
  }, []);

  // Fetch origin galaxies when supercluster is selected
  useEffect(() => {
    if (originSupercluster) {
      const loadGalaxies = async () => {
        try {
          setLoadingGalaxies(true);
          const data = await fetchGalaxies(originSupercluster.id);
          setOriginGalaxies(data);
          setOriginGalaxy(null);
          setOriginPlanet(null);
          setError(null);
        } catch (err: any) {
          setError(`Failed to load galaxies: ${err.message}`);
        } finally {
          setLoadingGalaxies(false);
        }
      };
      loadGalaxies();
    } else {
      setOriginGalaxies([]);
      setOriginGalaxy(null);
      setOriginPlanet(null);
    }
  }, [originSupercluster]);

  // Fetch origin planets when galaxy is selected
  useEffect(() => {
    if (originGalaxy) {
      const loadPlanets = async () => {
        try {
          setLoadingPlanets(true);
          const data = await fetchPlanets(originGalaxy.id);
          setOriginPlanets(data);
          setOriginPlanet(null);
          setError(null);
        } catch (err: any) {
          setError(`Failed to load planets: ${err.message}`);
        } finally {
          setLoadingPlanets(false);
        }
      };
      loadPlanets();
    } else {
      setOriginPlanets([]);
      setOriginPlanet(null);
    }
  }, [originGalaxy]);

  // Fetch destination galaxies when supercluster is selected
  useEffect(() => {
    if (destinationSupercluster) {
      const loadGalaxies = async () => {
        try {
          setLoadingGalaxies(true);
          const data = await fetchGalaxies(destinationSupercluster.id);
          setDestinationGalaxies(data);
          setDestinationGalaxy(null);
          setDestinationPlanet(null);
          setError(null);
        } catch (err: any) {
          setError(`Failed to load galaxies: ${err.message}`);
        } finally {
          setLoadingGalaxies(false);
        }
      };
      loadGalaxies();
    } else {
      setDestinationGalaxies([]);
      setDestinationGalaxy(null);
      setDestinationPlanet(null);
    }
  }, [destinationSupercluster]);

  // Fetch destination planets when galaxy is selected
  useEffect(() => {
    if (destinationGalaxy) {
      const loadPlanets = async () => {
        try {
          setLoadingPlanets(true);
          const data = await fetchPlanets(destinationGalaxy.id);
          setDestinationPlanets(data);
          setDestinationPlanet(null);
          setError(null);
        } catch (err: any) {
          setError(`Failed to load planets: ${err.message}`);
        } finally {
          setLoadingPlanets(false);
        }
      };
      loadPlanets();
    } else {
      setDestinationPlanets([]);
      setDestinationPlanet(null);
    }
  }, [destinationGalaxy]);

  // Calculate quote when cargo is submitted
  const handleCargoSubmit = async (cargoData: Cargo) => {
    if (!originPlanet || !destinationPlanet) {
      setError("Please select both origin and destination planets");
      return;
    }

    try {
      setLoadingQuote(true);
      setError(null);
      const quoteData = await calculateQuote(
        originPlanet,
        destinationPlanet,
        cargoData,
        token ?? undefined
      );
      setQuote(quoteData);
      setCargo(cargoData);
    } catch (err: any) {
      setError(`Failed to calculate quote: ${err.message}`);
    } finally {
      setLoadingQuote(false);
    }
  };

  // Reset everything for new quote
  const handleNewQuote = () => {
    setOriginSupercluster(null);
    setOriginGalaxy(null);
    setOriginPlanet(null);
    setDestinationSupercluster(null);
    setDestinationGalaxy(null);
    setDestinationPlanet(null);
    setCargo(null);
    setQuote(null);
    setOriginGalaxies([]);
    setOriginPlanets([]);
    setDestinationGalaxies([]);
    setDestinationPlanets([]);
    setError(null);
  };

  // Determine current step
  const getCurrentStep = (): SelectionStep => {
    if (quote) return "quote";
    if (cargo) return "cargo";
    if (originPlanet && destinationPlanet) return "cargo";
    if (originPlanet) return "destination";
    return "origin";
  };

  const currentStep = getCurrentStep();
  const originComplete = !!(originSupercluster && originGalaxy && originPlanet);
  const destinationComplete = !!(
    destinationSupercluster && destinationGalaxy && destinationPlanet
  );

  // Prevent selecting same origin and destination
  const availableDestinationPlanets = destinationPlanets.filter(
    (p) => p.id !== originPlanet?.id
  );

  if (loading) {
    return (
      <Layout
        currentStep="origin"
        originComplete={false}
        destinationComplete={false}
        cargoComplete={false}
        quoteComplete={false}
      >
        <div className="h-full flex flex-col justify-center items-center">
          <div className="text-2xl font-bold text-nebula-purple-light">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      currentStep={currentStep}
      originComplete={originComplete}
      destinationComplete={destinationComplete}
      cargoComplete={!!cargo}
      quoteComplete={!!quote}
      onNewQuote={handleNewQuote}
    >
      <div className="p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-nebula-purple-light mb-2">
              Shipping Route Calculator
            </h1>
            <p className="text-xl text-starlight-white">
              Build your shipping route and get a quote
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-supernova-red text-white rounded-lg shadow-lg border-2 border-supernova-red">
              <p className="font-semibold">Error: {error}</p>
            </div>
          )}

        <div className="space-y-6">
          {/* Origin Selection */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-start">
            <SelectionBox
              title="Origin Supercluster"
              options={superclusters}
              selectedValue={originSupercluster}
              onSelect={setOriginSupercluster}
              onClear={() => {
                setOriginSupercluster(null);
                setOriginGalaxy(null);
                setOriginPlanet(null);
              }}
              getOptionId={(sc) => sc.id}
              getOptionName={(sc) => sc.name}
              placeholder="-- Choose a Supercluster --"
            />

            {originSupercluster && (
              <SelectionBox
                title="Origin Galaxy"
                options={originGalaxies}
                selectedValue={originGalaxy}
                onSelect={setOriginGalaxy}
                onClear={() => {
                  setOriginGalaxy(null);
                  setOriginPlanet(null);
                }}
                getOptionId={(g) => g.id}
                getOptionName={(g) => g.name}
                placeholder="-- Choose a Galaxy --"
                disabled={loadingGalaxies}
              />
            )}

            {originGalaxy && (
              <SelectionBox
                title="Origin Planet"
                options={originPlanets}
                selectedValue={originPlanet}
                onSelect={setOriginPlanet}
                onClear={() => setOriginPlanet(null)}
                getOptionId={(p) => p.id}
                getOptionName={(p) => p.name}
                placeholder="-- Choose a Planet --"
                disabled={loadingPlanets}
              />
            )}
          </div>

          {/* Origin Route Display */}
          {originComplete && (
            <div className="flex justify-center">
              <RouteDisplay
                label="Origin"
                supercluster={originSupercluster}
                galaxy={originGalaxy}
                planet={originPlanet}
              />
            </div>
          )}

          {/* Destination Selection */}
          {originComplete && (
            <>
              <div className="flex flex-col md:flex-row gap-4 justify-center items-start">
                <SelectionBox
                  title="Destination Supercluster"
      options={superclusters}
                  selectedValue={destinationSupercluster}
                  onSelect={setDestinationSupercluster}
                  onClear={() => {
                    setDestinationSupercluster(null);
                    setDestinationGalaxy(null);
                    setDestinationPlanet(null);
                  }}
                  getOptionId={(sc) => sc.id}
                  getOptionName={(sc) => sc.name}
                  placeholder="-- Choose a Supercluster --"
                />

                {destinationSupercluster && (
                  <SelectionBox
                    title="Destination Galaxy"
                    options={destinationGalaxies}
                    selectedValue={destinationGalaxy}
                    onSelect={setDestinationGalaxy}
                    onClear={() => {
                      setDestinationGalaxy(null);
                      setDestinationPlanet(null);
                    }}
                    getOptionId={(g) => g.id}
                    getOptionName={(g) => g.name}
                    placeholder="-- Choose a Galaxy --"
                    disabled={loadingGalaxies}
                  />
                )}

                {destinationGalaxy && (
                  <SelectionBox
                    title="Destination Planet"
                    options={availableDestinationPlanets}
                    selectedValue={destinationPlanet}
                    onSelect={setDestinationPlanet}
                    onClear={() => setDestinationPlanet(null)}
                    getOptionId={(p) => p.id}
                    getOptionName={(p) => p.name}
                    placeholder="-- Choose a Planet --"
                    disabled={loadingPlanets}
                  />
                )}
              </div>

              {/* Destination Route Display */}
              {destinationComplete && (
                <div className="flex justify-center">
                  <RouteDisplay
                    label="Destination"
                    supercluster={destinationSupercluster}
                    galaxy={destinationGalaxy}
                    planet={destinationPlanet}
                  />
                </div>
              )}
            </>
          )}

          {/* Cargo Form */}
          {destinationComplete && !quote && (
            <div className="flex justify-center">
              <CargoForm onSubmit={handleCargoSubmit} />
            </div>
          )}

          {/* Quote Display */}
          {quote && (
            <div className="flex justify-center">
              <QuoteDisplay quote={quote} onNewQuote={handleNewQuote} />
            </div>
          )}

          {/* Loading Quote Indicator */}
          {loadingQuote && (
            <div className="flex justify-center">
              <div className="p-8 bg-space-gray border-2 border-nebula-purple text-starlight-white rounded-lg shadow-xl glow-purple">
                <p className="text-xl font-semibold text-nebula-purple-light">
                  Calculating quote...
                </p>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShippingRouteCalculator;
