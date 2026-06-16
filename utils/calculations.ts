import { FootprintData, CarbonBreakdown } from '../types/footprint';

const EMISSION_FACTORS = {
  CO2_PER_MILE: 0.4,
  CO2_PER_FLIGHT: 1000,
  CO2_PER_DOLLAR_ELECTRICITY: 5,
  WEEKS_IN_YEAR: 52,
  MONTHS_IN_YEAR: 12,
};

const DIET_EMISSIONS: Record<FootprintData['diet'], number> = {
  'meat-heavy': 3000,
  average: 2000,
  vegetarian: 1200,
  vegan: 800,
};

/**
 * Calculates the annual carbon footprint based on user inputs.
 * Resolves specific activity volumes into common Carbon Dioxide Equivalent (CO2e) units.
 * 
 * @param {FootprintData} data - The user's activity and consumption data.
 * @returns {CarbonBreakdown} A categorized breakdown of estimated yearly emissions in kg CO2e.
 */
export function calculateFootprint(data: FootprintData): CarbonBreakdown {
  const transportation = 
    (data.carMilesPerWeek * EMISSION_FACTORS.WEEKS_IN_YEAR * EMISSION_FACTORS.CO2_PER_MILE) + 
    (data.flightsPerYear * EMISSION_FACTORS.CO2_PER_FLIGHT);
  
  const energy = data.electricityBill * EMISSION_FACTORS.MONTHS_IN_YEAR * EMISSION_FACTORS.CO2_PER_DOLLAR_ELECTRICITY;
  
  const diet = DIET_EMISSIONS[data.diet] || DIET_EMISSIONS.average;

  const total = transportation + energy + diet;

  return {
    transportation: Math.round(transportation),
    energy: Math.round(energy),
    diet: Math.round(diet),
    total: Math.round(total)
  };
}
