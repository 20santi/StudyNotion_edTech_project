import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import { ResetPasswordToken } from "../services/operators/authApi";

const ConformationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email } = useParams();

  const handleOnClick = () => {
    const data = { email: email };
    dispatch(ResetPasswordToken(data, navigate));
  };

  return (
    <div className="flex flex-col gap-y-3 w-[400px] text-white mx-auto mt-56">
      <div className="flex flex-col gap-y-2">
        <h1 className="font-bold text-[30px] leading-[2.4rem] font-inter text-richblack-5">
          Check email
        </h1>
        <p className=" text-[18px] leading-[1.7rem] font-400 text-richblack-100">
          We have sent the reset email to
        </p>
        <p>{email}</p>
      </div>

      <button
        type="submit"
        className="w-full text-richblue-900 h-[48px] rounded-lg p-3 bg-yellow-50 mt-6 font-bold"
        onClick={handleOnClick}
      >
        Resend Email
      </button>

      <div className="flex justify-between">
        <div className="flex text-white items-center gap-x-1">
          <MdKeyboardBackspace />
          <button onClick={() => navigate("/login")}>Back to Login</button>
        </div>
      </div>
    </div>
  );
};

export default ConformationPage;
