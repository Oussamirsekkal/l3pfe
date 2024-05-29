// app/courses/page.tsx
import Link from 'next/link';
import prisma from "@/prisma";
import React from 'react';

async function getAllCourses() {
    return prisma.courses.findMany({
        orderBy: {
            id: 'asc', // Order by id in ascending order
        },
    });
}


export default async function Courses() {
    const courses = await getAllCourses();

    return (
        <div className="relative bg-white">
            <img
                className="w-full h-screen  hidden lg:inline-block opacity-50"
            />
            <div className="bg-gray-300 font-sans lg:bg-transparent flex flex-col lg:flex-row absolute justify-center lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 px-5 xl:px-0 py-8 lg:py-0 w-full gap-6 items-center lg:items-stretch">
                {/* First portion */}
                <div className="flex flex-col flex-wrap max-w-[360px] md:w-[384px] min-h-[572px] p-6 bg-[#365CCE] group rounded-2xl relative overflow-hidden">
                    <div className="text-start text-white">
                        <span className="font-light text-3xl ">Explore Courses</span>
                        <br />
                        <span className="font-bold text-3xl">For Children</span>
                        <br />
                        <div className="text-lg leading-7">
                            Choose a course and start learning with our fun and interactive
                            platform.
                        </div>
                        <RightArrow />
                    </div>
                    <div className="absolute bottom-0 h-[300px]">
                        <img
                            src="https://freepngimg.com/thumb/girl/168680-woman-young-free-clipart-hd.png"
                            alt="girl image for promot pricing plan"
                        />
                    </div>
                </div>
                {/* Course list */}
                {courses.map((course) => (
                    <div
                        key={course.id}
                        className="flex flex-col max-w-[360px] md:w-[384px] min-h-[518px] md:min-h-[572px] p-6 bg-white group rounded-2xl border xl:border-none border-[#0B0641] relative"
                    >
                        <div className="flex flex-row gap-5 items-center">
                            <span>
                                <svg
                                    width="34"
                                    height="34"
                                    viewBox="0 0 34 34"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    {/* Icon SVG path */}
                                </svg>
                            </span>
                            <span className="text-3xl font-bold">{course.title}</span>
                        </div>
                        <span className="flex justify-center mt-4 text-[#A9A9AA] text-[22px]">
                            About Course
                        </span>
                        <div className="flex flex-row gap-3 items-start mt-6 text-left text-lg">
                            <div className="pt-1 shrink-0 ">
                                <RightIcon />
                            </div>
                            <span>{course.description}</span>
                        </div>
                        <div className="border border-dashed border-[#A9A9AA] tracking-widest my-4" />
                        <div className="h-28 ">
                            <div className="flex flex-col gap-4 justify-between absolute left-6 right-6 bottom-6">
                                <div className="flex items-baseline">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor" className="h-6 w-6 text-green-500 mr-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M5 13l4 4L19 7"/>
                                    </svg>
                                    <span className="text-4xl font-bold ">Free</span>
                                </div>
                                <div className="flex align-bottom">
                                    <Link
                                        href={`/courses/${course.id}`}
                                        className="w-full rounded-xl font-semibold text-xl px-4 py-3 bg-[#365CCE] text-white"
                                    >
                                        Start Course
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Reusable components
const RightArrow = () => (
    <svg
        className="mt-5"
        width="30"
        height="29"
        viewBox="0 0 30 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M22.9187 12.7757L13.1821 3.03919L15.7488 0.472548L29.8671 14.5909L15.7488 28.7092L13.1821 26.1426L22.9187 16.406H0.824509V12.7757H22.9187Z"
            fill="white"
        />
    </svg>
);

const RightIcon = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M10.0001 0.00012207C4.48608 0.00012207 7.62939e-05 4.48612 7.62939e-05 10.0001C7.62939e-05 15.5141 4.48608 20.0001 10.0001 20.0001C15.5141 20.0001 20.0001 15.5141 20.0001 10.0001C20.0001 4.48612 15.5141 0.00012207 10.0001 0.00012207ZM8.00108 14.4131L4.28808 10.7081L5.70008 9.29212L7.99908 11.5871L13.2931 6.29312L14.7071 7.70712L8.00108 14.4131Z"
            fill="#35353F"
        />
    </svg>
);