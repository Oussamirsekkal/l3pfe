'use client';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';

type Course = {
    id: number;
    title: string;
    description: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get('query') || '';
    const { data: courses, error } = useSWR(`/api/searchcourses?query=${query}`, fetcher);

    if (error) return <div className="text-red-500">Failed to load</div>;
    if (!courses) return <div className="flex items-center justify-center h-screen"><FaSearch className="animate-spin text-4xl text-blue-500" /></div>;

    if (query === '' || (Array.isArray(courses) && courses.length === 0)) {
        return (
            <div className="min-h-auto bg-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">No Search Results</h1>
                    <p className="text-gray-600">Please enter a search query to find courses.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                    Search Results for &quot;{query}&quot;
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {courses.map((course: Course) => (
                        <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h2>
                                <p className="text-gray-600 mb-4">{course.description}</p>
                                <Link href={`/courses/${course.id}`} className="text-blue-600 hover:text-blue-800 font-semibold">
                                    View Course
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}