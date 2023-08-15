import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RiEditBoxLine } from "react-icons/ri";
import IconButton from "../../../Comon/IconButton";

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div className="w-screen">
      <div className="w-11/12 max-w-maxContent mx-auto">
        <h1 className="text-richblack-5 mt-28 mb-5 font-inter text-[30px] leading-[38px] font-semibold">
          My Profile
        </h1>

        {/* section 1 */}
        <div className="flex items-center justify-between w-[792px] bg-richblack-800 border-richblack-700 rounded-lg h-[126px] p-6">
          <div className="flex gap-x-3 items-center">
            <img
              src={user?.image}
              alt={`profile-${user?.firstName}`}
              className=" aspect-square w-[78px] rounded-full object-cover"
            />
            <div className="flex flex-col">
              <p className=" font-inter font-semibold text-[18px] leading-[26px] text-richblack-5">
                {user?.firstName + " " + user?.lastName}
              </p>
              <p className="text-[14px] leading-[22px] text-richblack-300 font-normal">
                {user?.email}
              </p>
            </div>
          </div>
          <div>
            <button
              onClick={() => navigate("/dashboard/settings")}
              className={
                " text-richblack-900 bg-yellow-50 w-[96px] h-[40px] rounded-lg flex gap-x-2 items-center justify-center font-semibold"
              }
            >
              Edit
              <RiEditBoxLine color="black" size="18px" />
            </button>
          </div>
        </div>

        {/* section 2 */}
        <div className="flex items-center justify-between w-[792px] bg-richblack-800 border-richblack-700 rounded-lg h-[126px] p-6 mt-4">
          <div className="flex flex-col gap-y-6 justify-between pl-3">
            <p className=" font-inter font-semibold text-[18px] leading-[26px] text-richblack-5">
              About
            </p>
            <p
              className={`font-normal font-inter ${
                user?.additionalDetails?.about
                  ? "text-richblack-5"
                  : "text-richblack-400"
              } text-sm font-medium`}
            >
              {user?.additionalDetails?.about ??
                "Write Something About Yourself"}
            </p>
          </div>

          <button
              onClick={() => navigate("/dashboard/settings")}
              className={
                " text-richblack-900 bg-yellow-50 w-[96px] h-[40px] rounded-lg flex gap-x-2 items-center justify-center font-semibold"
              }
            >
              Edit
              <RiEditBoxLine color="black" size="18px" />
            </button>
        </div>

        {/* section 3 */}
        <div className="flex flex-col justify-center gap-y-5 mt-4 pl-10 text-white rounded-lg p-6 w-[792px] h-[288px] bg-richblack-800">
          <div className="flex justify-between">
            <p className=" font-inter font-semibold text-[18px] leading-[26px]  text-richblack-5">
              Personal Details
            </p>

            <div className="-mt-3">
            <button
              onClick={() => navigate("/dashboard/settings")}
              className={
                " text-richblack-900 bg-yellow-50 w-[96px] h-[40px] rounded-lg flex gap-x-2 items-center justify-center font-semibold"
              }
            >
              Edit
              <RiEditBoxLine color="black" size="18px" />
            </button>
            </div>
          </div>

          <div className="flex gap-x-36 mt-3">
            <div className="flex flex-col gap-y-4">
              <div>
                <p className="text-[14px] leading-[22px] font-inter font-normal text-richblack-500">
                  First Name
                </p>
                <p>{user?.firstName}</p>
              </div>
              <div>
                <p className="text-[14px] leading-[22px] font-inter font-normal text-richblack-500">
                  Email
                </p>
                <p>{user?.email}</p>
              </div>
              <div>
                <p className="text-[14px] leading-[22px] font-inter font-normal text-richblack-500">
                  Gender
                </p>
                <p>{user?.additionalDetails?.gender ?? "Add Gender"}</p>
              </div>
            </div>

            <div className="flex flex-col gap-y-4">
              <div>
                <p className="text-[14px] leading-[22px] font-inter font-normal text-richblack-500">
                  Last Name
                </p>
                <p>{user?.lastName}</p>
              </div>
              <div>
                <p className="text-[14px] leading-[22px] font-inter font-normal text-richblack-500">
                  Phone Number
                </p>
                <p>
                  {user?.additionalDetails?.phoneNumber ?? "Add Contact Number"}
                </p>
              </div>
              <div>
                <p className="text-[14px] leading-[22px] font-inter font-normal text-richblack-500">
                  Date Of Birth
                </p>
                <p>
                  {/* {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                    "Add Date Of Birth"} */}
                    Add Date Of Birth
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
