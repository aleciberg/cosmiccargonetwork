import React, { useState, useEffect } from "react";
import SuperclusterBox from "./components/SuperclusterBox";
import GalaxyBox from "./components/GalaxyBox";
import PlanetBox from "./components/PlanetBox";
import StarryBackground from "./components/StarryBackground";
import { Supercluster } from "./types/supercluster";

const App: React.FC = () => {
  const [superclusters, setSuperclusters] = useState<Supercluster[]>([]);
  const [selectedSupercluster, setSelectedSupercluster] = useState<string>("");
  const [selectedGalaxy, setSelectedGalaxy] = useState<string>("");
  const [selectedPlanet, setSelectedPlanet] = useState<string>("");

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

  return (
    <div className="relative overflow-hidden">
      <StarryBackground />
      <div className="min-h-screen bg-miami-blue flex justify-center items-center">
        <SuperclusterBox
          title="Select a Supercluster"
          options={superclusters}
          selectedValue={selectedSupercluster}
          onSelect={setSelectedSupercluster}
        />
        {selectedSupercluster && (
          <GalaxyBox
            title={"Select a Galaxy"}
            selectedSupercluster={selectedSupercluster}
            onSelect={setSelectedGalaxy}
          />
        )}
        {selectedSupercluster && selectedGalaxy && (
          <PlanetBox
            title={"Select a Planet"}
            selectedGalaxy={selectedGalaxy}
            onSelect={setSelectedPlanet}
          />
        )}
      </div>
    </div>
  );
};

export default App;
