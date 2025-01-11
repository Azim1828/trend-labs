'use client'

import { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  email: string
  name?: string
  phone?: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name?: string) => Promise<void>
  logout: () => void
  updateProfile: (data: { name?: string; phone?: string }) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)
      fetchProfile(storedToken)
    }
  }, [])

  async function fetchProfile(authToken: string) {
    try {
      const response = await fetch('/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })
      const data = await response.json()
      if (data.user) {
        setUser(data.user)
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error)
      logout()
    }
  }

  async function login(email: string, password: string) {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    
    const data = await response.json()
    if (!response.ok) throw new Error(data.error)
    
    setToken(data.token)
    setUser(data.user)
    localStorage.setItem('token', data.token)
  }

  async function signup(email: string, password: string, name?: string) {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name })
    })
    
    const data = await response.json()
    if (!response.ok) throw new Error(data.error)
  }

  function logout() {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
  }

  async function updateProfile(data: { name?: string; phone?: string }) {
    try {
      const response = await fetch('/api/auth/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      })
      
      if (!response.ok) throw new Error('Failed to update profile')
      
      const updatedUser = await response.json()
      setUser(prev => ({ ...prev, ...updatedUser }))
    } catch (error) {
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      signup, 
      logout,
      updateProfile 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 