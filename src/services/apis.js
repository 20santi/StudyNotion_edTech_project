const BASE_URL = process.env.REACT_APP_BASE_URL;

export const endPoints = {
    SEND_OTP: BASE_URL + "/auth/sendOtp",
    SIGN_UP: BASE_URL + "/auth/signup",
    LOGIN: BASE_URL + "/auth/login",
}
