import { toast } from "react-hot-toast";
import { setLoading } from "../../slices/authSlice";
import { apiConnector } from "../apiConnector";
import { profileEndPoints } from "../apis";

const { IMAGE_UPLOAD_API } = profileEndPoints;

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