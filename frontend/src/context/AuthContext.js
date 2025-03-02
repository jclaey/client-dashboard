import { useState, useEffect, createContext } from 'react'
import api from '../api.js'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(sessionStorage.getItem("accessToken") || null)
    const [isSignedIn, setIsSignedIn] = useState(!!accessToken)

    useEffect(() => {
        console.log("🔹 Webpack Injected NODE_ENV:", process.env.NODE_ENV)
        console.log("🔹 Checking authentication on page load...")

        if (!accessToken && !document.cookie.includes("refreshToken")) {
            console.warn("❌ No refresh token found in cookies. Logging out user...")
            setAccessToken(null)
            setIsSignedIn(false)
            sessionStorage.removeItem("accessToken")
            return
        }

        if (accessToken) {
            console.log("✅ Access token already exists, skipping refresh check.")
            return
        }

        if (process.env.NODE_ENV !== 'production' && !document.cookie.includes("refreshToken")) {
            console.warn("❌ No refresh token found in cookies. Logging out user...")
            setAccessToken(null)
            setIsSignedIn(false)
            sessionStorage.removeItem("accessToken")
            return
        }

        const checkAuth = async () => {
            try {
                console.log("🔹 Sending refresh token request...")
                const response = await api.post("/users/refresh", {}, { withCredentials: true })

                console.log("✅ Refresh successful, new access token:", response.data.accessToken)
                setAccessToken(response.data.accessToken)
                sessionStorage.setItem("accessToken", response.data.accessToken)
                setIsSignedIn(true)

            } catch (err) {
                console.error("❌ Refresh token request failed:", err)
                setAccessToken(null)
                setIsSignedIn(false)
                sessionStorage.removeItem("accessToken")
            }
        }

        checkAuth()
    }, [accessToken])

    return (
        <AuthContext.Provider value={{ accessToken, isSignedIn, setAccessToken, setIsSignedIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext