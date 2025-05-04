'use client';
import { useEffect, useState } from 'react';
import AuthHeader from '../../../components/AuthHeader';

export default function ProjectListPage() {
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(setProjects);
  }, []);

  const loadProject = async (project) => {
    setSelected(project);
    alert(`Loaded: ${project.name}`);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <AuthHeader />
      <h1>📁 Saved Project Snapshots</h1>
      {projects.length === 0 ? (
        <p>No snapshots yet.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#eee' }}>
              <th>Name</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(p => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{new Date(p.createdAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => loadProject(p)}>Load</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {selected && (
        <div style={{ marginTop: '2rem' }}>
          <h2>🔎 Preview: {selected.name}</h2>
          <pre>{JSON.stringify(selected.inputs, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}