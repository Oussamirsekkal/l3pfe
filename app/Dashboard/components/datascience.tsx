"use client";
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData, Chart as ChartJS, registerables } from 'chart.js';

// Register the necessary components
ChartJS.register(...registerables);

interface CourseVisit {
    courseId: string;
    count: number;
}

interface Course {
    id: string;
    title: string;
}

export default function Datascience() {
    const [chartData, setChartData] = useState<ChartData<'bar'>>({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        async function fetchCourseVisits() {
            try {
                const response = await fetch('/api/data-science');
                const courseVisits: CourseVisit[] = await response.json();

                const courseNamesPromises = courseVisits.map(async (visit) => {
                    const courseResponse = await fetch(`/api/getcoursename?id=${visit.courseId}`);
                    const course: Course = await courseResponse.json();
                    return course.title;
                });

                const courseNames = await Promise.all(courseNamesPromises);

                setChartData({
                    labels: courseNames,
                    datasets: [
                        {
                            label: 'number of Visits',
                            data: courseVisits.map((visit) => visit.count),
                            backgroundColor: 'rgba(75,192,192,0.4)',
                            borderColor: 'rgba(75,192,192,1)',
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                console.error("Failed to fetch course visits:", error);
            }
        }

        fetchCourseVisits();
    }, []);

    return (
        <div className="p-4 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Courses Visits</h2>
            <div className="w-full h-64">
                <Bar data={chartData} />
            </div>
        </div>
    );
}
