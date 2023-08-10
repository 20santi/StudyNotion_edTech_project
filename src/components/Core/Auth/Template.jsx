import React from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export default function Template({
  header,
  text,
  spanText,
  formType,
  image,
  frameImage,
}) {
  return (
    <div className="ml-[400px] flex gap-x-28 w-11/12 max-w-maxContent pt-28">
      <div className="text-white">
        <h1 className=" font-semibold font-inter font-600 text-[30px] leading-10 text-richblack-5 w-[434px]">
          {header}
        </h1>
        <p className="pt-3 font-inter font-normal text-[18px] leading-[26px] text-richblack-100 max-w-[434px]">
          {text}
        </p>
        <p className=" font-edu-sa font-bold text-[16px] leading-6 text-blue-100 max-w-[434px]">
          <span>{spanText}</span>
        </p>

        {formType === "login" ? <LoginForm /> : <SignupForm />}
      </div>

      <div className="relative">
        <img
          src={image}
          alt="login image"
          className="lg:w-[558px] lg:h-[508px] relative z-40"
        />

        <img
          src={frameImage}
          alt="frame image"
          className="absolute z-0 top-5 left-5 lg:w-[558px] lg:h-[508px]"
        />
      </div>
    </div>
  );
}
