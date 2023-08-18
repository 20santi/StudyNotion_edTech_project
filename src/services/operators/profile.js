import { toast } from "react-hot-toast";
import { setLoading } from "../../slices/authSlice";
import { apiConnector } from "../apiConnector";
import { profileEndPoints } from "../apis";

const { IMAGE_UPLOAD_API, PROFILE_UPDATE_API, PASSWORD_UPDATE_API } = profileEndPoints;

export function profileUpload(token, formData) {
    const toastId = toast.loading("Loading...");
    setLoading(true);
    return async(dispatch) => {
         try {
            const response = await apiConnector("PUT", IMAGE_UPLOAD_API, formData, {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            })
             console.log("IMAGE_UPLOAD_API response: ", response);
    
             toast.success("Image uploaded successfully");
             
         } catch(error) {
            console.log("Error in IMAGE_UPLOAD_API: ", error);
            toast.error("Could not upload image");
         }
         toast.dismiss(toastId);
         setLoading(false);
    }
}

export function profileUpdate(token, data) {
    const toastId = toast.loading("Loading...");
    setLoading(true);
    return async(dispatch) => {
         try {
            const response = await apiConnector("PUT", PROFILE_UPDATE_API, data, {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            })
             console.log("PROFILE_UPDATE_API response: ", response);
    
             toast.success("Profile update successfully");
             
         } catch(error) {
            console.log("Error in PROFILE_UPDATE_API: ", error);
            toast.error("Could not update profile");
         }
         toast.dismiss(toastId);
         setLoading(false);
    }
}

export function passwordUpdate(id, password, newPassword) {
    const toastId = toast.loading("Loading...");
    setLoading(true);
    return async(dispatch) => {
         try {
            const response = await apiConnector("POST", PASSWORD_UPDATE_API, {
                id: id,
                password: password,
                newPassword: newPassword,
            })
             console.log("PASSWORD_UPDATE_API response: ", response);
    
             toast.success("Password update successfully");
             
         } catch(error) {
            console.log("Error in PASSWORD_UPDATE_API: ", error);
            toast.error("Could not update password");
         }
         toast.dismiss(toastId);
         setLoading(false);
    }
}