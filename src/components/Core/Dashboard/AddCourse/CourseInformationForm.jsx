import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Upload from "./Upload";
import { useDispatch, useSelector } from "react-redux";
import Requirements from "./Requirerments";
import { setCourse, setEditCourse, setStep } from "../../../../slices/courseSlice";
import {
  createCourse,
  showAllCategory,
  updateCourse,
} from "../../../../services/operators/courseDetails";
import { setLoading } from "../../../../slices/authSlice";
import InputTags from "./InputTags";
import { toast } from "react-hot-toast";

export default function CourseInformationForm() {
  const [categories, setCatgories] = useState([]);
  const { editCourse } = useSelector((state) => state.course);
  const { token, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.course);

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

  useEffect(() => {
    if (editCourse) {
      setValue("courseName", course.courseName);
      setValue("courseDescription", course.courseDescription);
      setValue("price", course.price);
      setValue("category", course.category);
      setValue("tag", course.tag);
      setValue("image", course.image);
      setValue("instructions", course.instructions);
      setValue("benefits", course.benefits);
    }
  }, []);

  const isFormUpdated = (data) => {
    if (!course) {
      return false;
    }

    if (
      course.courseName !== data.courseName ||
      course.courseDescription !== data.courseDescription ||
      course.price !== data.price ||
      course.category !== data.category ||
      course.tag.toString() !== data.tag.toString() ||
      course.image !== data.image ||
      course.instructions.toString() !== data.instructions.toString() ||
      course.benefits !== data.benefits
    ) {
      return true;
    } else {
      return false;
    }
  };

  const onFormSubmit = async (data) => {
    dispatch(setLoading(true));
    const formData = new FormData();

    if (editCourse) {
      if (isFormUpdated(data)) {
        if (course.courseName !== data.courseName) {
          formData.append("courseName", data.courseName);
        }
        if (course.courseDescription !== data.courseDescription) {
          formData.append("courseDescription", data.courseDescription);
        }
        if (course.price !== data.price) {
          formData.append("price", data.price);
        }
        if (course.category !== data.category) {
          formData.append("category", data.category);
        }
        if (course.tag.toString() !== data.tag.toString()) {
          formData.append("tag", JSON.stringify(data.tag));
        }
        if (course.image !== data.image) {
          formData.append("image", data.image);
        }
        if (course.instructions.toString() !== data.instructions.toString()) {
          formData.append("instructions", JSON.stringify(data.instructions));
        }
        if (course.benefits !== data.benefits) {
          formData.append("benefits", data.benefits);
        }
        formData.append("courseId", course._id);

        const result = await updateCourse(formData, token);
        if (result) {
          dispatch(setCourse(result.data.data));
          dispatch(setEditCourse(false));
          dispatch(setStep(2));
        }
      } else {
        toast.error("No changes are commited");
      }
    } else {
      formData.append("courseName", data.courseName);
      formData.append("courseDescription", data.courseDescription);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("tag", JSON.stringify(data.tag));
      formData.append("image", data.image);
      formData.append("benefits", data.benefits);
      formData.append("instructions", JSON.stringify(data.instructions));

      const result = await createCourse(formData, token);

      if (result) {
        dispatch(setCourse(result.data.data));
        dispatch(setStep(2));
      }
    }
    dispatch(setLoading(false));
  };

  const goNext = () => {
    dispatch(setStep(2));
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="flex flex-col mt-6 mb-20 gap-y-7 w-[665px] bg-richblack-800 border border-richblack-700 rounded-lg p-6"
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
          {errors.courseName && (
            <span className=" text-pink-200">Course title is required</span>
          )}
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
            <span className=" text-pink-200">
              Course Description is required
            </span>
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
          {errors.price && (
            <span className=" text-pink-200">price is required</span>
          )}
        </div>

        <div className="">
          <label
            htmlFor="category"
            className="text-[14px] leading-[22px] font-inter font-normal text-richblack-5"
          >
            Course Category <sup className=" text-pink-200"> *</sup>
          </label>
          <select
            id="category"
            defaultValue=""
            {...register("category", { required: true })}
            className="w-full h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                                leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-700 opacity-[0.9]
                                shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
          >
            <option>Choose Category</option>
            {!loading &&
              categories.map((category, index) => (
                <option key={index} value={category?._id}>
                  {category?.name}
                </option>
              ))}
          </select>
          {errors.category && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course Category is required
            </span>
          )}
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
          editData={editCourse ? course.image : null}
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
            className="w-full min-h-[130px] p-3 mt-[6px] font-inter font-bold text-[12px]
                    leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-700 opacity-[0.9]
                    shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
          />
          {errors.benefits && (
            <span className=" text-pink-200">Course Benefits is required</span>
          )}
        </div>

        <Requirements
          name="instructions"
          register={register}
          label="Requirements/Instructions"
          placeholder="Enter Benefits of the course"
          setValue={setValue}
          errors={errors}
        />

        <div className="flex gap-x-4">
          {editCourse && (
            <div>
              <button
                onClick={goNext}
                disabled={loading}
                className="gap-x-2 w-[220px] h-[48px] rounded-lg bg-richblack-700 text-richblack-5 flex items-center justify-center font-semibold"
              >
                Continue without Saving
              </button>
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="gap-x-2 w-[139px] h-[48px] rounded-lg bg-yellow-50 text-richblack-900 flex items-center justify-center font-semibold"
          >
            {editCourse ? "Save Changes" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}
