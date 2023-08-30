import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoAddCircleOutline } from "react-icons/io5";
import {
  createSection,
  editSection,
} from "../../../../services/operators/courseDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../slices/courseSlice";
import Nestedview from "./Nestedview";
import { toast } from "react-hot-toast";

export default function CourseBuilder() {
  const [editSectionName, setEditSectionName] = useState(false);
  const [nameOfEditSection, setNameOfEditSection] = useState(null);
  const [idOfEditSection, setIdOfEditSection] = useState(null);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();

  const handleOnSubmit = async (Data) => {
    if (editSectionName) {
      if (nameOfEditSection !== Data.sectionName) {
        const response = await editSection(
          idOfEditSection,
          Data.sectionName,
          token
        );

        const updatedSection = course.section.map((section) =>
          section._id === response?.data?.data._id
            ? response?.data?.data
            : section
        );
        const updatedCourse = { ...course, section: updatedSection };
        dispatch(setCourse(updatedCourse));
        setEditSectionName(null);
        setValue("sectionName", "");
      }
    } else {
      const result = await createSection(
        { sectionName: Data?.sectionName, courseId: course._id },
        token
      );
      dispatch(setCourse(result));
      setValue("sectionName", "");
    }
  };

  const handleChangedSectionName = async (sectionId, sectionName) => {
    setEditSectionName(true);
    setIdOfEditSection(sectionId);
    setNameOfEditSection(sectionName);
  };

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  const goNext = () => {
    if(course.section.length === 0) {
      toast.error("Please add atleast one Section");
      return
    }
    if(course.section.some((section) => section.subsection.length === 0)) {
      toast.error("Pleast add minimum one Lecture");
      return;
    }
    dispatch(setStep(3));
  };

  return (
    <div className="">
      <div className="flex flex-col mt-6 gap-y-7 w-[665px] bg-richblack-800 border border-richblack-700 rounded-lg p-6">
        <p className="font-inter text-[24px] leading-[32px] text-richblack-5 font-semibold">
          Course Builder
        </p>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <label
            htmlFor="sectionName"
            className="text-[14px] leading-[22px] font-inter font-normal text-richblack-5"
          >
            Section Name<sup className=" text-pink-200">*</sup>
          </label>
          <input
            id="sectionName"
            name="sectionName"
            {...register("sectionName", { required: true })}
            placeholder="Add a section to build your course"
            className="w-full h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                                leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-700 opacity-[0.9]
                                shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
          />
          {errors.sectionName && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Section name is required
            </span>
          )}

          <button
            type="submit"
            className="flex items-center  gap-x-2 bg-richblack-800 border border-yellow-50 text-yellow-50 rounded-lg p-2 mt-7"
          >
            <IoAddCircleOutline size={20} className="text-yellow-50" />
            {editSectionName ? "Edit Section Name" : "Create Section"}
          </button>
        </form>

        {course.section?.length > 0 && (
          <Nestedview handleChangedSectionName={handleChangedSectionName} />
        )}

        <div className="flex justify-between mt-10">
          <div></div>
          <div className="flex gap-x-3">
            <button
              onClick={goBack}
              className="gap-x-2 w-[139px] h-[48px] rounded-lg bg-richblack-700 text-richblack-5 flex items-center justify-center font-semibold"
            >
              Back
            </button>
            <button
              onClick={goNext}
              className="gap-x-2 w-[139px] h-[48px] rounded-lg bg-yellow-50 text-richblack-900 flex items-center justify-center font-semibold"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
