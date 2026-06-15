import { Navigate } from '@tanstack/react-router'
import { useFirebaseUser } from '../../hooks/useFirebaseUser'

type ProtectedRouteProps = {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useFirebaseUser()

  if (isLoading) {
    return <div>Ładowanie...</div>
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return children
}