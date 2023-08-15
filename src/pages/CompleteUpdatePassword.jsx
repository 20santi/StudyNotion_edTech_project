import React from "react";
import { useNavigate } from "react-router-dom";

const CompleteUpdatePassword = () => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col gap-y-3 w-[400px] text-white mx-auto mt-56">
      <div className="flex flex-col gap-y-2">
        <h1 className="font-bold text-[30px] leading-[2.4rem] font-inter text-richblack-5">
          Reset complete!
        </h1>
        <p className=" text-[18px] leading-[1.7rem] font-400 text-richblack-100">
          All done! We have sent an email to confirm
        </p>
      </div>

      <button
        type="submit"
        className="w-full text-richblue-900 h-[48px] rounded-lg p-3 bg-yellow-50 mt-6 font-bold"
        onClick={handleOnClick}
      >
        Return to login
      </button>
    </div>
  );
};

export default CompleteUpdatePassword;
