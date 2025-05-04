'use client';
import AuthHeader from '../../../../components/AuthHeader';
import { estimateMaintenance } from '../../../../utils/mockMaintenanceEstimator';
import config from '../../../../data/defaultTimelineConfig.json';
import params from '../../../../data/mockUserInput.json';

export default function MaintenanceTimeline() {
  const results = estimateMaintenance(params, config);

  return (
    <div style={{ padding: '2rem' }}>
      <AuthHeader />
      <h1>🛠 Maintenance Timeline</h1>
      <table style={{ width: '100%', marginTop: '1rem' }}>
        <thead><tr><th>Year</th><th>Category</th><th>Cost</th></tr></thead>
        <tbody>
          {results.map((r, i) => (
            <tr key={i}><td>{r.year}</td><td>{r.category}</td><td>${r.cost.toFixed(2)}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}