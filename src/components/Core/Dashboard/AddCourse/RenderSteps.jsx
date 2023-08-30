import React from "react";
import { useSelector } from "react-redux";
import { TfiCheck } from "react-icons/tfi";
import CourseInformationForm from "./CourseInformationForm";
import CourseBuilder from "./CourseBuilder";
import {FaCheck} from "react-icons/fa";
import PublishCourse from "./PublishCourse";

export default function RenderSteps() {
  const { step } = useSelector((state) => state.course);
  const steps = [
    { id: 1, title: "Course Information" },
    { id: 2, title: "Course Builder" },
    { id: 3, title: "Publish" },
  ];

  return (
    <div className="relative">
      <div className="flex w-[650px] justify-between">
        {steps.map((data, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-y-2 w-[140px]"
            >
              {
                step > data.id 
                ? (
                    <div className="flex rounded-full w-[34px] h-[34px] bg-yellow-50 text-richblue-900 items-center justify-center">
                        <FaCheck/>
                    </div>
                )
                : (
                    <p
                className={`${
                  step === data.id
                    ? "flex rounded-full w-[34px] h-[34px] bg-yellow-900 border border-yellow-50 text-yellow-50 text-[18px] leading-6 font-inter font-medium items-center justify-center"
                    : "flex rounded-full w-[34px] h-[34px] bg-richblack-800 border border-richblack-700 text-[18px] text-richblack-5 leading-6 font-inter font-medium items-center justify-center"
                }`}
              >
                {data.id}
              </p>
                )
              }

              <p
                className={`${
                  step >= data.id ? "text-richblack-5" : "text-richblack-500"
                }`}
              >
                {data.title}
              </p>
            </div>
          );
        })}
      </div>

      <div className={`border-b border-dashed w-[220px] absolute top-4 left-[88px] ${step > 1 ? ("border-yellow-50") : ("border-richblack-700")}`}></div>
      <div className={`border-b border-dashed w-[220px] border-richblack-700 absolute top-4 left-[343px] ${step > 2 ? ("border-yellow-50") : ("border-richblack-700")}`}></div>
    
        { step === 1 && <CourseInformationForm/> }
        { step === 2 && <CourseBuilder/> }
        { step === 3 && <PublishCourse/>}
    
    </div>
  );
}
