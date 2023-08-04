import React from "react";
import { useForm } from "react-hook-form";
import countrycode from "../../../data/countrycode.json";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleOnSubmit = (data) => {
    console.log("data -> ", data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="">
          <div className="flex gap-x-4">
            {/* first name */}
            <div className="flex flex-col">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                type="text"
                placeholder="Enter Your First Name"
                {...register("firstName", { required: true })}
              />
              {errors.message && <span>First Name is required</span>}
            </div>

            {/* last name */}
            <div className="flex flex-col">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                type="text"
                placeholder="Enter Your Last Name"
                {...register("lastName", { required: true })}
              />
              {errors.message && <span>Last Name is required</span>}
            </div>
          </div>

          {/* emial address */}
          <div className="flex flex-col">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              placeholder="Enter email address"
              type="text"
              {...register("email", { required: true })}
            />
            {errors.message && <span>Email Address is required</span>}
          </div>

          {/* phone number */}
          <div className="">
            <label htmlFor="phoneNumber">
              Phone Number <span>*</span>
            </label>
            <div className="flex gap-x-2">
              <select
                id="dropdown"
                {...register("dropdown", { required: true })}
                className="w-[81px] h-[28px]"
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
              />
            </div>
          </div>

          {/* password */}
          <div className="flex gap-x-2">
            <div className="flex flex-col">
              <label htmlFor="password">
                Password <span>*</span>
              </label>
              <input
                id="password"
                type="text"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              {errors.message && <span>Password is required</span>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="confirmPassword">
                Confirm Password <span>*</span>
              </label>
              <input
                id="confirmPassword"
                type="text"
                placeholder="Confirm Password"
                {...register("confirmPassword", { required: true })}
              />
              {errors.message && <span>Enter Password</span>}
            </div>
          </div>

          <button type="submit">Create Account</button>
        </div>
      </form>
    </div>
  );
}
