'use client';
export default function ExportPanel({ data }) {
  const exportCSV = () => {
    const rows = data.map(row => Object.values(row).join(','));
    const csv = [Object.keys(data[0]).join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'export.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return <button onClick={exportCSV}>📤 Export as CSV</button>;
}