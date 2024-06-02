import * as React from 'react';
import { toast } from 'react-toastify';
import { FaTimes } from "react-icons/fa";

interface Course {
    id: number;
    title: string;
    description: string;
    difficulty_level: string;
    created_at: Date;
    imageUrl: string | null;
}

interface EditCourseFormProps {
    course: Course;
    onUpdate: (updatedCourse: Course) => void;
    onCancel: () => void;
}

const EditCourseForm: React.FC<EditCourseFormProps> = ({ course, onUpdate, onCancel }) => {
    const [title, setTitle] = React.useState(course.title);
    const [description, setDescription] = React.useState(course.description);
    const [difficulty_level, setDifficultyLevel] = React.useState(course.difficulty_level);
    const [imageUrl, setImageUrl] = React.useState(course.imageUrl || '');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const updatedCourse = { ...course, title, description, difficulty_level,  };

        try {
            console.log('Sending request to update course'); // Add this line
            const response = await fetch('/api/updatecourse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCourse),
            });

            if (!response.ok) {
                throw new Error('Error updating course');
            }

            console.log('Course updated successfully'); // Add this line
            const updatedCourseFromServer = await response.json();

            // Call the onUpdate function with the updated course from the server
            onUpdate(updatedCourseFromServer);
            toast.success('Course updated successfully');
        } catch (error) {
            console.error('Failed to update course:', error);
            toast.error('Failed to update course');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black bg-opacity-50"></div>
            <div className="relative bg-white rounded-lg max-w-screen-md mx-auto px-4 py-6 md:px-8">
                <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                    onClick={onCancel}
                >
                    <FaTimes/>
                </button>

                <section
                    className="shadow-blue-100 mx-auto max-w-screen-lg rounded-xl bg-white text-gray-600 shadow-lg sm:my-10 sm:border">
                    <div className="container mx-auto flex flex-col flex-wrap px-5 pb-12">
                        <div
                            className="bg-slate-50 mx-auto mt-4 mb-10 flex w-full flex-wrap items-center space-x-4 py-4 md:mb-20 md:justify-center md:px-10">
                            <span
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow">1</span>
                            <span className="font-semibold text-blue-600 md:inline">Edit Course</span>
                        </div>

                        <div className="flex w-full flex-col">
                            <h1 className="text-2xl font-semibold">Edit Course</h1>
                            <p className="mt-2 text-gray-500">Please fill out the information below:</p>
                            <div className="mt-4 grid items-center gap-3 gap-y-5 sm:grid-cols-4">
                                <div className="col-span-2 flex flex-col">
                                    <label className="mb-1 ml-3 font-semibold text-gray-500"
                                           htmlFor="courseTitle">Course Title</label>
                                    <input className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
                                           id="courseTitle" type="text"
                                           value={title}
                                           onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col sm:col-span-3 ">
                                    <label className="mb-1 ml-3 font-semibold text-gray-500"
                                           htmlFor="courseDescription">Course Description</label>
                                    <input className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
                                           id="courseDescription" type="text"
                                           value={description}
                                           onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col sm:col-span-3 ">
                                    <label className="mb-1 ml-3 font-semibold text-gray-500"
                                           htmlFor="difficultyLevel">Difficulty Level</label>
                                    <input className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
                                           id="difficultyLevel" type="text"
                                           value={difficulty_level}
                                           onChange={(e) => setDifficultyLevel(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col justify-between sm:flex-row">

                                <button
                                    className="group order-1 my-2 flex w-full items-center justify-center rounded-lg bg-gray-200 py-2 text-center font-bold text-gray-600 outline-none transition sm:w-40 focus:ring hover:bg-gray-300"
                                    onClick={onCancel}>Cancel
                                </button>
                                <button
                                    className="group my-2 flex w-full items-center justify-center rounded-lg bg-blue-700 py-2 text-center font-bold text-white outline-none transition sm:order-1 sm:w-40 focus:ring"
                                    onClick={handleSubmit}>Update Course
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default EditCourseForm;