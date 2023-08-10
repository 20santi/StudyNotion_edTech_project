import { toast } from "react-hot-toast";
import { endPoints } from "../apis";
import { setLoading, setToken } from "../../slices/authSlice";
import { apiConnector } from "../apiConnector";
import { setUser } from "../../slices/profileSlice";

const { SEND_OTP, SIGN_UP, LOGIN } = endPoints;

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SEND_OTP, {
        email,
        userExist: true,
      });
      console.log("SEND_OTP response: ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP sent successfully");
      navigate("/verify-email");
    } catch (error) {
      console.log("SEND_OTP api error: ", error);
      toast.error("could not send otp");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function signup(data, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", SIGN_UP, data);
      console.log("SIGN_UP response: ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("SignUp successfully");
      navigate("/login");
    } catch (error) {
      console.log("SIGN_UP api error: ", error);
      toast.error("Could not signup");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function login(data, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", LOGIN, data);
      console.log("LOGIN api response: ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login successfully");
      dispatch(setToken(response.data.token));
      const userImage = response?.data?.image
        ? response.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.existingUser.firstName} ${response.data.existingUser.lastName}`;
      dispatch(setUser({ ...response.data.existingUser, image: userImage }));

      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.existingUser));
      navigate("/myprofile");
    } catch (error) {
      console.log("LOGIN api error: ", error);
      toast.error(error.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
