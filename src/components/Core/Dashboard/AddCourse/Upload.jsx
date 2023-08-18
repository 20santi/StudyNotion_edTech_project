import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Player } from "video-react";
import { FiUploadCloud } from "react-icons/fi";

export default function Upload({
  register,
  name,
  label,
  errors,
  setValue,
  editCourse,
  video = false
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const onDrop = (files) => {
    const file = files[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
  };

  useEffect(() => {
    setValue(name, selectedFile);
  }, [selectedFile, setValue]);

  useEffect(() => {
    register(name, { required: true });
  }, [register]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".png", ".jpg"] }
      : { "video/*": [".mp4"] },
    onDrop,
  });

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>
      
      <div className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
      >
      {imageUrl ? (
        <div className="flex w-full flex-col p-6">
          {!video ? (
            <img
              src={imageUrl}
              alt={`${name}`}
              className="h-full w-full rounded-md object-cover"
            />
          ) : (
            <Player aspectRatio="16:9" playsInline src={imageUrl} />
          )}
          <button
            type="button"
            onClick={() => {
              setImageUrl("");
              setValue(name, null);
              setSelectedFile(null);
            }}
            className="mt-3 text-richblack-400 underline"
          >
            Cancell
          </button>
        </div>
      ) : (
        <div
          className="flex w-full flex-col items-center p-6"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
            <FiUploadCloud className="text-2xl text-yellow-50" />
          </div>
          <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
            Drag and drop an {!video ? "image" : "video"}, or click to{" "}
            <span className="font-semibold text-yellow-50">Browse</span> a file
          </p>
          <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
            <li>Aspect ratio 16:9</li>
            <li>Recommended size 1024x576</li>
          </ul>
        </div>
      )}
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
}
