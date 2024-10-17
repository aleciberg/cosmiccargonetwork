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
