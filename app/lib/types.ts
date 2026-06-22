export interface Supercluster {
  id: string;
  name: string;
  numberOfGalaxies: number;
  xCoordinate: number;
  yCoordinate: number;
  zCoordinate: number;
}

export interface Planet {
  id: string;
  name: string;
  galaxy: string;
  climate: number; // need to correct on backend or have mapper
  numberOfDocks: number;
  taxRate: number;
  politicalFee: number;
  xCoordinate: number;
  yCoordinate: number;
  zCoordinate: number;
}

export interface Galaxy {
  id: string;
  name: string;
  supercluster: string;
  numberOfPlanets: number;
  xCoordinate: number;
  yCoordinate: number;
  zCoordinate: number;
}

export interface Cargo {
  type: string;
  weight: number;
  volume?: number;
  value?: number;
  specialHandling?: string;
}

export interface Quote {
  baseCost: number;
  distanceCost: number;
  originTax: number;
  originPoliticalFee: number;
  destinationTax: number;
  destinationPoliticalFee: number;
  cargoCost: number;
  total: number;
}

export interface SavedQuote extends Quote {
  id: string;
  userId: string;
  originPlanetId: string;
  destinationPlanetId: string;
  originPlanetName: string;
  destinationPlanetName: string;
  cargoType: string;
  cargoWeight: number;
  cargoValue?: number;
  createdAt: string;
}
