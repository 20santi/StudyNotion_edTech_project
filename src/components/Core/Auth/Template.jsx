import React from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export default function Template({ header, text, spanText, formType }) {
  return (
    <div className="">
      <div className="text-white w-[508px]">
        <h1>{header}</h1>
        <p>
          {text} <span>{spanText}</span>
        </p>

        <div>
          <button>Student</button>
          <button>Instructor</button>
        </div>

        {formType === "signup" ? <LoginForm /> : <SignupForm />}
      </div>

      <div>
        <img />
      </div>
    </div>
  );
}
