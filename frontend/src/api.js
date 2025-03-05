import axios from "axios"
import { getAccessToken, setAccessToken } from "./utils/authHelpers.js"

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshResponse = await axios.post(
          "http://localhost:5000/api/users/refresh",
          {},
          { withCredentials: true }
        )

        const newAccessToken = refreshResponse.data.accessToken

        setAccessToken(newAccessToken)

        window.dispatchEvent(new CustomEvent("tokenUpdated", { detail: newAccessToken }))

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`
        return api(originalRequest)
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError)
        return Promise.reject(refreshError)
      }
    }
    
    return Promise.reject(error)
  }
)

export default api