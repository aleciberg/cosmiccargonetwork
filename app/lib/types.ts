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
