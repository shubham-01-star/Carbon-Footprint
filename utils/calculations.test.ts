import { calculateFootprint } from './calculations';
import { FootprintData } from '../types/footprint';

// Note: This is an example unit test file demonstrating functional validation
// It can be run using a test runner like Vitest or Jest.

describe('calculateFootprint', () => {
  it('calculates footprint correctly for average user', () => {
    const mockData: FootprintData = {
      carMilesPerWeek: 100, // 100 * 52 * 0.4 = 2080
      flightsPerYear: 1,    // 1 * 1000 = 1000 (total transport = 3080)
      electricityBill: 100, // 100 * 12 * 5 = 6000
      diet: 'average'       // 2000
    };

    const result = calculateFootprint(mockData);

    expect(result.transportation).toBe(3080);
    expect(result.energy).toBe(6000);
    expect(result.diet).toBe(2000);
    expect(result.total).toBe(11080);
  });

  it('calculates footprint correctly for vegan user with no transport', () => {
    const mockData: FootprintData = {
      carMilesPerWeek: 0,
      flightsPerYear: 0,
      electricityBill: 50, // 50 * 12 * 5 = 3000
      diet: 'vegan'        // 800
    };

    const result = calculateFootprint(mockData);

    expect(result.transportation).toBe(0);
    expect(result.energy).toBe(3000);
    expect(result.diet).toBe(800);
    expect(result.total).toBe(3800);
  });
});
