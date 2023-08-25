import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Upload from "./Upload";
import { useDispatch, useSelector } from "react-redux";
import Requirements from "./Requirerments";
import { setCourse, setStep } from "../../../../slices/courseSlice";
import {
  createCourse,
  showAllCategory,
} from "../../../../services/operators/courseDetails";
import { setLoading } from "../../../../slices/authSlice";
import InputTags from "./InputTags";

export default function CourseInformationForm() {
  const [categories, setCatgories] = useState([]);
  const { editCourse } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  useEffect(() => {
    const getCategories = async () => {
      const result = await showAllCategory();
      setCatgories(result);
    };

    getCategories();
  }, []);

  const onFormSubmit = async (data) => {
    const formData = new FormData();
    formData.append("courseName", data.courseName);
    formData.append("courseDescription", data.courseDescription);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("tag", JSON.stringify(data.tag));
    formData.append("image", data.image);
    formData.append("benefits", data.benefits);
    formData.append("instructions", JSON.stringify(data.instructions));

    setLoading(true);
    const result = await createCourse(formData, token);
    
    if (result) {
      dispatch(setCourse(result.data.data));
      dispatch(setStep(2));
    }
    setLoading(false);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="flex flex-col mt-6 gap-y-7 w-[665px] bg-richblack-800 border border-richblack-700 rounded-lg p-6"
      >
        <div>
          <label htmlFor="courseName">
            Course Title<span className=" text-pink-200"> *</span>
          </label>
          <input
            type="text"
            id="courseName"
            defaultValue=""
            placeholder="Enter Course Title"
            name="courseName"
            {...register("courseName", { required: true })}
            className="w-full h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                                leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-700 opacity-[0.9]
                                shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
          />
          {errors.courseName && <span>Course title is required</span>}
        </div>

        <div>
          <label htmlFor="courseDescription">
            Course Short Description<span className=" text-pink-200"> *</span>
          </label>
          <textarea
            type="text"
            id="courseDescription"
            defaultValue=""
            placeholder="Enter Course Description"
            name="courseDescription"
            {...register("courseDescription", { required: true })}
            className="w-full min-h-[127px] p-3 mt-[6px] font-inter font-bold text-[12px]
                                leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-700 opacity-[0.9]
                                shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
          />
          {errors.courseDescription && (
            <span>Course Description is required</span>
          )}
        </div>

        <div>
          <label htmlFor="price">
            Price<span className=" text-pink-200"> *</span>
          </label>
          <input
            type="text"
            id="price"
            defaultValue=""
            placeholder="Enter price"
            name="price"
            {...register("price", { required: true })}
            className="w-full h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                                leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-700 opacity-[0.9]
                                shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
          />
          {errors.price && <span>price is required</span>}
        </div>

        <div>
          <label htmlFor="category">
            Category<span className=" text-pink-200"> *</span>
          </label>
          <select
            id="category"
            defaultValue=""
            name="category"
            {...register("category", { required: true })}
            className="w-full h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                                leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-700 opacity-[0.9]
                                shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
          >
            <option>
              Choose Category
            </option>
            {categories.map((category, index) => {
              return (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              );
            })}
          </select>
          {errors.category && <span>tag is required</span>}
        </div>

        <InputTags
          register={register}
          id="tag"
          name="tag"
          setValue={setValue}
          errors={errors}
        />

        <Upload
          register={register}
          name="image"
          label="Course Thumbnail"
          errors={errors}
          setValue={setValue}
          editCourse={null}
        />

        <div>
          <label htmlFor="benefits">
            Benefits of the course<span className=" text-pink-200"> *</span>
          </label>
          <textarea
            type="text"
            id="benefits"
            defaultValue=""
            placeholder="Enter Benefits of the course"
            name="benefits"
            {...register("benefits", { required: true })}
            className="w-full h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                    leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-700 opacity-[0.9]
                    shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
          />
          {errors.category && <span>tag is required</span>}
        </div>

        <Requirements
          name="instructions"
          register={register}
          label="Requirements/Instructions"
          placeholder="Enter Benefits of the course"
          setValue={setValue}
          errors={errors}
        />

        <button
          type="submit"
          className="gap-x-2 w-[139px] h-[48px] rounded-lg bg-yellow-50 text-richblack-900 flex items-center justify-center font-semibold"
        >
          Next
        </button>
      </form>
    </div>
  );
}
