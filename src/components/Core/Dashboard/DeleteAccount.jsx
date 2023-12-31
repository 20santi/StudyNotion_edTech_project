import React from "react";
import { MdDelete } from "react-icons/md";

export default function DeleteAccount() {
  const handleOnClick = () => {};

  return (
    <div className="w-[792px] h-[180px] mt-5 bg-pink-900 rounded-lg border border-pink-700 flex p-6 gap-x-6 mb-40">
      <div className="w-[52px] h-[52px] rounded-full bg-pink-700 flex pr-6">
        <MdDelete
          color="pink"
          size="28px"
          className=" translate-x-3 translate-y-3"
          onClick={handleOnClick}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <p className="text-[18px] leading-[26px] font-inter font-semibold text-pink-5">
          Delete Account
        </p>

        <p className="text-[14px] leading-[22px] font-inter font-medium text-pink-25">
          Would you like to delete account? This account contains Paid Courses.
          Deleting your account will remove all the contain associated with it.
        </p>

        <p className="text-[16px] leading-6 font-inter italic font-medium text-pink-300">
          I want to delete my account.
        </p>
      </div>
    </div>
  );
}
