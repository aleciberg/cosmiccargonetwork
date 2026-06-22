import { Supercluster, Galaxy, Planet, Cargo, Quote, SavedQuote } from "./types";
import * as seedData from "./seed-data";

const calculateDistance = (
  x1: number, y1: number, z1: number,
  x2: number, y2: number, z2: number
): number => {
  return Math.sqrt(
    Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2)
  );
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const transformSupercluster = (item: any): Supercluster => ({
  id: item.ID,
  name: item.Name,
  numberOfGalaxies: item.NumberOfGalaxies,
  xCoordinate: item.XCoordinate,
  yCoordinate: item.YCoordinate,
  zCoordinate: item.ZCoordinate,
});

const transformGalaxy = (item: any): Galaxy => ({
  id: item.ID,
  name: item.Name,
  supercluster: item.Supercluster,
  numberOfPlanets: item.NumberOfPlanets,
  xCoordinate: item.XCoordinate,
  yCoordinate: item.YCoordinate,
  zCoordinate: item.ZCoordinate,
});

const transformPlanet = (item: any): Planet => ({
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
});

export const fetchSuperclusters = async (): Promise<Supercluster[]> => {
  if (API_BASE_URL) {
    try {
      const response = await fetch(`${API_BASE_URL}/superclusters`);
      if (response.ok) {
        const json = await response.json();
        return json.map(transformSupercluster);
      }
    } catch {
      // fall through to seed data
    }
  }
  return seedData.superclusters;
};

export const fetchGalaxies = async (superclusterId: string): Promise<Galaxy[]> => {
  if (API_BASE_URL) {
    try {
      const response = await fetch(`${API_BASE_URL}/galaxies?superclusterId=${superclusterId}`);
      if (response.ok) {
        const json = await response.json();
        return json.map(transformGalaxy);
      }
    } catch {
      // fall through to seed data
    }
  }
  return seedData.galaxies.filter((g) => g.supercluster === superclusterId);
};

export const fetchPlanets = async (galaxyId: string): Promise<Planet[]> => {
  if (API_BASE_URL) {
    try {
      const response = await fetch(`${API_BASE_URL}/planets?galaxyId=${galaxyId}`);
      if (response.ok) {
        const json = await response.json();
        return json.map(transformPlanet);
      }
    } catch {
      // fall through to seed data
    }
  }
  return seedData.planets.filter((p) => p.galaxy === galaxyId);
};

export const calculateQuoteClientSide = (
  originPlanet: Planet,
  destinationPlanet: Planet,
  cargo: Cargo
): Quote => {
  const BASE_COST = 1000;
  const DISTANCE_RATE = 50;
  const WEIGHT_RATE = 10;
  const VALUE_RATE = 0.02;

  const distance = calculateDistance(
    originPlanet.xCoordinate, originPlanet.yCoordinate, originPlanet.zCoordinate,
    destinationPlanet.xCoordinate, destinationPlanet.yCoordinate, destinationPlanet.zCoordinate
  );

  const baseCost = BASE_COST;
  const distanceCost = distance * DISTANCE_RATE;
  const originTax = baseCost * (originPlanet.taxRate / 100);
  const originPoliticalFee = originPlanet.politicalFee;
  const destinationTax = (baseCost + distanceCost) * (destinationPlanet.taxRate / 100);
  const destinationPoliticalFee = destinationPlanet.politicalFee;

  const weightCost = cargo.weight * WEIGHT_RATE;
  const valueCost = cargo.value ? cargo.value * VALUE_RATE : 0;

  const cargoTypeMultipliers: Record<string, number> = {
    standard: 1.0,
    fragile: 1.5,
    hazardous: 2.0,
    perishable: 1.3,
    valuable: 1.8,
    bulk: 0.9,
  };
  const cargoMultiplier = cargoTypeMultipliers[cargo.type.toLowerCase()] || 1.0;
  const cargoCost = (weightCost + valueCost) * cargoMultiplier;

  const total =
    baseCost + distanceCost + originTax + originPoliticalFee +
    destinationTax + destinationPoliticalFee + cargoCost;

  return { baseCost, distanceCost, originTax, originPoliticalFee, destinationTax, destinationPoliticalFee, cargoCost, total };
};

export const fetchSavedQuotes = async (token: string): Promise<SavedQuote[]> => {
  if (!API_BASE_URL) {
    throw new Error("Saved quotes require the full-stack backend.");
  }
  const response = await fetch(`${API_BASE_URL}/quotes`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to fetch saved quotes");
  return response.json();
};

export const calculateQuote = async (
  originPlanet: Planet,
  destinationPlanet: Planet,
  cargo: Cargo,
  token?: string
): Promise<Quote> => {
  if (API_BASE_URL) {
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const response = await fetch(`${API_BASE_URL}/quote`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          originPlanetId: originPlanet.id,
          destinationPlanetId: destinationPlanet.id,
          cargo,
        }),
      });

      if (response.ok) {
        const json = await response.json();
        return {
          baseCost: json.baseCost || 0,
          distanceCost: json.distanceCost || 0,
          originTax: json.originTax || 0,
          originPoliticalFee: json.originPoliticalFee || 0,
          destinationTax: json.destinationTax || 0,
          destinationPoliticalFee: json.destinationPoliticalFee || 0,
          cargoCost: json.cargoCost || 0,
          total: json.total || 0,
        };
      }
    } catch {
      // fall through to client-side calculation
    }
  }

  return calculateQuoteClientSide(originPlanet, destinationPlanet, cargo);
};
