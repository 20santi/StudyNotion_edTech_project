import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidDownArrow } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import SubsectionBuilder from "./SubsectionBuilder";

export default function Nestedview({ handleChangedSectionName }) {
  const { course } = useSelector((state) => state.course);
  const [modal, setModal] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [SectionId, setSectionId] = useState(null);

  const handleDeleteSection = (sectionId) => {};

  const AddSubSection = (sectionId) => {
    setShowModal(true);
    setSectionId(sectionId);
  };

  return (
    <div>
      <div className="flex flex-col">
        <div>
          {course.section.map((data) => (
            <details key={data._id} open>
              <summary className="flex items-center justify-between gap-x-3 border-b border-richblack-600 p-2">
                <div className="flex items-center gap-x-3">
                  <RxDropdownMenu className="text-2xl text-richblack-50" />
                  <p className="font-semibold text-richblack-50">
                    { data.sectionName }
                  </p>
                </div>

                <div className="flex gap-x-2 items-center justify-center">
                  <button
                    onClick={() =>
                      handleChangedSectionName(data._id, data.sectionName)
                    }
                    className="text-richblack-400"
                  >
                    <MdEdit />
                  </button>

                  <button
                    onClick={() => {
                      setModal({
                        text1: "Delete this Section",
                        text2:
                          "All the lectures in this section will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancell",
                        btn1Handeler: () => handleDeleteSection(data._id),
                        btn2Handeler: () => setModal(null),
                      });
                    }}
                  >
                    <RiDeleteBin6Line className="text-xl text-richblack-300" />
                  </button>
                  <span className=" text-richblack-400">|</span>
                  <BiSolidDownArrow className="text-sm ml-2 text-richblack-300" />
                </div>
              </summary>

              <div>
                <div>
                  {data?.subsection.map((subsection) => {
                    return (
                      <div
                        key={subsection._id}
                        className="flex items-center justify-between gap-x-3 border-b border-richblack-600 p-2"
                      >
                        <div className="flex items-center gap-x-3 ml-9">
                          <RxDropdownMenu className="text-2xl text-richblack-50" />
                          <p className=" font-medium font-inter text-[14px] leading-[22px] text-richblack-50">
                            {subsection.title}
                          </p>
                        </div>

                        <div>
                          <button>
                            <MdEdit className="text-xl text-richblack-300" />
                          </button>

                          <button>
                            <RiDeleteBin6Line className="text-xl text-richblack-300" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button
                  onClick={() => AddSubSection(data._id)}
                  className="flex items-center mt-4 gap-x-2 text-yellow-50"
                >
                  <AiOutlinePlus />
                  <p>Add Lecture</p>
                </button>
              </div>
            </details>
          ))}

          {/* {modal ? <Modal /> : <div></div>} */}
          {showModal ? (
            <SubsectionBuilder
              setShowModal={setShowModal}
              sectionId={SectionId}
              course={course}
            />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
