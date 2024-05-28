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
            <div className="mx-auto mt-8 max-w-auto-lg px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <p className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">All Courses</p>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <label htmlFor="sort" className="text-sm font-medium text-gray-700">Sort by:</label>
                            <select
                                id="sort"
                                name="sort"
                                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            >
                                <option value="recent">Recent</option>
                                {/* Add more options here */}
                            </select>
                        </div>

                        <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                            </svg>
                            Export to CSV
                        </button>
                    </div>
                </div>

                <div className="overflow-hidden shadow-lg rounded-lg border border-gray-200">
                    <table className="min-w-full bg-white divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th scope="col"
                                className="py-3 pl-4 pr-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:pl-6">
                                Course Title
                            </th>
                            <th scope="col"
                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Difficulty Level
                            </th>
                            <th scope="col"
                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Created At
                            </th>
                            <th scope="col"
                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {courses.map((course: Course) => (
                            <tr key={course.id} className="hover:bg-gray-50">
                                <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-6">
                                    {course.title}
                                </td>
                                <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                    {course.difficulty_level}
                                </td>
                                <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                    {format(course.created_at, 'MM/dd/yyyy')}
                                </td>
                                <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap flex space-x-2 justify-center">
                                    <button
                                        className="bg-blue-600 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md flex items-center">
                                        <FaEdit className="inline-block mr-2"/>
                                        Edit
                                    </button>
                                    <button
                                        className="bg-blue-600 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md flex items-center">
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