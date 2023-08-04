import React from "react";
import Template from "../components/Core/Auth/Template";

export default function Login() {
  return (
    <div className="w-[508px]">
      <Template
        header={"Welcome Back"}
        text={"Build skills for today, tomorrow, and beyond."}
        spanText={"Education to future-proof your career."}
        formType={"login"}
      />
    </div>
  );
}
