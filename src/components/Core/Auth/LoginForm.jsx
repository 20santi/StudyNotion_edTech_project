import React from "react";
import { useForm } from "react-hook-form";

export default function LoginForm() {

    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm()

    const handleOnSubmit = (data) => {
        console.log("data -> ", data);
    }

    return (
        <div>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
                <div className="flex flex-col">
                    <label htmlFor="emailAddress">
                        Email Address <span>*</span>
                    </label>
                    <input
                        id="emailAddress"
                        type="text"
                        placeholder="Enter your Email Address"
                        {...register("emailAddress", {require:true})}
                        className=""
                    /> 
                    {
                        errors.message && (
                            <span className=" text-pink-200">
                                Email Address is required
                            </span>
                        )
                    }
                </div>

                <div className="flex flex-col">
                    <label htmlFor="password">
                        Password <span>*</span>
                    </label>
                    <input
                        id="password"
                        type="text"
                        placeholder="Enter Password"
                        {...register("password", {require:true})}
                        className=""
                    /> 
                    {
                        errors.message && (
                            <span className=" text-pink-200">
                                Password is required
                            </span>
                        )
                    }
                </div>

                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    )
}