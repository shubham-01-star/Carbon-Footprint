import { FootprintData, CarbonBreakdown } from '../types/footprint';

export function calculateFootprint(data: FootprintData): CarbonBreakdown {
  // Simple conversion metrics logic 
  // Car: avg 0.4 kg CO2e per mile
  // Flights: ~1000 kg CO2e per average short/medium flight
  const transportation = (data.carMilesPerWeek * 52 * 0.4) + (data.flightsPerYear * 1000);
  
  // Energy: roughly mapping $1 bill to ~5kg standard grid emissions
  const energy = data.electricityBill * 12 * 5;
  
  // Diet footprint baseline per year
  let diet = 2000;
  if (data.diet === 'meat-heavy') diet = 3000;
  if (data.diet === 'vegetarian') diet = 1200;
  if (data.diet === 'vegan') diet = 800;

  const total = transportation + energy + diet;

  return {
    transportation: Math.round(transportation),
    energy: Math.round(energy),
    diet: Math.round(diet),
    total: Math.round(total)
  };
}
