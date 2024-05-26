"use client"
import React, { useState } from "react";
import {useRouter} from "next/navigation";

export default function Signup()
{
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        {/*hello*/}

        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
            }),
        });

        if (!response.ok) {
            alert('An error occurred in the response');
            return;
        }

        const data = await response.json();

        if (!response.ok) {
            alert(data.error);
            return;
        }
        router.push('/login');
    };

    return (
        <div className="flex w-auto flex-wrap text-slate-800">
            <div className="flex w-full flex-col md:w-1/2">
                <div className="my-auto mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]">
                    <p className="text-center text-3xl font-bold md:leading-tight md:text-left md:text-5xl">
                        Welcome <br/>
                        to <span className="text-blue-600">KidCode</span>
                    </p>
                    <p className="mt-6 text-center font-medium md:text-left">Create your account</p>

                    <form method="POST" className="flex flex-col items-stretch pt-3 md:pt-8" onSubmit={handleSubmit}>
                        <div className="flex flex-col pt-4">
                            <div
                                className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                                <input type="text" id="full-Name"
                                       value={name}
                                       onChange={(e) => setName(e.target.value)}
                                       className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                                       placeholder="Full Name"/>
                            </div>
                        </div>


                        <div className="flex flex-col pt-4">
                            <div
                                className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                                <input type="email" id="login-email"
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}
                                       className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                                       placeholder="Email"/>
                            </div>
                        </div>
                        <div className="flex flex-col pt-4">
                            <div
                                className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                                <input type="password" id="login-password"
                                       value={password}
                                       onChange={(e) => setPassword(e.target.value)}
                                       className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                                       placeholder="Password"/>
                            </div>
                        </div>

                        <div className="mb-4 flex flex-col pt-4">
                            <div
                                className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                                <input type="password" id="confirm-login-password"
                                       value={confirmPassword}
                                       onChange={(e) => setConfirmPassword(e.target.value)}
                                       className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                                       placeholder="Confirm your password"/>
                            </div>
                        </div>
                        <button type="submit"
                                className="rounded-lg bg-blue-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-blue-500 ring-offset-2 transition hover:bg-blue-700 focus:ring-2 md:w-32">Sign
                            up
                        </button>
                    </form>
                    <div className="py-12 text-center">
                        <p className="text-gray-600">
                            Already have an account? &nbsp;

                        </p>
                        <a href="/login"
                           className="whitespace-nowrap font-semibold text-gray-900">Sign
                            in to your account.</a>
                    </div>
                </div>
            </div>
            <div className="relative hidden h-screen select-none bg-blue-600 bg-gradient-to-br md:block md:w-1/2">
                <div className="py-16 px-8 text-white xl:w-[40rem]">
                    <span className="rounded-full bg-white px-3 py-1 font-medium text-blue-600">New Feature</span>
                    <p className="my-6 text-3xl font-semibold leading-10">Create block of code with <span
                        className="abg-white whitespace-nowrap py-2 text-cyan-300">drag and drop</span>.</p>
                    <p className="mb-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt
                        necessitatibus nostrum repellendus ab totam.</p>
                    <a href="#" className="font-semibold tracking-wide text-white underline underline-offset-4">Learn
                        More</a>
                </div>
                <img className="ml-8 w-11/12 max-w-lg rounded-lg object-cover" src=""/>
            </div>
        </div>


    );


}