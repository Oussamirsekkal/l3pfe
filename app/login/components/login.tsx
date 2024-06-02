"use client"
import React, { useState } from "react";
import {useRouter} from "next/navigation";
import jwt from "jsonwebtoken";


export default function Login()
{
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.error || 'An error occurred during sign-in');
                return;
            }

            const data = await response.json();

            // Decode the JWT token
            const decodedToken = jwt.decode(data.token);

            if (decodedToken && typeof decodedToken === 'object' && 'isAdmin' in decodedToken) {
                if (decodedToken.isAdmin === true) {
                    router.push('/Dashboard');
                } else {
                    router.push('/profile');
                }
            }

            router.refresh();
        } catch (error) {
            setError('An error occurred during sign-in');
            console.error(error);
        }
    };

    return (


        <div className="flex w-auto flex-wrap text-slate-800">
            <div className="flex w-full flex-col md:w-1/2">
                <div className="my-auto mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]">
                    <p className="text-center text-3xl font-bold md:leading-tight md:text-left md:text-5xl">
                        Welcome back <br/>
                        to <span className="text-blue-600">KidCode</span>
                    </p>
                    <p className="mt-6 text-center font-medium md:text-left">Sign in to your account below.</p>

                    <form method='POST' className="flex flex-col items-stretch pt-3 md:pt-8" onSubmit={handleSubmit}>
                        <div className="flex flex-col pt-4">
                            <div
                                className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                                <input type="email" id="login-email"
                                       className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}
                                       placeholder="Email"/>
                            </div>
                        </div>
                        <div className="mb-4 flex flex-col pt-4">
                            <div
                                className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                                <input type="password" id="login-password"
                                       value={password}
                                       onChange={(e) => setPassword(e.target.value)}
                                       className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                                       placeholder="Password"/>
                            </div>
                        </div>
                        <a href="#" className="mb-6 text-center text-sm font-medium text-gray-600 md:text-left">Forgot
                            password?</a>
                        <button type="submit"
                                className="rounded-lg bg-blue-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-blue-500 ring-offset-2 transition hover:bg-blue-700 focus:ring-2 md:w-32">Sign
                            in
                        </button>
                    </form>
                    {error && (
                        <div className="mt-4 rounded-md bg-red-100 p-4 text-center text-sm text-red-700">
                            <span>{error}</span>
                        </div>
                    )}
                    <div className="py-12 text-center">
                        <p className="text-gray-600">
                            Don&apos;t have an account?
                        </p>
                        <a href="/signup"
                           className="whitespace-nowrap font-semibold text-gray-900">Sign
                            up for free.</a>
                    </div>
                </div>
            </div>
            <div className="relative hidden h-screen select-none bg-blue-600 bg-gradient-to-br md:block md:w-1/2">
                <div className="py-16 px-8 text-white xl:w-[40rem]">
                    <span className="rounded-full bg-white px-3 py-1 font-medium text-blue-600">New Feature</span>
                    <p className="my-6 text-3xl font-semibold leading-10">Create block of code with <span
                        className="abg-white whitespace-nowrap py-2 text-cyan-300">drag and drop</span>.</p>
                    <p className="my-6 text-2xl font-semibold leading-10">Unleash your child&apos;s creativity with
                        drag-and-drop coding and engaging coding games
                    </p>
                    <a href="/benefits" className="font-semibold tracking-wide text-white underline underline-offset-4">Learn
                        More</a>
                </div>
                <img className="ml-8 w-11/12 max-w-lg rounded-lg object-cover" src=""/>
            </div>
        </div>

    );


}