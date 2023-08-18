import { toast } from "react-hot-toast";
import { setLoading } from "../../slices/authSlice";
import { apiConnector } from "../apiConnector";
import { courseEndPoints } from "../apis";

const { SHOW_ALL_CATEGORY_API, CREATE_COURSE_API } = courseEndPoints;

export function showAllCategory() {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    setLoading(true);
    var data = [];
    try {
      const response = await apiConnector("GET", SHOW_ALL_CATEGORY_API);
      console.log("SHOW_ALL_CATEGORY_API response: ", response);

      toast.success("fetch category details successfully");
      data = response.data.data;
    } catch (error) {
      console.log("SHOW_ALL_CATEGORY_API error: ", error);
      toast.error("Could not fetch categories");
    }
    toast.dismiss(toastId);
    setLoading(false);
    return data;
  };
}

export function createCourse(data, token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading");
    dispatch(setLoading(true));
    var result = null;
    try {
      const response = await apiConnector("POST", CREATE_COURSE_API, data, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      });
      console.log("CREATE_COURSE_API response: ", response);
      toast.success("Course Created Successfully");
      result = response;
    } catch (error) {
      toast.error("Course could not create");
      console.log("CREATE_COURSE_API error: ", error);
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
    return result;
  };
}
