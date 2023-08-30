import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCourse, setEditCourse } from "../../../../slices/courseSlice";
import { fetchCourseDetails } from "../../../../services/operators/courseDetails";
import { useParams } from "react-router-dom";
import RenderSteps from "../AddCourse/RenderSteps";
import { setLoading } from "../../../../slices/authSlice";

export default function EditCourse() {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { token, loading } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);

  useEffect(() => {
    const editCourse = async () => {
        dispatch(setLoading(true));
      const selectedCourse = await fetchCourseDetails(courseId, token);
      if (selectedCourse) {
        dispatch(setEditCourse(true));
        dispatch(setCourse(selectedCourse));
      }
      dispatch(setLoading(false));
    };
    editCourse();
  }, []);

  return (
    <div className="w-screen ">
      <div className="flex w-11/12 max-w-maxContent mx-auto justify-between text-white">
        <div className="flex flex-col w-[60%]">
          <h1 className="font-inter font-bold text-richblack-5 text-[30px] leading-[38px] mt-20">
            Edit Course
          </h1>
          <div className="mx-auto mt-8">{course ? <RenderSteps /> : <p>Course Not Found</p>}</div>
        </div>
        <div className="w-[384px] mt-20 fixed left-[1200px] hidden xl:flex flex-col gap-y-3 border border-richblack-700 rounded-lg p-6 bg-richblack-800 ">
          <p className="-ml-2">⚡Code Upload Tips</p>
          <ol className="flex flex-col gap-y-2 ">
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>
              Add Topics in the Course Builder section to create lessons,
              quizzes, and assignments.
            </li>
            <li>
              Information from the Additional Data section shows up on the
              course single page.
            </li>
            <li>Make Announcements to notify any important</li>
            <li>Notes to all enrolled students at once.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
