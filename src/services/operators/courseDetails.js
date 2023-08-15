import { toast } from "react-hot-toast";
import { setLoading } from "../../slices/authSlice";
import { apiConnector } from "../apiConnector";
import { courseEndPoints } from "../apis";

const { SHOW_ALL_CATEGORY_API } = courseEndPoints;

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
