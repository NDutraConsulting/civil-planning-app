'use client';
export default function CategoryTimelineEditor({ config, setConfig }) {
  const handleChange = (category, field, value) => {
    setConfig(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: field.includes('Years') || field.includes('Freq') ? Number(value) : value
      }
    }));
  };

  const categories = Object.keys(config);

  return (
    <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
      <h2>Edit Timeline Configuration</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%', background: '#fff' }}>
        <thead>
          <tr style={{ background: '#eee' }}>
            <th>Category</th>
            <th>Construction (Years)</th>
            <th>Pattern</th>
            <th>Revenue Delay</th>
            <th>Revenue Lifespan</th>
            <th>Maintenance Freq</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category}>
              <td><b>{category}</b></td>
              <td><input type="number" value={config[category].constructionYears} onChange={e => handleChange(category, 'constructionYears', e.target.value)} /></td>
              <td>
                <select value={config[category].constructionPattern} onChange={e => handleChange(category, 'constructionPattern', e.target.value)}>
                  <option value="linear">Linear</option>
                  <option value="ramp-up">Ramp-up</option>
                  <option value="front-loaded">Front-loaded</option>
                  <option value="even">Even</option>
                </select>
              </td>
              <td><input type="number" value={config[category].revenueDelay} onChange={e => handleChange(category, 'revenueDelay', e.target.value)} /></td>
              <td><input type="number" value={config[category].revenueYears} onChange={e => handleChange(category, 'revenueYears', e.target.value)} /></td>
              <td><input type="number" value={config[category].maintenanceFreq} onChange={e => handleChange(category, 'maintenanceFreq', e.target.value)} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}