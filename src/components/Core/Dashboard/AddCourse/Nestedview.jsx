import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidDownArrow } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import SubsectionBuilder from "./SubsectionBuilder";
import ConfirmationModal from "../../../../Comon/Modal";
import {
  deleteSection,
  deleteSubection,
} from "../../../../services/operators/courseDetails";
import { setCourse } from "../../../../slices/courseSlice";

export default function Nestedview({ handleChangedSectionName }) {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [deleteSectionModal, setDeleteSectionModal] = useState(null);
  const [deleteSubsectionModal, setDeleteSubsectionModal] = useState(null);
  const [viewsubsection, setViewSubsection] = useState(null);
  const [editSubsection, setEditSubsection] = useState(null);
  const [addSubsection, setAddSubsection] = useState(null);
  const [SectionId, setSectionId] = useState(null);

  const handleDeleteSection = async (sectionId) => {
    const courseId = course._id;
    const response = await deleteSection(
      { sectionId: sectionId, courseId: course._id },
      token
    );
    dispatch(setCourse(response?.data?.data));
    setDeleteSectionModal(null);
  };

  const AddSubSection = (sectionId) => {
    setAddSubsection(sectionId);
    setSectionId(sectionId);
  };

  const deleteSubsectionHandeler = async (subsectionId, sectionId) => {
    const result = await deleteSubection(
      { subsectionId: subsectionId, sectionId: sectionId },
      token
    );
    const updatedSection = course.section.map((section) =>
      section._id === result?.data?.data._id ? result?.data?.data : section
    );

    const updatedCourse = { ...course, section: updatedSection };
    dispatch(setCourse(updatedCourse));
    setDeleteSubsectionModal(null);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-y-6 rounded-lg bg-richblack-700 p-6 px-8 mt-5">
        {course?.section.length > 0 &&
          course?.section.map((data) => (
            <details key={data._id} open>
              <summary className="flex items-center justify-between gap-x-3 border-b border-richblack-600 p-2">
                <div className="flex items-center gap-x-3">
                  <RxDropdownMenu className="text-2xl text-richblack-50" />
                  <p className="font-semibold text-richblack-50">
                    {data.sectionName}
                  </p>
                </div>

                <div className="flex gap-x-2 items-center justify-center">
                  <button
                    onClick={() =>
                      handleChangedSectionName(data._id, data.sectionName)
                    }
                  >
                    <MdEdit className="text-xl text-richblack-400" />
                  </button>

                  <button
                    onClick={() => {
                      setDeleteSectionModal({
                        text1: "Delete this Section",
                        text2:
                          "All the lectures in this section will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancell",
                        btn1Handeler: () => handleDeleteSection(data._id),
                        btn2Handeler: () => setDeleteSectionModal(null),
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
                        onClick={() => setViewSubsection(subsection)}
                        className="flex items-center justify-between gap-x-3 border-b border-richblack-600 p-2"
                      >
                        <div className="flex items-center gap-x-3 ml-9">
                          <RxDropdownMenu className="text-2xl text-richblack-50" />
                          <p className=" font-medium font-inter text-[14px] leading-[22px] text-richblack-50">
                            {subsection.title}
                          </p>
                        </div>

                        <div 
                          className="flex gap-x-2 items-center justify-center"
                          onClick={(e) => e.stopPropagation()}                        
                        >
                          <button
                            onClick={() =>
                              setEditSubsection({
                                ...subsection,
                                sectionId: data._id,
                              })
                            }
                          >
                            <MdEdit className="text-richblack-300" />
                          </button>

                          <button
                            onClick={() => {
                              setDeleteSubsectionModal({
                                text1: "Delete this Subection",
                                text2:
                                  "Video in this Subection will be deleted",
                                btn1Text: "Delete",
                                btn2Text: "Cancell",
                                btn1Handeler: () =>
                                  deleteSubsectionHandeler(
                                    subsection._id,
                                    data._id
                                  ),
                                btn2Handeler: () =>
                                  setDeleteSubsectionModal(null),
                              });
                            }}
                          >
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
      </div>

      {deleteSectionModal ? (
        <ConfirmationModal modalData={deleteSectionModal} />
      ) : (
        <div></div>
      )}

      {addSubsection ? (
        <SubsectionBuilder
          modalData={addSubsection}
          setModalData={setAddSubsection}
          add={true}
        />
      ) : (
        <div></div>
      )}

      {editSubsection ? (
        <SubsectionBuilder
          modalData={editSubsection}
          setModalData={setEditSubsection}
          edit={true}
        />
      ) : (
        <div></div>
      )}

      {viewsubsection && (
        <SubsectionBuilder
          modalData={viewsubsection}
          setModalData={setViewSubsection}
          view={true}
        />
      )}

      {deleteSubsectionModal ? (
        <ConfirmationModal modalData={deleteSubsectionModal} />
      ) : (
        <div></div>
      )}
    </div>
  );
}
