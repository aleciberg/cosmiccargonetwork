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

  // Both Selections Made
  if (
    selectedDestinationPlanet &&
    selectedDestinationGalaxy &&
    selectedDestinationSupercluster &&
    selectedOriginPlanet &&
    selectedOriginGalaxy &&
    selectedOriginSupercluster
  ) {
    return (
      <div className="min-h-screen bg-miami-blue flex justify-center items-center">
        <SummaryBox
          title={"Origin Route Summary"}
          supercluster={selectedOriginSupercluster}
          galaxy={selectedOriginGalaxy}
          planet={selectedOriginPlanet}
        />
        <SummaryBox
          title={"Destination Route Summary"}
          supercluster={selectedDestinationSupercluster}
          galaxy={selectedDestinationGalaxy}
          planet={selectedDestinationPlanet}
        />
      </div>
    );
  }
  // Origin Selected
  else if (
    selectedOriginPlanet &&
    selectedOriginGalaxy &&
    selectedOriginSupercluster
  ) {
    return (
      <div className="relative overflow-hidden">
        <StarryBackground />
        {/* This is bugged, supercluster box appears too small */}
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
  // Beginning Of Selections
  else {
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
  }
};

export default App;
