import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ImCross } from "react-icons/im";
import Upload from "./Upload";
import { useDispatch, useSelector } from "react-redux";
import Requirements from "./Requirerments";
import { setCourse } from "../../../../slices/courseSlice";
import { createCourse, showAllCategory } from "../../../../services/operators/courseDetails";
import { setLoading } from "../../../../slices/authSlice";

export default function CourseInformationForm() {
  const [tags, setTags] = useState([]);
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

  // tag handler
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const tagValue = event.target.value;

      if (tagValue && !tags.includes(tagValue)) {
        const newTag = [...tags, tagValue];
        setTags(newTag);
      }

      console.log(event.target.value);
      event.target.value = "";
    }
  };

  // remove tag after click cross button
  const removeTag = (idx) => {
    const tag = tags.filter((_, index) => index !== idx);
    setTags(tag);
  };

  useEffect(() => {
    const getCategories = async() => {
      const result = await showAllCategory();
      setCatgories(result);
    }

    getCategories();
  }, []);

  const onFormSubmit = async (data) => {
    const formData = new FormData();
    formData.append("courseName", data.courseName);
    formData.append("courseDescription", data.courseDescription);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("tag", data.tag);
    formData.append("image", data.image);
    formData.append("benefits", data.benefits);
    formData.append("instructions", data.instructions);

    setLoading(false);
    const result = await createCourse(formData, token);
    if(result) {
      dispatch(setCourse(result));
      dispatch(setCourse(2));
    }
    setLoading(false);
    console.log("printing result -> ", result);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col mt-6 gap-y-7 w-[665px] bg-richblack-800 border border-richblack-700 rounded-lg p-6">
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
            {
              categories.map((categry, index) => {
                return (
                  <option key={index}>
                    {categry}
                  </option>
                )
              })
            }
          </select>
          {errors.category && <span>tag is required</span>}
        </div>

        <div>
          <label htmlFor="tag">
            Tags<span className=" text-pink-200"> *</span>
          </label>
          <input
            type="text"
            id="tag"
            defaultValue=""
            onKeyDown={handleKeyDown}
            placeholder="Choose a Tag"
            name="tag"
            {...register("tag", { required: true })}
            className="w-full h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                                leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-700 opacity-[0.9]
                                shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
          />
          {errors.tag && <span>Tag is required</span>}

          <div className="mt-4 flex gap-x-3">
            {tags.map((data, index) => (
              <div
                key={index}
                className={`w-[${data.length}px] p-3 h-[30px] rounded-full bg-yellow-900 border border-yellow-50 text-yellow-50 flex items-center justify-center gap-x-2`}
              >
                <p className="">{data}</p>
                <button onClick={() => removeTag(index)}>
                  <ImCross className="text-[12px]" />
                </button>
              </div>
            ))}
          </div>
        </div>

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
