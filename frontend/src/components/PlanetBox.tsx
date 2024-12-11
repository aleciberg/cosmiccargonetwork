import React, { useState, useEffect } from "react";
import { Supercluster, Galaxy, Planet } from "../types/";

interface PlanetBoxProps {
  title: string;
  selectedGalaxy: Galaxy;
  onSelect: (value: Planet | null) => void;
}

const GalaxyBox: React.FC<PlanetBoxProps> = ({
  title,
  selectedGalaxy,
  onSelect,
}) => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [filteredPlanets, setFilteredPlanets] = useState<Planet[]>([]);
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);

  useEffect(() => {
    const fetchPlanets = async () => {
      const url = "http://localhost:1323/planets";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        const transformedData: Planet[] = json.map((item: any) => ({
          id: item.ID,
          name: item.Name,
          galaxy: item.Galaxy,
          climate: item.Climate,
          numberOfDocks: item.NumberOfDocks,
          taxRate: item.TaxRate,
          politicalFee: item.PoliticalFee,
          xCoordinate: item.XCoordinate,
          yCoordinate: item.YCoordinate,
          zCoordinate: item.ZCoordinate,
        }));
        setPlanets(transformedData);
      } catch (error: any) {
        console.error(error.message);
      }
    };
    fetchPlanets();
  }, []);

  useEffect(() => {
    if (selectedGalaxy) {
      const filtered = planets.filter(
        (planet) => planet.galaxy === selectedGalaxy.id
      );
      setFilteredPlanets(filtered);
    } else {
      setFilteredPlanets([]);
    }
  }, [selectedGalaxy, planets]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selectedPlanetObject =
      filteredPlanets.find((planet) => planet.id === selectedId) || null;

    setSelectedPlanet(selectedPlanetObject);
    onSelect(selectedPlanetObject);
  };

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-6 mx-auto text-center">
      <div className="p-8 bg-miami-blue border-2 border-miami-pink text-black rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold text-miami-pink mb-4">{title}</h1>
        <select
          className="block w-full bg-miami-blue text-miami-pink p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-miami-pink"
          value={selectedPlanet?.id || ""}
          onChange={handleSelectChange}
        >
          <option value="" disabled>
            -- Choose a Galaxy --
          </option>
          {filteredPlanets.map((planet) => (
            <option key={planet.id} value={planet.id}>
              {planet.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default GalaxyBox;
