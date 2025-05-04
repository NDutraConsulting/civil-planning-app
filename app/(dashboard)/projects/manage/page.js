'use client';
import { useEffect, useState } from 'react';
import AuthHeader from '../../../../components/AuthHeader';

export default function ManageProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editTags, setEditTags] = useState('');

  useEffect(() => {
    fetch('/api/projects').then(res => res.json()).then(setProjects);
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this snapshot?')) return;
    await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const handleEdit = (p) => {
    setEditId(p.id);
    setEditName(p.name);
    setEditTags((p.tags || []).join(', '));
  };

  const handleSave = async (id) => {
    await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editName, tags: editTags.split(',').map(t => t.trim()) })
    });
    const updated = await fetch('/api/projects').then(res => res.json());
    setProjects(updated);
    setEditId(null);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <AuthHeader />
      <h1>🛠 Manage Snapshots</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#eee' }}><th>Name</th><th>Tags</th><th>Created</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {projects.map(p => (
            <tr key={p.id}>
              <td>{editId === p.id
                ? <input value={editName} onChange={e => setEditName(e.target.value)} />
                : p.name}
              </td>
              <td>{editId === p.id
                ? <input value={editTags} onChange={e => setEditTags(e.target.value)} />
                : (p.tags || []).join(', ')}
              </td>
              <td>{new Date(p.createdAt).toLocaleString()}</td>
              <td>{editId === p.id
                ? <>
                    <button onClick={() => handleSave(p.id)}>💾 Save</button>
                    <button onClick={() => setEditId(null)}>Cancel</button>
                  </>
                : <>
                    <button onClick={() => handleEdit(p)}>✏️ Edit</button>
                    <button onClick={() => handleDelete(p.id)}>🗑 Delete</button>
                  </>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}