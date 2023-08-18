import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";

export default function Requirements({
  name,
  register,
  label,
  placeholder,
  setValue,
  errors,
}) {
  const [requirement, setRequirement] = useState("");
  const [requirementsList, setRequirementsList] = useState([]);

  const add = () => {
    if (requirement) {
      setRequirementsList([...requirementsList, requirement]);
      setRequirement("");
    }
  };

  useEffect(() => {
    register(name, {required: true, validate: (value) => value.length > 0})
  }, []);

  useEffect(() => {
    setValue(name, requirementsList);
  }, [requirementsList]);

  const remove = (index) => {
    const selectData = requirementsList.filter((_, idx) => index !== idx);
    setRequirementsList(selectData);
  };

  return (
    <div>
      <div>
        <label htmlFor={name}>
          {label}
          <span className=" text-pink-200"> *</span>
        </label>
        <input
          type="text"
          id={name}
          value={requirement}
          placeholder={placeholder}
          onChange={(e) => setRequirement(e.target.value)}
          className="w-full h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                    leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-700 opacity-[0.9]
                    shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
        />
        <button onClick={add} className="font-semibold text-yellow-50">
          Add
        </button>
        <div className="mt-4 gap-x-3 flex">
          {requirementsList.map((data, index) => (
            <div
              key={index}
              className={`p-3 h-[30px] rounded-full bg-yellow-900 border border-yellow-50 text-yellow-50 flex items-center justify-center gap-x-2`}
            >
              <p className="">{data}</p>
              <button onClick={() => remove(index)}>
                <ImCross className="text-[12px]" />
              </button>
            </div>
          ))}
        </div>
        {errors[name] && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            tag is required
          </span>
        )}
      </div>
    </div>
  );
}
