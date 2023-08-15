import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Tab from "../../../Comon/Tab";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../services/operators/authApi";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleOnSubmit = (data) => {
    dispatch(login(data, navigate));
  };
  const [accountType, setAccountType] = useState("Student");

  const accountData = [
    {
      id: 1,
      account_type: "Student",
    },
    {
      id: 2,
      account_type: "Instructor",
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="pt-3">
        <Tab
          accountData={accountData}
          tabData={accountType}
          setTabData={setAccountType}
        />
      </div>
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="flex flex-col gap-y-4 pt-4"
      >
        <div className="flex flex-col">
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

        <div className="flex flex-col relative">
          <label
            htmlFor="password"
            className="font-inter font-400 text-[14px] text-richblack-5 leading-[22px]"
          >
            Password <span className="text-pink-200">*</span>
          </label>
          <input
            id="password"
            type="text"
            placeholder="Enter Password"
            {...register("password", { required: true })}
            className="max-w-[444px] h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                      leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-800 opacity-[0.9]
                      shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
          />
          {errors.message && (
            <span className=" text-pink-200">Password is required</span>
          )}

          <Link to="/forgot-password">
            <div className="font-inter font-bold text-xs text-blue-100 absolute right-0 -bottom-6">
              Forgot Password
            </div>
          </Link>
        </div>

        <button
          type="submit"
          className="max-w-[444px] text-richblue-900 font-bold h-[48px] rounded-lg p-3 bg-yellow-50 mt-10"
        >
          Login
        </button>
      </form>
    </div>
  );
}
