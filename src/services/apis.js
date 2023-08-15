const BASE_URL = process.env.REACT_APP_BASE_URL;

export const endPoints = {
    SEND_OTP: BASE_URL + "/auth/sendOtp",
    SIGN_UP: BASE_URL + "/auth/signup",
    LOGIN: BASE_URL + "/auth/login",

    RESET_PASSWORD_TOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESET_PASSWORD_API: BASE_URL + "/auth/reset-password"
}

export const courseEndPoints = {
    SHOW_ALL_CATEGORY_API: BASE_URL + "/course/showAllCategory"
}

export const profileEndPoints = {
    IMAGE_UPLOAD_API: BASE_URL + "/profile/profileUpload"
}

