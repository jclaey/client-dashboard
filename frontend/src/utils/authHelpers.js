export const getAccessToken = () => sessionStorage.getItem("accessToken")

export const setAccessToken = (token) => {
    if (token) {
        sessionStorage.setItem("accessToken", token)
    } else {
        sessionStorage.removeItem("accessToken")
    }
}