import React from "react";
import IconButton from "../Comon/IconButton";
import { TypeAnimation } from "react-type-animation";

export default function AnimationSection({
        text1,
        text2,
        Span,
        btn1,
        btn2,
        des,
        reverse
    }) {
    return (
        <div className={`flex ${reverse ? ("flex-row-reverse") : ("")} justify-between  mt-32 `}>
            <div className="flex flex-col gap-y-5 w-[555px]">
                <p className="text-richblack-5 text-[36px] leading-[44px] font-inter font-semibold">
                    {text1} 
                    <span className=" text-transparent bg-clip-text bg-gradient-to-r from-[#1FA2FF] 
                            from-100% via-[#12D8FA] via-100% to-[#A6FFCB] to-100%" >

                        {Span}

                    </span> 
                    {text2}
                </p>

                <p className="text-[16px] leading-6 font-inter font-medium text-richblack-300 w-[440px]">
                    {des}
                </p>

                <div className="flex gap-x-6 mt-16">
                    <IconButton
                        text={btn1}
                        customClass={"text-[16px] leading-6 font-inter font-semibold text-richblack-900 rounded-lg bg-yellow-50 w-[179px] h-[48px] shadow-[2px_2px_0px_0px_rgba(255,255,255,0.51)]"}
                    />
                    <IconButton
                        text={btn2}
                        customClass={"text-[16px] leading-6 font-inter font-semibold text-richblack-200 rounded-lg bg-richblack-800 w-[135px] h-[48px] shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]"}
                    />
                </div>
            </div>

            {/* animation */}
            <div className="w-[450px] h-[330px] p-3 font-mono text-brown-100 flex gap-x-3 bg-clip-border bg-gradient-to-r from-[#FFFFFF38] from-2% to-[#FFFFFF00] to-0%">
                <div className="flex flex-col">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p className="-ml-1">10</p>
                    <p className="-ml-1">11</p>
                    <p className="-ml-1">12</p>
                    <p className="-ml-1">13</p>
                </div>
                <TypeAnimation
                    style={{ whiteSpace: 'pre-line', display: 'block' }}
                    sequence={[
                        `<!DOCTYPE html>\n<html>\n<head><title>Example</title><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>\n</body>`, 1000, ""
                    ]}
                    repeat={Infinity}
                    omitDeletionAnimation={true}
                    cursor={true}
                />
            </div>
        </div>
    )
}