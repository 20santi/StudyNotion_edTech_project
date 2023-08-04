import React from "react";
import { Link } from "react-router-dom";
import IconButton from "../Comon/IconButton";
import image1 from "../assets/Images/boxoffice.png";
import AnimationSection from "./AnimationSection";

export default function Home() {
    return (
        <div className="">
            {/* section 1 */}
            <div className="flex flex-col pt-28 items-center">
                <div className="flex flex-col items-center gap-y-9">
                    <Link to={"/login"}>
                        <IconButton 
                            text={"Become an Instructor"}
                            customClass={"text-[16px] leading-6 font-inter font-semibold text-richblack-200 rounded-lg bg-richblack-800 w-[235px] h-[44px] shadow-[0px_1px_0px_0px_rgba(255,255,255,0.18)]"}
                        />
                    </Link>

                    <div className="flex flex-col gap-y-5 items-center w-[820px] text-center">
                        <p className="text-richblack-5 text-[36px] leading-[44px] font-inter font-semibold">
                            Empower Your Future with<span> </span>
                            <span 
                                className=" text-transparent bg-clip-text bg-gradient-to-r from-[#1FA2FF] 
                                from-100% via-[#12D8FA] via-100% to-[#A6FFCB] to-100%" 
                            >
                                Coding Skills 
                            </span>
                        </p>
                        <p className="text-[16px] leading-6 font-inter font-medium text-richblack-300">
                            With our online coding courses, you can learn at your own pace, 
                            from anywhere in the world, and get access to a wealth of resources, 
                            including hands-on projects, quizzes, and personalized feedback from instructors. 
                        </p>
                    </div>

                    <div className="flex gap-x-6">
                        <IconButton 
                            text={"Learn More"}
                            customClass={"text-[16px] leading-6 font-inter font-semibold text-richblack-900 rounded-lg bg-yellow-50 w-[135px] h-[48px] shadow-[2px_2px_0px_0px_rgba(255,255,255,0.51)]"}
                        />
                        <IconButton 
                            text={"Book a Demo"}
                            customClass={"text-[16px] leading-6 font-inter font-semibold text-richblack-200 rounded-lg bg-richblack-800 w-[149px] h-[48px] shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]"}
                        />
                    </div>
                </div>

                <div className="mt-20">
                    <img
                        src={image1} width="1035px" height="535px"
                    />
                </div>

                <div className="">
                    <AnimationSection
                        text1={`Unlock your `}
                        Span={"coding potential "}
                        text2={"with our online courses."}
                        des={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                        btn1={"Try it Yourself"}
                        btn2={"Learn More"}
                        reverse={false}
                    />
                </div>
                <div className="mb-10 mt-10">
                    <AnimationSection
                        text1={`Start`}
                        Span={"coding in seconds "}
                        text2={""}
                        des={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                        btn1={"Continue Lesson"}
                        btn2={"Learn More"}
                        reverse={true}
                    />
                </div>
            </div>
        </div>
    )
}