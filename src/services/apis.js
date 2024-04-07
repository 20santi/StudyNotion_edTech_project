const BASE_URL = process.env.REACT_APP_BASE_URL;

export const endPoints = {
    SEND_OTP: BASE_URL + "/auth/sendOtp",
    SIGN_UP: BASE_URL + "/auth/signup",
    LOGIN: BASE_URL + "/auth/login",

    RESET_PASSWORD_TOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESET_PASSWORD_API: BASE_URL + "/auth/reset-password"
}

export const courseEndPoints = {
    // API for course
    SHOW_ALL_CATEGORY_API: BASE_URL + "/course/showAllCategory",
    FETCH_CATEGORY_DETAILS: BASE_URL + "/course/fetchCategory",
    CREATE_COURSE_API: BASE_URL + "/course/createCourse",
    EDIT_COURSE_API: BASE_URL + "/course/editCourse",
    FETCH_COURSE_DETAILS_API: BASE_URL + "/course/fetchCourse",
    FETCH_ALL_COURSES: BASE_URL + "/course/getAllCourses",
    DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",

    // API for section
    CREATE_SECTION_API: BASE_URL + "/course/createSection",
    DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
    EDIT_SECTION_API: BASE_URL + "/course/editSection",

    // API for subsection
    CREATE_SUBSECTION_API: BASE_URL + "/course/createSubsection",
    EDIT_SUBSECTION_API: BASE_URL + "/course/editSubsection",
    DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubsection",
}

export const profileEndPoints = {
    IMAGE_UPLOAD_API: BASE_URL + "/profile/profileUpload",
    PROFILE_UPDATE_API: BASE_URL + "/profile/profileUpdate",
    PASSWORD_UPDATE_API: BASE_URL + "/profile/updatePassword"
}

