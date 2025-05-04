'use client';
export default function UserInputPanel({ params, setParams }) {
  const update = (key, value) => {
    setParams(prev => ({ ...prev, [key]: Number(value) }));
  };

  return (
    <div>
      <label>🏠 Homes: <input type="number" value={params.homes} onChange={e => update('homes', e.target.value)} /></label><br/>
      <label>🔌 Solar MW: <input type="number" value={params.solarMW} onChange={e => update('solarMW', e.target.value)} /></label><br/>
      <label>💨 Wind MW: <input type="number" value={params.windMW} onChange={e => update('windMW', e.target.value)} /></label><br/>
      <label>🛣️ Road Miles: <input type="number" value={params.roadMiles} onChange={e => update('roadMiles', e.target.value)} /></label><br/>
      <label>🏢 Medium Density Units: <input type="number" value={params.mediumDensityUnits} onChange={e => update('mediumDensityUnits', e.target.value)} /></label><br/>
      <label>🏭 Business Units: <input type="number" value={params.businessUnits} onChange={e => update('businessUnits', e.target.value)} /></label><br/>
    </div>
  );
}