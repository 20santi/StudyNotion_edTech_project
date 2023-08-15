import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { profileUpload } from "../../../../services/operators/profile";
import { setLoading } from "../../../../slices/authSlice";
import EditProfile from "../EditProfile";
import EditPassword from "../EditPassword";

export default function Setting() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const inputRef = useRef();
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const handleOnClick = () => {
    inputRef.current.click();
  }

  const handleOnChange = (e) => {
    const file = e.target.files[0];
    if(file) {
      setImageFile(file);
      previewState(file);
    }
  }

  const previewState = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageUrl(reader.result);
    }
  }

  useEffect(() => {
    if(imageFile) {
      previewState(imageFile);
    }
  }, [imageFile]);

  const handleOnUpload = () => {
    try {
      console.log("Uploading...");
      dispatch(setLoading(true));
      const formData = new FormData();
      formData.append("image", imageFile);
      dispatch(profileUpload(token, formData)).then(() => {
        setLoading(false);
      })
    } catch(error) {
      console.log("ERROR MESSAGE DURING IMAGE UPLOAD: ", error);
    }
  }

  return (
    <div className="w-screen">
      <div className="text-white flex flex-col gap-y-5 w-11/12 max-w-maxContent mx-auto mt-10">
        {/* back button */}
        <div className="">
          <Link to="/dashboard/my-profile">
            <button className="flex flex-row-reverse items-center pl-6 pt-20 text-[14px] leading-[22px] text-richblack-300 font-inter font-normal">
              <p>Back</p>
              <MdKeyboardArrowLeft />
            </button>
          </Link>

          <h1 className="text-[30px] leading-[38px] font-inter font-semibold text-richblack-5 pl-6 mt-4">
            Edit Profile
          </h1>
        </div>

        {/* upload profile picture */}
        <div className="flex w-[792px] bg-richblack-800 border-richblack-700 rounded-lg h-[126px] p-6">
          <div className="flex gap-x-3 items-center">
            <img
              src={imageUrl ? imageUrl : user?.image}
              alt={`profile-${user?.firstName}`}
              className=" aspect-square w-[78px] rounded-full object-cover"
            />
            <div className="flex flex-col gap-y-1">
              <p className=" font-inter font-medium text-[18px] leading-[26px] text-richblack-25">
                Change Profile Picture
              </p>

              <div className="flex gap-x-3">
                <input
                  type="file"
                  ref={inputRef}
                  className=" hidden"
                  accept="image/jpeg , image/jpg, image/gif"
                  onChange={handleOnChange}
                />
              <button
                className={
                  " text-richblack-900 bg-yellow-50 w-[96px] h-[40px] rounded-lg flex gap-x-2 items-center justify-center font-semibold"
                }
                onClick={handleOnClick}
              >
                Select
              </button>
              <button
                className={
                  " text-richblack-5 bg-richblack-700 w-[96px] h-[40px] rounded-lg flex gap-x-2 items-center justify-center font-semibold"
                }
                onClick={handleOnUpload}
              >
                Upload
              </button>
              </div>
            </div>
          </div>
        </div>

        {/* edit profile */}
        <EditProfile/>

        {/* edit password */}
        <EditPassword/>

      </div>
    </div>
  );
}
