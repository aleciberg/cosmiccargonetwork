import React, { useState, useEffect } from "react";
import SuperclusterBox from "./components/SuperclusterBox";
import GalaxyBox from "./components/GalaxyBox";
import PlanetBox from "./components/PlanetBox";
import SummaryBox from "./components/SummaryBox";
import StarryBackground from "./components/StarryBackground";
import Layout from "./components/Layout";
import { Supercluster, Galaxy, Planet } from "./types/";

const App: React.FC = () => {
  // Origin Planet Flow
  const [superclusters, setSuperclusters] = useState<Supercluster[]>([]);
  const [selectedOriginSupercluster, setSelectedOriginSupercluster] =
    useState<Supercluster | null>(null);
  const [selectedOriginGalaxy, setSelectedOriginGalaxy] =
    useState<Galaxy | null>(null);
  const [selectedOriginPlanet, setSelectedOriginPlanet] =
    useState<Planet | null>(null);

  // Destination Planet Flow
  const [selectedDestinationSupercluster, setSelectedDestinationSupercluster] =
    useState<Supercluster | null>(null);
  const [selectedDestinationGalaxy, setSelectedDestinationGalaxy] =
    useState<Galaxy | null>(null);
  const [selectedDestinationPlanet, setSelectedDestinationPlanet] =
    useState<Planet | null>(null);

  const resetApp = () => {
    setSelectedOriginSupercluster(null);
    setSelectedOriginGalaxy(null);
    setSelectedOriginPlanet(null);
    setSelectedDestinationSupercluster(null);
    setSelectedDestinationGalaxy(null);
    setSelectedDestinationPlanet(null);
  };

  // Load Superclusters.  Remaining API logic is in components
  useEffect(() => {
    const fetchSuperclusters = async () => {
      const url = "http://localhost:1323/superclusters";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        const transformedData: Supercluster[] = json.map((item: any) => ({
          id: item.ID,
          name: item.Name,
          numberOfGalaxies: item.NumberOfGalaxies,
          xCoordinate: item.XCoordinate,
          yCoordinate: item.YCoordinate,
          zCoordinate: item.ZCoordinate,
        }));
        setSuperclusters(transformedData);
      } catch (error: any) {
        console.error(error.message);
      }
    };

    fetchSuperclusters();
  }, []);

  // Both Origin & Destination are selected: show summary boxes side by side.
  if (
    selectedDestinationPlanet &&
    selectedDestinationGalaxy &&
    selectedDestinationSupercluster &&
    selectedOriginPlanet &&
    selectedOriginGalaxy &&
    selectedOriginSupercluster
  ) {
    return (
      <Layout resetApp={resetApp}>
        <div className="min-h-screen bg-miami-blue flex flex-col lg:flex-row justify-center items-center gap-8 p-8">
          <SummaryBox
            title="Origin Route Summary"
            supercluster={selectedOriginSupercluster}
            galaxy={selectedOriginGalaxy}
            planet={selectedOriginPlanet}
          />
          <SummaryBox
            title="Destination Route Summary"
            supercluster={selectedDestinationSupercluster}
            galaxy={selectedDestinationGalaxy}
            planet={selectedDestinationPlanet}
          />
        </div>
      </Layout>
    );
  }
  // Origin has been selected: show origin summary and destination selection boxes.
  else if (
    selectedOriginPlanet &&
    selectedOriginGalaxy &&
    selectedOriginSupercluster
  ) {
    return (
      <Layout resetApp={resetApp}>
        <div className="relative min-h-screen overflow-hidden">
          <StarryBackground />
          <div className="min-h-screen bg-miami-blue flex flex-col lg:flex-row justify-center items-center gap-8 p-8">
            <SummaryBox
              title="Origin Route Summary"
              supercluster={selectedOriginSupercluster}
              galaxy={selectedOriginGalaxy}
              planet={selectedOriginPlanet}
            />
            <div className="flex flex-col gap-8">
              <SuperclusterBox
                title="Select a Destination Supercluster"
                options={superclusters}
                selectedValue={selectedDestinationSupercluster}
                onSelect={setSelectedDestinationSupercluster}
              />
              {selectedDestinationSupercluster && (
                <GalaxyBox
                  title="Select a Destination Galaxy"
                  selectedSupercluster={selectedDestinationSupercluster}
                  onSelect={setSelectedDestinationGalaxy}
                />
              )}
              {selectedDestinationSupercluster && selectedDestinationGalaxy && (
                <PlanetBox
                  title="Select a Destination Planet"
                  selectedGalaxy={selectedDestinationGalaxy}
                  onSelect={setSelectedDestinationPlanet}
                />
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  // No origin selected yet: begin by selecting an origin.
  else {
    return (
      <Layout resetApp={resetApp}>
        <div className="relative min-h-screen overflow-hidden">
          <StarryBackground />
          <div className="min-h-screen bg-miami-blue flex flex-col justify-center items-center gap-8 p-8">
            <SuperclusterBox
              title="Select an Origin Supercluster"
              options={superclusters}
              selectedValue={selectedOriginSupercluster}
              onSelect={setSelectedOriginSupercluster}
            />
            {selectedOriginSupercluster && (
              <GalaxyBox
                title="Select an Origin Galaxy"
                selectedSupercluster={selectedOriginSupercluster}
                onSelect={setSelectedOriginGalaxy}
              />
            )}
            {selectedOriginSupercluster && selectedOriginGalaxy && (
              <PlanetBox
                title="Select an Origin Planet"
                selectedGalaxy={selectedOriginGalaxy}
                onSelect={setSelectedOriginPlanet}
              />
            )}
          </div>
        </div>
      </Layout>
    );
  }
};

export default App;
