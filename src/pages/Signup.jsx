import React from "react";
import Template from "../components/Core/Auth/Template";
import image from "../assets/Images/signup.webp";
import frameImage from "../assets/Images/frame.png";

export default function Signup() {
  return (
    <div className="">
      <Template
        header={"Join the millions learning to code with StudyNotion for free"}
        text={"Build skills for today, tomorrow, and beyond."}
        spanText={"Education to future-proof your career."}
        formType="signup"
        image={image}
        frameImage={frameImage}
      />
    </div>
  );
}
