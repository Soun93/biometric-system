import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export function ProtectedRoute() {
  const auth = useAuth()

  return auth.isAuthenticated ? <Outlet /> : <Navigate to='/'/>
}