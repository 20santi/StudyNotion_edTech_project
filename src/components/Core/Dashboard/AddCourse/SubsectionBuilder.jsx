import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Upload from "./Upload";
import {
  createSubsection,
  editSubsection,
} from "../../../../services/operators/courseDetails";
import { useDispatch, useSelector } from "react-redux";
import { setCourse } from "../../../../slices/courseSlice";
import { setLoading } from "../../../../slices/authSlice";

export default function SubsectionBuilder({
  modalData,
  setModalData,
  add = false,
  edit = false,
  view = false,
}) {
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    handleSubmit,
  } = useForm();

  const { token, loading } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  useEffect(() => {
    if (view || edit) {
      setValue("video", modalData.video);
      setValue("title", modalData.title);
      setValue("description", modalData.description);
    }
  }, []);

  const isFormUpdated = (currentValues) => {
    if (
      currentValues.video !== modalData.video ||
      currentValues.title !== modalData.title ||
      currentValues.description !== modalData.description
    ) {
      return true;
    }
    return false;
  };

  const handleOnSubmit = async (data) => {
    const formData = new FormData();
    const currentValues = getValues();
    dispatch(setLoading(true));
    if (edit) {
      if (isFormUpdated(currentValues)) {
        if (currentValues.video !== modalData.video) {
          formData.append("video", data.video);
        }
        if (currentValues.title !== modalData.title) {
          formData.append("title", data.title);
        }
        if (currentValues.description !== modalData.description) {
          formData.append("description", data.description);
        }

        formData.append("sectionId", modalData.sectionId);
        formData.append("subsectionId", modalData._id);

        const result = await editSubsection(formData, token);
        const updatedSection = course.section.map((section) =>
          section._id === result?.data?.data._id ? result?.data?.data : section
        );

        const updateCourse = { ...course, section: updatedSection };
        dispatch(setCourse(updateCourse));
        setModalData(null);
      }
    } else {
      formData.append("video", data.video);
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("sectionId", modalData);
      const result = await createSubsection(formData, token);
      if (result) {
        const updatedSection = course.section.map((section) =>
          section._id === modalData ? result : section
        );
        const updateCourse = { ...course, section: updatedSection };
        dispatch(setCourse(updateCourse));
      }
      setModalData(null);
    }
    dispatch(setLoading(false));
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/40 z-[1000] overflow-auto grid place-items-center">
      <div className="lg:w-[665px] bg-richblack-800 rounded-lg mt-10 mb-10">
        <div className="bg-richblack-700 border rounded-lg border-richblack-600 p-5 text-[18px] leading-[26px] font-semibold">
          {view && "View Lecture"}
          {edit && "Edit Lecture"}
          {add && "Add Lecture"}
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
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />

          <div className="flex flex-col">
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
                onClick={() => setModalData(null)}
                disabled={loading}
                className="gap-x-2 w-[139px] h-[48px] rounded-lg bg-richblack-700 text-richblack-5 flex items-center justify-center font-semibold"
              >
                Cancell
              </button>
              <button
                type="submit"
                disabled={loading}
                className="gap-x-2 w-[139px] h-[48px] rounded-lg bg-yellow-50 text-richblack-900 flex items-center justify-center font-semibold"
              >
                {loading ? "Loading..." : "Save"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
