'use client';

import React, { useState } from 'react';
import { FootprintData } from '../types/footprint';
import { Car, Plane, Zap, Utensils } from 'lucide-react';

export default function FootprintForm({
  initialData,
  onCalculate,
}: {
  initialData: FootprintData;
  onCalculate: (data: FootprintData) => void;
}) {
  const [formData, setFormData] = useState<FootprintData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'diet' ? value : Number(value) || 0,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-sm ring-1 ring-slate-200 rounded-3xl p-6 md:p-10 transition-all">
      <div className="grid gap-8">
        
        {/* Transportation */}
        <section>
          <div className="flex items-center gap-2 mb-4 text-emerald-900">
            <Car className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-semibold">Transportation</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="carMilesPerWeek" className="block text-sm font-medium text-slate-700 mb-1">
                Miles driven per week
              </label>
              <input
                id="carMilesPerWeek"
                name="carMilesPerWeek"
                type="number"
                min="0"
                value={formData.carMilesPerWeek}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-shadow"
                placeholder="0"
              />
            </div>
            <div>
              <label htmlFor="flightsPerYear" className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                <Plane className="w-4 h-4 text-slate-400" />
                Flights per year (Round trips)
              </label>
              <input
                id="flightsPerYear"
                name="flightsPerYear"
                type="number"
                min="0"
                value={formData.flightsPerYear}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-shadow"
                placeholder="0"
              />
            </div>
          </div>
        </section>

        <hr className="border-slate-100" />

        {/* Home Energy */}
        <section>
          <div className="flex items-center gap-2 mb-4 text-emerald-900">
            <Zap className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-semibold">Home Energy</h2>
          </div>
          <div>
            <label htmlFor="electricityBill" className="block text-sm font-medium text-slate-700 mb-1">
              Average Monthly Electricity Bill ($)
            </label>
            <input
              id="electricityBill"
              name="electricityBill"
              type="number"
              min="0"
              value={formData.electricityBill}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-shadow"
              placeholder="100"
            />
          </div>
        </section>

        <hr className="border-slate-100" />

        {/* Diet */}
        <section>
          <div className="flex items-center gap-2 mb-4 text-emerald-900">
            <Utensils className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-semibold">Diet & Lifestyle</h2>
          </div>
          <div>
             <label htmlFor="diet" className="block text-sm font-medium text-slate-700 mb-1">
                Typical Diet Configuration
              </label>
              <select
                id="diet"
                name="diet"
                value={formData.diet}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-shadow"
              >
                <option value="meat-heavy">Meat-heavy (Meat daily)</option>
                <option value="average">Average (Mixed diet)</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan / Plant-based</option>
              </select>
          </div>
        </section>

      </div>

      <div className="mt-8 pt-4">
        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors focus:ring-4 focus:ring-emerald-500/20"
        >
          Calculate My Footprint
        </button>
      </div>
    </form>
  );
}
