import { toast } from "react-hot-toast";
import { endPoints } from "../apis";
import { setLoading, setToken } from "../../slices/authSlice";
import { apiConnector } from "../apiConnector";
import { setUser } from "../../slices/profileSlice";
import { useSelector } from "react-redux";

const { SEND_OTP, SIGN_UP, LOGIN, RESET_PASSWORD_TOKEN_API, RESET_PASSWORD_API } = endPoints;

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
      dispatch(setUser(response.data.existingUser));

      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.existingUser));
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("LOGIN api error: ", error);
      toast.error(error.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function ResetPasswordToken(data, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "POST",
        RESET_PASSWORD_TOKEN_API,
        data
      );
      console.log("RESET_PASSWORD_TOKEN_API response: ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Email sent successfully");
      navigate(`/conformationPage/${data.email}`)
    } catch (error) {
      console.log("RESET_PASSWORD_TOKEN_API error: ", error);
      toast.error(error.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function ResetPassword(data, navigate) {
  return async(dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", RESET_PASSWORD_API, data);
      console.log("RESET_PASSWORD_API response: ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password updated successfully");
      navigate("/password-updated")

    } catch (error) {
      console.log("RESET_PASSWORD_API error: ", error);
      toast.error(error.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
}

export function logOut(navigate) {
  return async(dispatch) => {
    try {
      dispatch(setUser(null));
      dispatch(setToken(null));
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success("Logout successfully");
      navigate("/");
    } catch(error) {
      console.log("Logout error, ", error);
      toast.error("Could not logout");
    }
  }
}
