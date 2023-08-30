import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { updateCourse } from "../../../../services/operators/courseDetails";
import { useDispatch, useSelector } from "react-redux";
import { setCourse, setEditCourse, setStep } from "../../../../slices/courseSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function PublishCourse() {
  const [clicked, setClicked] = useState(false);
  const { token, loading } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleCourseStatus = async() => {
    const result = await updateCourse(
      { status: "Draft", courseId: course._id },
      token
    );
    if(result) {
      toast.success("Course is now inactive");
      dispatch(setCourse(result?.data?.data));
      dispatch(setEditCourse(false));
      dispatch(setStep(1));
      navigate("/dashboard/my-courses");
    }
  }

  const handleOnClick = async (e) => {
    if (clicked) {
      const result = await updateCourse(
        { status: "Active", courseId: course._id },
        token
      );
      toast.success("Course is Active");
      dispatch(setCourse(result?.data?.data));
      dispatch(setEditCourse(false));
      dispatch(setStep(1));
      navigate("/dashboard/my-courses");
    } else {
      toast.error("Course can't be Public");
    }
  };

  return (
    <div className="w-full h-full">
      <div className="w-11/12 max-w-maxContent">
        <div className="p-6 mt-10 ml-7 bg-richblack-800 border border-richblack-700 rounded-lg">
          <p className="font-inter text-2xl font-semibold">Publish Settings</p>
          <div className="mt-5 flex gap-x-2 items-center relative">
            {!clicked && course.activeStatus === "Draft" ? (
              <div
                className="w-[20px] h-[20px] bg-richblack-800 border-2 rounded border-richblack-700"
                onClick={handleClick}
              ></div>
            ) : (
              <div
                className="bg-yellow-50 w-[20px] h-[20px] rounded relative"
                onClick={handleClick}
              >
                <div className="text-[14px] text-richblue-800 absolute left-[3px] top-[3px]">
                  <FaCheck />
                </div>
              </div>
            )}
            <label className=" text-base text-richblack-400 font-medium">
              Make this Course Public
            </label>
          </div>
        </div>

        <div className="flex justify-between mt-20">
          <button
            disabled={loading}
            onClick={() => dispatch(setStep(2))}
            className="ml-7 w-[112px] h-[48px] rounded-lg bg-richblack-700 text-richblack-5 flex items-center justify-center font-semibold"
          >
            Back
          </button>
          <div className="flex gap-x-4">
            <button
              disabled={loading}
              onClick={handleCourseStatus}
              className=" w-[164px] h-[48px] rounded-lg bg-richblack-700 text-richblack-5 flex items-center justify-center font-semibold"
            >
              Save as a Draft
            </button>
            {course.activeStatus === "Draft"  && (
              <button
              disabled={loading}
              onClick={handleOnClick}
              className="gap-x-2 w-[179px] h-[48px] rounded-lg bg-yellow-50 text-richblack-900 flex items-center justify-center font-semibold"
            >
              Save and Publish
            </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
