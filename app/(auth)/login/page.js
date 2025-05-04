'use client';
import { useEffect, useState } from 'react';
import Redirecting from '../../../components/Redirecting';

export default function LoginPage() {
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    fetch('/api/auth/me').then(res => {
      if (res.ok) window.location.href = '/projects';
      else setChecking(false);
    });
  }, []);

  if (checking) return <Redirecting />;

  const login = async () => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    alert(data.message || data.error);
    if (res.ok) window.location.href = '/projects';
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🔐 Login</h1>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
      <button onClick={login}>Login</button>
    </div>
  );
}