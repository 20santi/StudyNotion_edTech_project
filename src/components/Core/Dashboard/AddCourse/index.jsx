import RenderSteps from "./RenderSteps";

export default function AddCourse() {
    return (
        <div className="text-white w-screen">
            <div className="flex w-11/12 max-w-maxContent mx-auto justify-between">
                <div className="flex flex-col w-[60%]">
                    <h1 className="font-inter font-bold text-richblack-5 text-[30px] leading-[38px] mt-20">
                        Add Course
                    </h1>
                    <div className="mx-auto mt-8">
                        <RenderSteps/>
                    </div>
                </div>
                <div className="w-[384px] mt-20 fixed left-[1200px] hidden xl:flex flex-col gap-y-3 border border-richblack-700 rounded-lg p-6 bg-richblack-800 ">
                    <p className="-ml-2">
                        ⚡Code Upload Tips
                    </p>
                    <ol className="flex flex-col gap-y-2 ">
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024x576.</li>
                        <li>Video section controls the course overview video.</li>
                        <li>Course Builder is where you create & organize a course.</li>
                        <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                        <li>Information from the Additional Data section shows up on the course single page.</li>
                        <li>Make Announcements to notify any important</li>
                        <li>Notes to all enrolled students at once.</li>
                    </ol>
                </div>
            </div>
        </div>
    )
}