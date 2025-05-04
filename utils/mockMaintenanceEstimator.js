import maintenanceData from '../data/mockMaintenance.json';

export function estimateMaintenance(params, config, region = 'US', years = 30) {
  const scalarMap = {
    'Roads': params.roadMiles,
    'Solar Panels': params.solarMW,
    'Wind Turbines': params.windMW,
    'Single Family Home Construction': params.homes,
    'Medium Density Housing Construction': params.mediumDensityUnits,
    'Farm Facilities': params.businessUnits
  };

  const output = [];

  for (const entry of maintenanceData) {
    const units = scalarMap[entry.category];
    if (!units) continue;

    const freq = config[entry.category]?.maintenanceFreq || entry.frequencyYears || 1;

    for (let y = freq; y <= years; y += freq) {
      output.push({
        year: y,
        category: entry.category,
        subcategory: entry.subcategory,
        cost: entry.costPerUnit * units
      });
    }
  }

  return output;
}