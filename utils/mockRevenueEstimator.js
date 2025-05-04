import revenueData from '../data/mockRevenue.json';

export function estimateRevenue(params, config, region = 'US', horizon = 30) {
  const scalarMap = {
    'Single Family Home Construction': params.homes,
    'Solar Panels': params.solarMW,
    'Wind Turbines': params.windMW,
    'Roads': params.roadMiles,
    'Medium Density Housing Construction': params.mediumDensityUnits,
    'Farm Facilities': params.businessUnits
  };

  const yearly = [];

  for (let y = 1; y <= horizon; y++) {
    let total = 0;

    for (const entry of revenueData) {
      if (entry.region !== region) continue;
      const cfg = config[entry.category] || {};
      const delay = cfg.revenueDelay || 0;
      const lifespan = cfg.revenueYears || 30;
      const active = y >= delay + 1 && y < delay + 1 + lifespan;

      if (active && scalarMap[entry.category]) {
        total += scalarMap[entry.category] * entry.revenuePerUnit;
      }
    }

    yearly.push({ year: y, totalRevenue: total });
  }

  return yearly;
}