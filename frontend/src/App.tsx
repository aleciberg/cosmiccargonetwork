import React, { useState, useEffect } from "react";
import SuperclusterBox from "./components/SuperclusterBox";
import GalaxyBox from "./components/GalaxyBox";
import PlanetBox from "./components/PlanetBox";
import SummaryBox from "./components/SummaryBox";
import StarryBackground from "./components/StarryBackground";
import { Supercluster, Galaxy, Planet } from "./types/";

const App: React.FC = () => {
  // Origin Planet Flow
  const [superclusters, setSuperclusters] = useState<Supercluster[]>([]);
  const [selectedOriginSupercluster, setSelectedOriginSupercluster] =
    useState<string>("");
  const [selectedOriginGalaxy, setSelectedOriginGalaxy] = useState<string>("");
  const [selectedOriginPlanet, setSelectedOriginPlanet] = useState<string>("");

  // Destination Planet Flow
  const [selectedDestinationSupercluster, setSelectedDestinationSupercluster] =
    useState<string>("");
  const [selectedDestinationGalaxy, setSelectedDestinationGalaxy] =
    useState<string>("");
  const [selectedDestinationPlanet, setSelectedDestinationPlanet] =
    useState<string>("");

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

  if (
    selectedOriginPlanet &&
    selectedOriginGalaxy &&
    selectedOriginSupercluster
  ) {
    return (
      <div className="relative overflow-hidden">
        <StarryBackground />
        <div className="min-h-screen bg-miami-blue flex justify-center items-center">
          <div className="min-h-screen bg-miami-blue flex justify-center items-center">
            <SummaryBox
              title={"Origin Route Summary"}
              supercluster={selectedOriginSupercluster}
              galaxy={selectedOriginGalaxy}
              planet={selectedOriginPlanet}
            />
          </div>
          <div className="min-h-screen bg-miami-blue flex justify-center items-center">
            <SuperclusterBox
              title="Select a Supercluster"
              options={superclusters}
              selectedValue={selectedDestinationSupercluster}
              onSelect={setSelectedDestinationSupercluster}
            />
            {selectedDestinationSupercluster && (
              <GalaxyBox
                title={"Select a Galaxy"}
                selectedSupercluster={selectedDestinationSupercluster}
                onSelect={setSelectedDestinationGalaxy}
              />
            )}
            {selectedDestinationSupercluster && selectedDestinationGalaxy && (
              <PlanetBox
                title={"Select a Planet"}
                selectedGalaxy={selectedDestinationGalaxy}
                onSelect={setSelectedDestinationPlanet}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="relative overflow-hidden">
      <StarryBackground />
      <div className="min-h-screen bg-miami-blue flex justify-center items-center">
        <SuperclusterBox
          title="Select a Supercluster"
          options={superclusters}
          selectedValue={selectedOriginSupercluster}
          onSelect={setSelectedOriginSupercluster}
        />
        {selectedOriginSupercluster && (
          <GalaxyBox
            title={"Select a Galaxy"}
            selectedSupercluster={selectedOriginSupercluster}
            onSelect={setSelectedOriginGalaxy}
          />
        )}
        {selectedOriginSupercluster && selectedOriginGalaxy && (
          <PlanetBox
            title={"Select a Planet"}
            selectedGalaxy={selectedOriginGalaxy}
            onSelect={setSelectedOriginPlanet}
          />
        )}
      </div>
    </div>
  );
};

export default App;
