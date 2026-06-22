import React from "react";
import { Supercluster, Galaxy, Planet } from "../lib/types";

interface RouteDisplayProps {
  label: string;
  supercluster: Supercluster | null;
  galaxy: Galaxy | null;
  planet: Planet | null;
}

const RouteDisplay: React.FC<RouteDisplayProps> = ({
  label,
  supercluster,
  galaxy,
  planet,
}) => {
  if (!supercluster || !galaxy || !planet) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl p-6">
      <div className="p-6 bg-space-gray border-2 border-nebula-purple text-starlight-white rounded-lg shadow-xl glow-purple">
        <h3 className="text-xl font-bold text-nebula-purple-light mb-4">{label}</h3>
        <div className="space-y-2">
          <div className="bg-space-dark p-3 rounded border border-nebula-purple">
            <span className="font-semibold text-nebula-purple-light">Supercluster: </span>
            <span className="text-starlight-white">{supercluster.name}</span>
          </div>
          <div className="bg-space-dark p-3 rounded border border-nebula-purple">
            <span className="font-semibold text-nebula-purple-light">Galaxy: </span>
            <span className="text-starlight-white">{galaxy.name}</span>
          </div>
          <div className="bg-space-dark p-3 rounded border border-nebula-purple">
            <span className="font-semibold text-nebula-purple-light">Planet: </span>
            <span className="text-starlight-white">{planet.name}</span>
          </div>
          <div className="bg-space-dark p-3 rounded border border-nebula-purple text-sm">
            <span className="font-semibold text-nebula-purple-light">Coordinates: </span>
            <span className="text-starlight-gray font-mono">
              ({planet.xCoordinate}, {planet.yCoordinate}, {planet.zCoordinate})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteDisplay;


