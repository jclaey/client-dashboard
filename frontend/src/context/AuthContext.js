import { useState, useEffect, createContext } from 'react'
import api from '../api.js'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessTokenState] = useState(sessionStorage.getItem("accessToken") || null)
  const [isSignedIn, setIsSignedIn] = useState(!!accessToken)

  useEffect(() => {
    console.log("🔹 Webpack Injected NODE_ENV:", process.env.NODE_ENV)
    console.log("🔹 Checking authentication on page load...")

    if (accessToken) {
      console.log("✅ Access token already exists, skipping refresh check.")
      return
    }

    const checkAuth = async () => {
      try {
        console.log("🔹 Sending refresh token request...")
        const response = await api.post("/users/refresh", {}, { withCredentials: true })
        console.log("✅ Refresh successful, new access token:", response.data.accessToken)
        setAccessTokenState(response.data.accessToken)
        sessionStorage.setItem("accessToken", response.data.accessToken)
        setIsSignedIn(true)
      } catch (err) {
        console.error("❌ Refresh token request failed:", err)
        setAccessTokenState(null)
        setIsSignedIn(false)
        sessionStorage.removeItem("accessToken")
      }
    }

    checkAuth()
  }, [accessToken])

  useEffect(() => {
    const handleTokenUpdate = (e) => {
      const newToken = e.detail
      setAccessTokenState(newToken)
      setIsSignedIn(!!newToken)
    }

    window.addEventListener("tokenUpdated", handleTokenUpdate)

    return () => {
      window.removeEventListener("tokenUpdated", handleTokenUpdate)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ accessToken, isSignedIn, setAccessToken: setAccessTokenState, setIsSignedIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext