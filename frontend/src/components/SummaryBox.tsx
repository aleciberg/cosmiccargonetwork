import React from "react";
import { Supercluster, Galaxy, Planet } from "../types/";

interface SummaryBoxProps {
  title: string;
  planet: Planet;
  galaxy: Galaxy;
  supercluster: string;
}

const SummaryBox: React.FC<SummaryBoxProps> = ({
  title,
  planet,
  galaxy,
  supercluster,
}) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/2 p-6 mx-auto text-center">
      <div className="p-8 bg-miami-blue border-4 border-miami-pink text-white rounded-xl shadow-2xl transform transition-transform hover:scale-105 hover:shadow-pink-lg">
        <h2 className="text-2xl font-bold mb-4 text-miami-pink uppercase tracking-wide">
          {title}
        </h2>
        <ul className="space-y-3 text-lg leading-relaxed">
          <li>
            <span className="font-semibold">Origin Planet:</span> {planet.name}
          </li>
          <li>
            <span className="font-semibold">Origin Galaxy:</span> {galaxy.name}
          </li>
          <li>
            <span className="font-semibold">Origin Supercluster:</span>{" "}
            {supercluster}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SummaryBox;
