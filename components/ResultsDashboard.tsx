'use client';

import React, { useEffect, useState } from 'react';
import { CarbonBreakdown } from '../types/footprint';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { ArrowLeft, Lightbulb, Leaf, Activity } from 'lucide-react';

const COLORS = ['#10b981', '#f59e0b', '#3b82f6']; // Emerald, Amber, Blue

export default function ResultsDashboard({
  breakdown,
  onReset
}: {
  breakdown: CarbonBreakdown;
  onReset: () => void;
}) {
  const [tips, setTips] = useState<string[]>([]);
  const [loadingTips, setLoadingTips] = useState(true);

  // Memoize chart data mapping to prevent expensive rebuilds on other state changes
  const chartData = React.useMemo(() => [
    { name: 'Transportation', value: breakdown.transportation },
    { name: 'Home Energy', value: breakdown.energy },
    { name: 'Diet', value: breakdown.diet },
  ], [breakdown]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function fetchInsights() {
      try {
        const res = await fetch('/api/insights', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ breakdown }),
          signal
        });
        const data = await res.json();
        if (!signal.aborted && data.tips) setTips(data.tips);
      } catch (err: any) {
         if (!signal.aborted) {
            setTips([
              "Consider switching to a renewable energy provider.", 
              "Carpool or combine errands to reduce transport miles.", 
              "Eat locally sourced, in-season produce."
            ]);
         }
      } finally {
        if (!signal.aborted) setLoadingTips(false);
      }
    }
    fetchInsights();
    return () => { 
      controller.abort(); 
    };
  }, [breakdown]);

  return (
    <div className="space-y-8">
      <button 
        onClick={onReset} 
        className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Calculator
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Side: Summary and Charts */}
        <div className="bg-white p-8 rounded-3xl shadow-sm ring-1 ring-slate-200 flex flex-col items-center justify-center">
          <div className="text-center mb-8">
            <h2 className="text-lg font-medium text-slate-500">Your Annual Carbon Footprint</h2>
            <div className="text-5xl font-bold text-emerald-900 mt-2 tracking-tight">
              {breakdown.total.toLocaleString()} <span className="text-xl text-slate-400 font-normal">kg CO₂e</span>
            </div>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  formatter={(value: any) => [`${Number(value).toLocaleString()} kg`, 'Emissions']}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Side: AI Recommendations */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-3xl shadow-sm ring-1 ring-emerald-100 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-emerald-100 p-2 rounded-xl text-emerald-700">
              <Lightbulb className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-emerald-900">AI Personal Recommendations</h2>
          </div>

          {loadingTips ? (
            <div className="space-y-4 flex-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse flex gap-4 p-4 bg-white/50 rounded-2xl">
                  <div className="w-6 h-6 bg-emerald-200/50 rounded-full shrink-0" />
                  <div className="w-full space-y-2">
                    <div className="h-4 bg-emerald-200/50 rounded w-3/4" />
                    <div className="h-4 bg-emerald-200/50 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ul className="space-y-4 flex-1">
              {tips.map((tip, idx) => (
                <li key={idx} className="flex gap-4 p-4 bg-white/60 rounded-2xl ring-1 ring-emerald-500/10">
                  <Leaf className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-emerald-900 leading-relaxed font-medium">{tip}</span>
                </li>
              ))}
            </ul>
          )}
          
          <div className="mt-8 flex items-center justify-between pt-4 border-t border-emerald-200/50">
             <div className="flex items-center gap-2 text-sm text-emerald-700 font-medium">
               <Activity className="w-4 h-4" /> Analyzed using Gemini 3.1 
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
