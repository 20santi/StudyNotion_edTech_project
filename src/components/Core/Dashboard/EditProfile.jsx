import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import countrycode from "../../../data/countrycode.json";

export default function EditPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user } = useSelector((state) => state.profile);
  console.log("User: ", user);
  const array = ["Male", "Female", "Other"];

  return (
    <div className="lg:w-[792px] bg-richblack-800 rounded-lg">
      <h1 className="text-[18px] leading-[26px] font-inter font-semibold text-richblack-5 pl-6 mt-5">
        Profile Information
      </h1>

      <form className="flex gap-x-6 p-6">
        {/* left side */}
        <div className="flex flex-col gap-y-3 w-[360px]">
          <div className="flex flex-col">
            <label htmlFor="firstName">First Name</label>
            <input
              defaultValue={user?.firstName}
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your first name"
              {...register("firstName", { required: true })}
              className="w-full h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                                  leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-700 opacity-[0.9]
                                  shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
            />
            {errors.firstName && <span>First name is required</span>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              defaultValue={user?.dateOfbirth}
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              {...register("dateOfBirth", { required: true })}
              className="w-full h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                                  leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-700 opacity-[0.9]
                                  shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
            />
            {errors.dateOfbirth && <span>Date of birth is required</span>}
          </div>

          <div className="">
            <label htmlFor="phoneNumber">Phone Number</label>

            <div className="flex gap-x-2">
              <select
                name="country"
                id="countryDropdown"
                {...register("countryCode", { required: true })}
                className="w-[75px] h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                                  leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-700 opacity-[0.9]
                                  shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
              >
                {countrycode.map((data, index) => (
                  <option key={index} value={data.code}>
                    {data.code} {data.country}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                defaultValue={user?.phoneNumber}
                placeholder="Enter Your Phone Number"
                className="w-full h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                                    leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-700 opacity-[0.9]
                                    shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
                {...register("phoneNumber", {
                  required: {
                    value: true,
                    message: "Please enter your contact Number",
                  },
                  maxLength: { value: "12", message: "Invalid Contact Number" },
                  minLength: { value: "8", message: "Invalid Contact Number" },
                })}
              />
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="flex flex-col gap-y-3 w-[360px]">
          <div className="flex flex-col">
            <label>Last Name</label>
            <input
              id="lastName"
              name="lastName"
              placeholder="Enter Your last name"
              defaultValue={user?.lastName}
              {...register("lastName", { required: true })}
              className="w-full h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                                  leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-700 opacity-[0.9]
                                  shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
            />
            {errors.lastName && <span>Last name is required</span>}
          </div>

          <fieldset>
            <legend>Gender</legend>

            <div
              className="w-full h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px] flex
            leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-700 opacity-[0.9]
            shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)] gap-x-5 justify-center"
            >
              <label className="flex gap-x-2 items-center">
                <input
                  type="radio"
                  value="male"
                  id="male"
                  {...register("gender")}
                />
                Male
              </label>

              <label className="flex gap-x-2 items-center">
                <input
                  type="radio"
                  value="Female"
                  id="Female"
                  {...register("gender")}
                />
                Female
              </label>

              <label className="flex gap-x-2 items-center">
                <input
                  type="radio"
                  value="other"
                  id="other"
                  {...register("gender")}
                />
                Other
              </label>
            </div>
          </fieldset>

          <div className="flex flex-col">
            <label htmlFor="about">About</label>
            <input
              type="text"
              name="about"
              id="about"
              placeholder="Enter Bio Details"
              defaultValue={user?.additionalDetails?.about}
              {...register("about", { required: true })}
              className="w-full h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px] flex
                                        leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-700 opacity-[0.9]
                                        shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)] gap-x-5 justify-center"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
