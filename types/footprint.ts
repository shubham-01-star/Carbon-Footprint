export interface FootprintData {
  carMilesPerWeek: number;
  flightsPerYear: number;
  electricityBill: number;
  diet: 'meat-heavy' | 'average' | 'vegetarian' | 'vegan';
}

export interface CarbonBreakdown {
  transportation: number; // in kg CO2e
  energy: number;
  diet: number;
  total: number;
}
