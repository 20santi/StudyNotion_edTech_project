import React from "react";
import { useForm } from "react-hook-form";
import Upload from "./Upload";
import { createSubsection } from "../../../../services/operators/courseDetails";
import { useSelector } from "react-redux";
import { setCourse } from "../../../../slices/courseSlice";

export default function SubsectionBuilder({ setShowModal, sectionId, course }) {
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm();

  const { token } = useSelector((state) => state.auth);

  const handleOnSubmit = async (data) => {
    const result = await createSubsection(data, sectionId, token);
    if (result) {
      const updatedSection = course.section.map((section) =>
        section._id === sectionId ? result : section
      );
      const updateCourse = { ...course, section: updatedSection };
      setCourse(updateCourse);
      console.log("Course: ", course);
    }

    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/40 z-[1000] flex items-center justify-center">
      <div className="lg:w-[665px] bg-richblack-800 rounded-lg">
        <div className="bg-richblack-700 border rounded-lg border-richblack-600 p-5 text-[18px] leading-[26px] font-semibold">
          Add Lecture
        </div>

        <form
          onSubmit={handleSubmit(handleOnSubmit)}
          className="flex flex-col gap-y-4 p-7"
        >
          <Upload
            name={"video"}
            label={"Lecture Video"}
            register={register}
            errors={errors}
            setValue={setValue}
            video={true}
          />

          <div className="flex flex-col mt-24">
            <label htmlFor="title">
              Lecture Title <span className=" text-pink-300">*</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter Lecture Title"
              {...register("title", { required: true })}
              className="w-full h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-700 opacity-[0.9]
                shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="description">
              Lecture Description <span className=" text-pink-300">*</span>
            </label>
            <textarea
              type="text"
              name="description"
              placeholder="Enter Lecture Description"
              {...register("description", { required: true })}
              className="w-full min-h-[127px] p-3 mt-[6px] font-inter font-bold text-[12px]
                leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-700 opacity-[0.9]
                shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
            />
          </div>

          <div className="flex justify-between mt-10">
            <div></div>
            <div className="flex gap-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="gap-x-2 w-[139px] h-[48px] rounded-lg bg-richblack-700 text-richblack-5 flex items-center justify-center font-semibold"
              >
                Cancell
              </button>
              <button
                type="submit"
                className="gap-x-2 w-[139px] h-[48px] rounded-lg bg-yellow-50 text-richblack-900 flex items-center justify-center font-semibold"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
