import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import { useForm } from "react-hook-form";
import { ResetPasswordToken } from "../services/operators/authApi";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(ResetPasswordToken(data, navigate));
  };

  return (
    <div className="flex flex-col gap-y-3 w-[400px] text-white mx-auto mt-56">
      <div className="flex flex-col gap-y-2">
        <h1 className="font-bold text-[30px] leading-[2.4rem] font-inter text-richblack-5">
          Reset your password
        </h1>
        <p className=" text-[18px] leading-[1.7rem] font-400 text-richblack-100">
          Have no fear. We’ll email you instructions to reset your password. If
          you dont have access to your email we can try account recovery
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mt-5">
          <label
            htmlFor="email"
            className="font-inter font-400 text-[14px] text-richblack-5 leading-[22px]"
          >
            Email Address <span className="text-pink-200">*</span>
          </label>
          <input
            id="email"
            type="text"
            placeholder="Enter your Email Address"
            {...register("email", { required: true })}
            className="max-w-[444px] h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                      leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-800 opacity-[0.9]
                      shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
          />
          {errors.message && (
            <span className=" text-pink-200">Email Address is required</span>
          )}
        </div>

        <button
          type="submit"
          className="w-full text-richblue-900 h-[48px] rounded-lg p-3 bg-yellow-50 mt-6 font-bold"
        >
          Reset Password
        </button>
      </form>

      <div className="flex justify-between">
        <div className="flex text-white items-center gap-x-1">
          <MdKeyboardBackspace />
          <button onClick={() => navigate("/login")}>Back to Login</button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
