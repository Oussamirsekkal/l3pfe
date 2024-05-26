import { format } from 'date-fns';
import { FaEdit, FaTrash } from 'react-icons/fa';
type Course = {
    id: number;
    title: string;
    description: string;
    difficulty_level: string;
    created_at: Date;
    imageUrl: string | null;
};
type ManageCoursesProps = {
    courses: Course[];
};

export default function ManageCourses({ courses }: ManageCoursesProps) {
    return (
        <div className="w-auto">
            <div className="mx-auto mt-8 max-w-screen-lg px-2">
                <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
                    <p className="flex-1 text-base font-bold text-gray-900">All courses</p>

                    <div className="mt-4 sm:mt-0">
                        <div className="flex items-center justify-start sm:justify-end">
                            <div className="flex items-center">
                                <label htmlFor="" className="mr-2 flex-shrink-0 text-sm font-medium text-gray-900"> Sort
                                    by: </label>
                                <select name=""
                                        className="sm: mr-4 block w-full whitespace-pre rounded-lg border p-1 pr-10 text-base outline-none focus:shadow sm:text-sm">
                                    <option className="whitespace-no-wrap text-sm">Recent</option>
                                </select>
                            </div>

                            <button type="button"
                                    className="inline-flex cursor-pointer items-center rounded-lg border border-gray-400 bg-white py-2 px-3 text-center text-sm font-medium text-gray-800 shadow hover:bg-gray-100 focus:shadow">
                                <svg className="mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                          className=""></path>
                                </svg>
                                Export to CSV
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-6 overflow-hidden rounded-xl border shadow">
                    <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2">
                        <thead className="bg-gray-100">
                        <tr>
                            <th scope="col"
                                className="py-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Course Title
                            </th>

                            <th scope="col" className="px-3 py-3 text-left text-sm font-semibold text-gray-900">
                                Difficulty Level
                            </th>
                            <th scope="col" className="py-3 px-6 text-left text-sm font-semibold text-gray-900">
                                Created At
                            </th>
                            <th scope="col" className="relative py-3 pl-3 pr-4 sm:pr-6">
                                <span className="sr-only">Additional Info</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                        {courses.map((course: Course) => (
                            <tr key={course.id}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                    {course.title}
                                </td>

                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{course.difficulty_level}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {format(course.created_at, 'MM/dd/yyyy')}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 flex justify-center">
                                    <button
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mr-2">
                                        <FaEdit className="inline-block mr-2"/>
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
                                        <FaTrash className="inline-block mr-2"/>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}