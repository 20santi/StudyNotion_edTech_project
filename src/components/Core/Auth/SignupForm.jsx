import React, { useState } from "react";
import { useForm } from "react-hook-form";
import countrycode from "../../../data/countrycode.json";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSignupData } from "../../../slices/authSlice";
import { sendOtp } from "../../../services/operators/authApi";
import Tab from "../../../Comon/Tab";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleOnSubmit = (data) => {
    const signupData = { ...data, accountType };
    dispatch(setSignupData(signupData));
    dispatch(sendOtp(data.email, navigate));
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    <div>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="flex flex-col gap-y-4">
          <Tab
            accountData={accountData}
            tabData={accountType}
            setTabData={setAccountType}
          />

          <div className="flex gap-x-4">
            {/* first name */}
            <div className="flex flex-col">
              <label htmlFor="firstName">
                First Name <span className="text-pink-200">*</span>
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="Enter Your First Name"
                {...register("firstName", { required: true })}
                className="max-w-[212px] h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                      leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-800 opacity-[0.9]
                      shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
              />
              {errors.message && <span>First Name is required</span>}
            </div>

            {/* last name */}
            <div className="flex flex-col">
              <label htmlFor="lastName">
                Last Name <span className="text-pink-200">*</span>
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Enter Your Last Name"
                {...register("lastName", { required: true })}
                className="max-w-[212px] h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                      leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-800 opacity-[0.9]
                      shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
              />
              {errors.message && <span>Last Name is required</span>}
            </div>
          </div>

          {/* emial address */}
          <div className="flex flex-col">
            <label htmlFor="email">
              Email Address <span className="text-pink-200">*</span>
            </label>
            <input
              id="email"
              placeholder="Enter email address"
              type="text"
              {...register("email", { required: true })}
              className="max-w-[392px] h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                      leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-800 opacity-[0.9]
                      shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
            />
            {errors.message && <span>Email Address is required</span>}
          </div>

          {/* phone number */}
          <div className="">
            <label htmlFor="phoneNumber">
              Phone Number <span className="text-pink-200">*</span>
            </label>
            <div className="flex gap-x-4">
              <select
                id="dropdown"
                {...register("dropdown", { required: true })}
                className="w-[81px] h-[48px] p-3 mt-[6px] font-inter font-bold text-[12px]
                leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-800 opacity-[0.9]
                shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
              >
                {countrycode.map((ele, index) => {
                  return (
                    <option key={index} value={ele.code}>
                      {ele.code} - {ele.country}
                    </option>
                  );
                })}
              </select>
              <input
                type="number"
                id="phoneNumber"
                placeholder="12345 67890"
                {...register("phoneNumber", {
                  required: {
                    value: true,
                    message: "Please enter phone number",
                  },
                  maxLength: { value: 10, message: "Invalid Phone Number" },
                  minLength: { value: 8, message: "Invalid Phone Number" },
                })}
                className="w-[296px] h-[48px] p-3 mt-[6px] font-inter font-bold text-[12px]
                      leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-800 opacity-[0.9]
                      shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
              />
            </div>
          </div>

          {/* password */}
          <div className="flex gap-x-4">
            <div className="flex flex-col">
              <label htmlFor="password">
                Password <span className="text-pink-200">*</span>
              </label>
              <input
                id="password"
                type="text"
                placeholder="Password"
                {...register("password", { required: true })}
                className="max-w-[212px] h-[48px] p-3 mt-[6px] font-inter font-bold text-[12px]
                      leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-800 opacity-[0.9]
                      shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
              />
              {errors.message && <span>Password is required</span>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="confirmPassword">
                Confirm Password <span className="text-pink-200">*</span>
              </label>
              <input
                id="confirmPassword"
                type="text"
                placeholder="Confirm Password"
                {...register("confirmPassword", { required: true })}
                className="max-w-[212px] h-[48px] p-3 mt-[6px] font-inter font-bold text-[12px]
                      leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-800 opacity-[0.9]
                      shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
              />
              {errors.message && <span>Enter Password</span>}
            </div>
          </div>

          <button
            type="submit"
            className="max-w-[395px] text-richblue-900 font-bold h-[48px] rounded-lg p-3 bg-yellow-50 mt-10"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}
