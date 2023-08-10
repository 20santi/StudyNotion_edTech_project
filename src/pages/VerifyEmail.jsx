import React, { useEffect } from "react";
import { useState } from "react";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import { PiClockCounterClockwiseBold } from "react-icons/pi";
import { sendOtp, signup } from "../services/operators/authApi";

const VerifyEmail = () => {
  const { signupData } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
    console.log("signupData: ", signupData);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      confirmPassword,
      accountType,
    } = signupData;

    const data = {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      confirmPassword,
      accountType,
      otp,
    };

    dispatch(signup(data, navigate));
  };

  return (
    <div className="flex flex-col gap-y-3 w-[400px] text-white mx-auto mt-56">
      <div className="flex flex-col gap-y-2">
        <h1 className="font-bold text-[30px] leading-[2.4rem] font-inter text-richblack-5">
          Verify Email
        </h1>
        <p className=" text-[18px] leading-[1.7rem] font-400 text-richblack-100">
          A verification code has been sent to you. Enter the code below
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span> </span>}
          renderInput={(props) => (
            <input
              {...props}
              placeholder="-"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem]
                     text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2
                     focus:outline-yellow-50 mt-3"
            />
          )}
          containerStyle={{
            justifyContent: "space-between",
          }}
        />

        <button
          type="submit"
          className="w-full text-richblue-900 h-[48px] rounded-lg p-3 bg-yellow-50 mt-6 font-bold"
        >
          Verify Email
        </button>
      </form>

      <div className="flex justify-between">
        <div className="flex text-white items-center gap-x-1">
          <MdKeyboardBackspace />
          <button onClick={() => navigate("/login")}>Back to Login</button>
        </div>
        <div className="flex text-blue-100 items-center gap-x-1">
          <PiClockCounterClockwiseBold />
          <button onClick={() => dispatch(sendOtp(signupData.email, navigate))}>
            Resend It
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
