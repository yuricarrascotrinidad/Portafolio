// admin/hooks/useAdminAuth.ts
import { useState, useEffect } from 'react'
import { api } from '../../services/api'

export function useAdminAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    const login = async (email: string, password: string) => {
        try {
            const response = await api.login(email, password)
            localStorage.setItem('adminToken', response.token)
            localStorage.setItem('adminUser', JSON.stringify(response.user))
            setIsAuthenticated(true)
            window.location.href = '/admin/dashboard'
            return response
        } catch (error) {
            throw error
        }
    }

    const logout = () => {
        localStorage.removeItem('adminToken')
        localStorage.removeItem('adminUser')
        setIsAuthenticated(false)
        window.location.href = '/admin'
    }

    const verify = async () => {
        const token = localStorage.getItem('adminToken')
        if (!token) {
            setLoading(false)
            return
        }

        try {
            const result = await api.verify(token)
            setIsAuthenticated(result.valid)
        } catch {
            localStorage.removeItem('adminToken')
            localStorage.removeItem('adminUser')
            setIsAuthenticated(false)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        verify()
    }, [])

    return { isAuthenticated, loading, login, logout, verify }
}