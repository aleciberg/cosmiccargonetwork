import React, { useState, useEffect } from "react";
import { Supercluster, Galaxy, Planet } from "../types/";

interface PlanetBoxProps {
  title: string;
  selectedGalaxy: string;
  onSelect: (value: string) => void;
}

const GalaxyBox: React.FC<PlanetBoxProps> = ({
  title,
  selectedGalaxy,
  onSelect,
}) => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [filteredPlanets, setFilteredPlanets] = useState<Planet[]>([]);
  const [selectedPlanet, setSelectedPlanet] = useState<string>("");

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
    if ("selected gal" + selectedGalaxy) {
      console.log(selectedGalaxy);
      console.log("planets " + JSON.stringify(planets));
      const filtered = planets.filter(
        (planet) => planet.galaxy === selectedGalaxy
      );
      setFilteredPlanets(filtered);
    } else {
      setFilteredPlanets([]);
    }
  }, [selectedGalaxy, planets]);

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-6 mx-auto text-center">
      <div className="p-8 bg-miami-blue border-2 border-miami-pink text-black rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold text-miami-pink mb-4">{title}</h1>
        <select
          className="block w-full bg-miami-blue text-miami-pink p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-miami-pink"
          value={selectedPlanet}
          onChange={(e) => {
            setSelectedPlanet(e.target.value); // Update local state
            onSelect(e.target.value); // Notify parent about selection
          }}
        >
          <option value="" disabled>
            -- Choose a Galaxy --
          </option>
          {filteredPlanets.map((planet) => (
            <option key={planet.id} value={planet.name}>
              {planet.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default GalaxyBox;
