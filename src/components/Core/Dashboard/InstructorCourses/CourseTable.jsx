import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { IoMdAddCircleOutline } from "react-icons/io";
import { getAllCourses } from "../../../../services/operators/courseDetails";
import { HiClock } from "react-icons/hi";
import { BsPatchCheckFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../../../slices/authSlice";

const CourseTable = () => {
  const { token, loading } = useSelector((state) => state.auth);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCourses = async () => {
      dispatch(setLoading(true));
      const result = await getAllCourses(token);
      setCourses(result);
      dispatch(setLoading(false));
    };
    fetchCourses();
  }, []);

  return (
    <div className="w-screen ">
      <div className="w-11/12 max-w-maxContent mx-auto flex flex-col gap-y-8">
        <div className="flex justify-between mt-32 items-center">
          <h1 className=" text-3xl font-inter font-semibold text-richblack-5">
            My Courses
          </h1>
          <button className="flex items-center justify-center w-[109px] h-[48px] mt-4 gap-x-2 text-richblack-900 bg-yellow-50 rounded-lg">
            <IoMdAddCircleOutline className="text-xl text-richblue-900" />
            <p className="text-base font-medium text-richblue-900">New</p>
          </button>
        </div>

        <div className="">
          <Table className="rounded-xl border border-richblack-800">
            <Thead>
              <Tr className="flex px-6 py-2 gap-x-16">
                <Th className="text-left text-richblack-100 uppercase flex-1">
                  Courses
                </Th>
                <Th className="text-left text-richblack-100 uppercase">
                  Duration
                </Th>
                <Th className="text-left text-richblack-100 uppercase">
                  Price
                </Th>
                <Th className="text-left text-richblack-100 uppercase">
                  Edit
                </Th>
                <Th className="text-left text-richblack-100 uppercase">
                  Delete
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {courses.length === 0 ? (
                <Tr>
                  <Td  className="p-10"> 
                    <div className="text-white text-xl font-medium">No Course Found</div>
                  </Td>
                </Tr>
              ) : (
                courses.map((course) => (
                  <Tr
                    key={course._id}
                    className="flex gap-x-16 border-b text-white border-richblack-800 px-6 py-8"
                  >
                    <Td className="flex flex-1 gap-x-5">
                      <img
                        src={course.image}
                        className="w-[221px] h-[148px] rounded-lg"
                      />
                      <div className="flex flex-col gap-y-2">
                        <h2 className="text-xl font-inter font-semibold">{course.courseName} :</h2>
                        <p className="text-sm text-richblack-100">{course.courseDescription}</p>
                        {course.activeStatus === "Active" ? (
                          <div className="w-[95px] h-[24px] bg-richblack-700 flex justify-center gap-x-2 rounded-full items-center">
                            <BsPatchCheckFill className="text-yellow-50 w-[13px] h-[13px]" />
                            <p className="text-yellow-50 text-sm">
                              {course.activeStatus}
                            </p>
                          </div>
                        ) : (
                          <div className="w-[82px] h-[24px] bg-richblack-700 flex justify-center gap-x-2 rounded-full items-center">
                            <HiClock className="text-pink-50 w-[13px] h-[13px]" />
                            <p className="text-pink-50 text-sm">
                              {course.activeStatus}
                            </p>
                          </div>
                        )}
                      </div>
                    </Td>
                    <Td className="text-richblack-100 -translate-x-16">
                      20 h  10 min
                    </Td> 
                    <Td className="text-richblack-100 -translate-x-14">
                      {course.price}
                    </Td>
                    <Td>
                      <button 
                        className="text-xl text-richblack-100 -translate-x-11"
                        disabled={loading}
                        onClick={() => navigate(`/dashboard/eidt-course/${course._id}`)}
                      >
                      <MdEdit/>
                      </button>
                    </Td>
                    <Td className="text-xl text-richblack-100 -translate-x-4">
                      <RiDeleteBin6Line/>
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CourseTable;
