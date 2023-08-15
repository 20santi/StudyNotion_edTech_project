import React from "react";
import Template from "../components/Core/Auth/Template";
import image from "../assets/Images/login.webp";
import frameImage from "../assets/Images/frame.png";

export default function Login() {
  return (
    <div>
      <div>
      <Template
        header={"Welcome Back"}
        text={"Discover your passions, "}
        spanText={"Be Unstoppable"}
        formType="login"
        image={image}
        frameImage={frameImage}
      />
    </div>
    </div>
  );
}
