// app/courses/[courseId].js
import { notFound } from 'next/navigation';
import prisma from "@/prisma";
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';



// Assuming you have a function to fetch course data
async function getCourseData(courseId: number) {
    return prisma.courses.findUnique({ where: { id: courseId } });
}

export default async function Course({ params }: { params: Params }) {
    const courseId = Number(params.courseId); // Convert to number
    const courseData = await getCourseData(courseId);

    if (!courseData) {
        return notFound();
    }

    return (
        <div>
            <div className="m-5">

                <div
                    className="group mx-2 mt-10 grid max-w-screen-lg grid-cols-1 space-x-8 overflow-hidden rounded-lg border text-gray-700 shadow transition hover:shadow-lg sm:mx-auto sm:grid-cols-5">
                    <a href="#" className="col-span-2 text-left text-gray-600 hover:text-gray-700">
                        <div className="group relative h-full w-full overflow-hidden">
                            <img src={`/coursesimages/${courseData.imageUrl}`} alt={courseData.title}
                                 className="h-full w-full border-none object-cover text-gray-700 transition group-hover:scale-125"/>
                            <span
                                className="absolute top-2 left-2 rounded-full bg-yellow-200 px-2 text-xs font-semibold text-yellow-600">Blockly</span>
                        </div>
                    </a>
                    <div className="col-span-3 flex flex-col space-y-3 pr-8 text-left">
                        <a href="#" className="mt-3 overflow-hidden text-2xl font-semibold">
                            {courseData.title} </a>
                        <p className="overflow-hidden text-sm">
                            {courseData.description}</p>

                        <div className="flex flex-col text-gray-700 sm:flex-row">
                            <div className="flex h-fit space-x-2 text-sm font-medium">
                                <div
                                    className={`rounded-full px-2 py-0.5 text-white ${courseData.difficulty_level === 'easy' ? 'bg-green-500' : 'bg-orange-500'}`}>
                                    {courseData.difficulty_level}
                                </div>

                                <div className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-700">160 Enrolled</div>
                            </div>
                            <a href="#"
                               className="my-5 rounded-md px-5 py-2 text-center transition hover:scale-105 bg-orange-600 text-white sm:ml-auto">Enroll
                                Now </a>
                        </div>
                    </div>
                </div>


            </div>
            {/* Render other course details */}
        </div>
    );
}