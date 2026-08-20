// admin/components/AdminRoute.tsx
import { Navigate } from 'react-router-dom'
import { useAdminAuth } from '../hooks/useAdminAuth'

export function AdminRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, loading } = useAdminAuth()

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-900">
                <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
            </div>
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/admin" replace />
    }

    return <>{children}</>
}