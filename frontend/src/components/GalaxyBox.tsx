import React, { useState, useEffect } from "react";
import { Supercluster, Galaxy } from "../types/";

interface GalaxyBoxProps {
  title: string;
  selectedSupercluster: string;
  onSelect: (value: string) => void;
}

const GalaxyBox: React.FC<GalaxyBoxProps> = ({
  title,
  selectedSupercluster,
  onSelect,
}) => {
  const [galaxies, setGalaxies] = useState<Galaxy[]>([]);
  const [filteredGalaxies, setFilteredGalaxies] = useState<Galaxy[]>([]);
  const [selectedGalaxy, setSelectedGalaxy] = useState<string>("");

  useEffect(() => {
    // Fetch galaxies only when the component mounts
    const fetchGalaxies = async () => {
      const url = "http://localhost:1323/galaxies";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        const transformedData: Galaxy[] = json.map((item: any) => ({
          id: item.ID,
          name: item.Name,
          supercluster: item.Supercluster,
          numberOfPlanets: item.NumberOfGalaxies,
          xCoordinate: item.XCoordinate,
          yCoordinate: item.YCoordinate,
          zCoordinate: item.ZCoordinate,
        }));
        setGalaxies(transformedData);
      } catch (error: any) {
        console.error(error.message);
      }
    };
    fetchGalaxies();
  }, []);

  useEffect(() => {
    if (selectedSupercluster) {
      const filtered = galaxies.filter(
        (galaxy) => galaxy.supercluster === selectedSupercluster
      );
      setFilteredGalaxies(filtered);
    } else {
      setFilteredGalaxies([]);
    }
  }, [selectedSupercluster, galaxies]);

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-6 mx-auto text-center">
      <div className="p-8 bg-miami-blue border-2 border-miami-pink text-black rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold text-miami-pink mb-4">{title}</h1>
        <select
          className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-miami-pink"
          value={selectedGalaxy}
          onChange={(e) => {
            setSelectedGalaxy(e.target.value); // Update local state
            onSelect(e.target.value); // Notify parent about selection
          }}
        >
          <option value="" disabled>
            -- Choose a Galaxy --
          </option>
          {filteredGalaxies.map((galaxy) => (
            <option key={galaxy.id} value={galaxy.id}>
              {galaxy.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default GalaxyBox;
