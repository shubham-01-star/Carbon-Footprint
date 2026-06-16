'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { FootprintData, CarbonBreakdown } from '../types/footprint';
import { calculateFootprint } from '../utils/calculations';
import FootprintForm from './FootprintForm';
import { AnimatePresence, motion } from 'motion/react';

const ResultsDashboard = dynamic(() => import('./ResultsDashboard'), { 
  ssr: false, 
  loading: () => (
    <div className="w-full h-96 flex items-center justify-center animate-pulse bg-emerald-50 rounded-3xl ring-1 ring-emerald-100">
      <p className="text-emerald-700 font-medium">Loading visualization...</p>
    </div>
  )
});

const INITIAL_DATA: FootprintData = {
  carMilesPerWeek: 0,
  flightsPerYear: 0,
  electricityBill: 0,
  diet: 'average',
};

export default function FootprintApp() {
  const [data, setData] = useState<FootprintData>(INITIAL_DATA);
  const [breakdown, setBreakdown] = useState<CarbonBreakdown | null>(null);

  const handleCalculate = (formData: FootprintData) => {
    setData(formData); // Store it in case we need it later
    const result = calculateFootprint(formData);
    setBreakdown(result);
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setData(INITIAL_DATA);
    setBreakdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!breakdown ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <FootprintForm initialData={data} onCalculate={handleCalculate} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ResultsDashboard breakdown={breakdown} onReset={handleReset} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
