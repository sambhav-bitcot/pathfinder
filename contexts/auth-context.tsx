"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User, UserRole } from "@/lib/types"
import { TEST_USERS } from "@/lib/test-users"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  loginAsTestUser: (role: UserRole) => void
  signup: (email: string, password: string, firstName: string,lastName:string, role: UserRole) => Promise<void>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("pathfinder_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Mock login - replace with actual API call
    const mockUser: User = {
      id: "1",
      email,
      firstName: "Demo",
      lastName: "User",
      role: "student",
      createdAt: new Date(),
    }
    setUser(mockUser)
    localStorage.setItem("pathfinder_user", JSON.stringify(mockUser))
  }

  const loginAsTestUser = (role: UserRole) => {
    const testUser = TEST_USERS[role]
    setUser(testUser)
    localStorage.setItem("pathfinder_user", JSON.stringify(testUser))
  }

  const signup = async (email: string, password: string, firstName: string,lastName:string, role: UserRole) => {
    // Mock signup - replace with actual API call
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
    firstName,
    lastName,
      role,
      createdAt: new Date(),
    }
    setUser(newUser)
    localStorage.setItem("pathfinder_user", JSON.stringify(newUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("pathfinder_user")
  }

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem("pathfinder_user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, loginAsTestUser, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
