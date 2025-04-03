import React, { useState, useEffect } from "react";
import { Supercluster, Galaxy } from "../types/";

interface GalaxyBoxProps {
  title: string;
  selectedSupercluster: Supercluster;
  onSelect: (value: Galaxy | null) => void;
}

const GalaxyBox: React.FC<GalaxyBoxProps> = ({
  title,
  selectedSupercluster,
  onSelect,
}) => {
  const [galaxies, setGalaxies] = useState<Galaxy[]>([]);
  const [filteredGalaxies, setFilteredGalaxies] = useState<Galaxy[]>([]);
  const [selectedGalaxy, setSelectedGalaxy] = useState<Galaxy | null>(null);

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
        (galaxy) => galaxy.supercluster === selectedSupercluster.id
      );
      setFilteredGalaxies(filtered);
    } else {
      setFilteredGalaxies([]);
    }
  }, [selectedSupercluster, galaxies]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selectedGalaxyObject =
      filteredGalaxies.find((galaxy) => galaxy.id === selectedId) || null;

    setSelectedGalaxy(selectedGalaxyObject);
    onSelect(selectedGalaxyObject);
  };

  return (
    // <div className="w-full md:w-1/2 lg:w-1/3 p-6 mx-auto text-center">
    //   <div className="p-8 bg-miami-blue border-2 border-miami-pink text-black rounded-lg shadow-xl">
    //     <h1 className="text-2xl font-bold text-miami-pink mb-4">{title}</h1>
    //     <select
    //       className="block w-full bg-miami-blue text-miami-pink p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-miami-pink"
    //       value={selectedGalaxy?.id || ""}
    //       onChange={handleSelectChange}
    //     >
    //       <option value="" disabled>
    //         -- Choose a Galaxy --
    //       </option>
    //       {filteredGalaxies.map((galaxy) => (
    //         <option key={galaxy.id} value={galaxy.id}>
    //           {galaxy.name}
    //         </option>
    //       ))}
    //     </select>
    //   </div>
    // </div>
    <div className="w-[420px] p-6 text-center">
      <div className="p-8 bg-miami-blue border-2 border-miami-pink text-black rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold text-miami-pink mb-4">{title}</h1>
        <select
          className="block w-full bg-miami-blue text-miami-pink p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-miami-pink"
          onChange={handleSelectChange}
        >
          <option value="" disabled>
            -- Choose a Galaxy --
          </option>
          {filteredGalaxies &&
            filteredGalaxies.map((galaxy) => (
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
