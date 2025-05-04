'use client';
import AuthHeader from '../../../../components/AuthHeader';
import { estimateRevenue } from '../../../../utils/mockRevenueEstimator';
import { estimateMaintenance } from '../../../../utils/mockMaintenanceEstimator';
import config from '../../../../data/defaultTimelineConfig.json';
import params from '../../../../data/mockUserInput.json';

export default function LifecycleTimeline() {
  const revenue = estimateRevenue(params, config);
  const maintenance = estimateMaintenance(params, config);

  return (
    <div style={{ padding: '2rem' }}>
      <AuthHeader />
      <h1>📈 Lifecycle Revenue vs Maintenance</h1>
      <table style={{ width: '100%', marginTop: '1rem' }}>
        <thead><tr><th>Year</th><th>Revenue</th><th>Maintenance</th></tr></thead>
        <tbody>
          {revenue.map((r, i) => {
            const m = maintenance.find(m => m.year === r.year);
            return <tr key={i}>
              <td>{r.year}</td>
              <td>${r.totalRevenue.toFixed(2)}</td>
              <td>${m ? m.cost.toFixed(2) : 0}</td>
            </tr>;
          })}
        </tbody>
      </table>
    </div>
  );
}