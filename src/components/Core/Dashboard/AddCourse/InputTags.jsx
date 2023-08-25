import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";

export default function InputTags({ register, id, name, setValue, errors }) {
  const [tags, setTags] = useState([]);

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
    setValue(name, tags);
  }, [tags]);

  useEffect(() => {
    register(name, {required: true, validate: (value) => value.length > 0})
  }, []);

  return (
    <div className="">
      <div>
        <label htmlFor="tag">
          Tags<span className=" text-pink-200"> *</span>
        </label>
        <input
          id="tag"
          defaultValue=""
          onKeyDown={handleKeyDown}
          placeholder="Choose a Tag"
          name="tag"
          className="w-full h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                      leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-700 opacity-[0.9]
                      shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
        />
        {errors[name] && <span>Tag is required</span>}

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
    </div>
  );
}
