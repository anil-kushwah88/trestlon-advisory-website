import { useState } from 'react';
import { getToken, clearToken } from '../../lib/api';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

export default function AdminApp() {
  const [authed, setAuthed] = useState(() => !!getToken());

  const handleLogout = () => {
    clearToken();
    setAuthed(false);
  };

  return (
    <div className="min-h-screen bg-navyDeep text-cream font-sans">
      {authed ? <AdminDashboard onLogout={handleLogout} /> : <AdminLogin onLogin={() => setAuthed(true)} />}
    </div>
  );
}
