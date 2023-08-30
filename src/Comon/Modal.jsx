import IconBtn from "./IconButton"

export default function ConfirmationModal({ modalData }) {
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/20 z-[1000] flex items-center justify-center">
      <div className="max-w-[350px] bg-richblack-800 border border-richblack-500 rounded-lg p-6">
        <p className="text-2xl font-semibold text-richblack-5">
          {modalData?.text1}
        </p>
        <p className="mt-3 mb-5 leading-6 text-richblack-200">
          {modalData?.text2}
        </p>
        <div className="flex items-center gap-x-4">
          <button
            onClick={modalData?.btn1Handeler}
            className="gap-x-2 w-[80px] h-[40px] rounded-lg bg-yellow-50 text-richblack-900 flex items-center justify-center font-semibold"
          >
            {modalData?.btn1Text}
          </button>
          <button
            className="cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold text-richblack-900"
            onClick={modalData?.btn2Handeler}
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  )
}