import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import { useForm } from "react-hook-form";
import { ResetPassword } from "../services/operators/authApi";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(
      ResetPassword(
        {
          password: data.password,
          confirmPassword: data.confirmPassword,
          id: id,
        },
        navigate
      )
    );
  };

  return (
    <div className="flex flex-col gap-y-3 w-[400px] text-white mx-auto mt-56">
      <div className="flex flex-col gap-y-2">
        <h1 className="font-bold text-[30px] leading-[2.4rem] font-inter text-richblack-5">
          Choose new password
        </h1>
        <p className=" text-[18px] leading-[1.7rem] font-400 text-richblack-100">
          Almost done. Enter your new password and youre all set.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col">
            <label htmlFor="password">
              New Password <span className="text-pink-200">*</span>
            </label>
            <input
              id="password"
              type="text"
              placeholder="Password"
              {...register("password", { required: true })}
              className="max-w-full h-[48px] p-3 mt-[6px] font-inter font-bold text-[12px]
                      leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-800 opacity-[0.9]
                      shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
            />
            {errors.message && <span>Password is required</span>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="confirmPassword">
              Confirm New Password <span className="text-pink-200">*</span>
            </label>
            <input
              id="confirmPassword"
              type="text"
              placeholder="Confirm Password"
              {...register("confirmPassword", { required: true })}
              className="max-w-full h-[48px] p-3 mt-[6px] font-inter font-bold text-[12px]
                      leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-800 opacity-[0.9]
                      shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
            />
            {errors.message && <span>Enter Password</span>}
          </div>
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

export default UpdatePassword;
