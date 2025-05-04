'use client';
import { useEffect, useState } from 'react';

export default function AuthHeader() {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.ok ? res.json() : null)
      .then(data => setEmail(data?.email || null));
  }, []);

  const logout = async () => {
    await fetch('/api/auth/logout');
    window.location.href = '/login';
  };

  return (
    <div style={{ padding: '1rem', background: '#eee', textAlign: 'right' }}>
      {email ? (
        <>
          <span>👤 {email}</span>
          <button onClick={logout} style={{ marginLeft: '1rem' }}>🚪 Logout</button>
        </>
      ) : (
        <a href="/login">Login</a>
      )}
    </div>
  );
}