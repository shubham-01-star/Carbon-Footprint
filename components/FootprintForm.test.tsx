import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FootprintForm from './FootprintForm';
import { FootprintData } from '../types/footprint';

describe('FootprintForm Component', () => {
  const mockInitialData: FootprintData = {
    carMilesPerWeek: 10,
    flightsPerYear: 0,
    electricityBill: 50,
    diet: 'average',
  };

  it('renders all form fields correctly', () => {
    // Basic structural test ensuring inputs mount correctly
    render(<FootprintForm initialData={mockInitialData} onCalculate={jest.fn()} />);
    
    expect(screen.getByLabelText(/Miles driven per week/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Flights per year/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Average Monthly Electricity Bill/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Typical Diet Configuration/i)).toBeInTheDocument();
  });

  it('calls onCalculate with updated form data upon submission', () => {
    const handleCalculate = jest.fn();
    render(<FootprintForm initialData={mockInitialData} onCalculate={handleCalculate} />);
    
    // Simulate user typing new values
    const milesInput = screen.getByLabelText(/Miles driven per week/i);
    fireEvent.change(milesInput, { target: { value: '45' } });
    
    // Simulate form submission
    const submitBtn = screen.getByRole('button', { name: /Calculate My Footprint/i });
    fireEvent.click(submitBtn);
    
    expect(handleCalculate).toHaveBeenCalledTimes(1);
    expect(handleCalculate).toHaveBeenCalledWith(expect.objectContaining({
      carMilesPerWeek: 45
    }));
  });
});
