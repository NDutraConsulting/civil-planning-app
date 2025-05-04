'use client';
import AuthHeader from '../../../../components/AuthHeader';
import { useEffect, useState } from 'react';
import { distributeConstructionCosts } from '../../../../utils/distributeConstructionCost';
import data from '../../../../data/mockAverages.json';
import config from '../../../../data/defaultTimelineConfig.json';

export default function ConstructionTimeline() {
  const [result, setResult] = useState([]);

  useEffect(() => {
    const mock = Object.entries(data).flatMap(([category, subs]) =>
      Object.entries(subs).map(([subcategory, regionCosts]) => ({
        category,
        subcategory,
        region: 'US',
        unitCost: regionCosts['US'],
        scaledCost: regionCosts['US'] * 1
      }))
    );
    setResult(distributeConstructionCosts(mock, config));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <AuthHeader />
      <h1>🏗 Construction Timeline</h1>
      <table style={{ width: '100%', marginTop: '1rem' }}>
        <thead><tr><th>Year</th><th>Category</th><th>Subcategory</th><th>Cost</th></tr></thead>
        <tbody>
          {result.map((r, i) => (
            <tr key={i}><td>{r.year}</td><td>{r.category}</td><td>{r.subcategory}</td><td>${r.cost.toFixed(2)}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}