import React from "react";
import Template from "../components/Core/Auth/Template";

export default function Signup() {
  return (
    <div className="w-[508px]">
      <Template
        header={"Join the millions learning to code with StudyNotion for free"}
        text={"Build skills for today, tomorrow, and beyond."}
        spanText={"Education to future-proof your career."}
        formType={"signup"}
      />
    </div>
  );
}
