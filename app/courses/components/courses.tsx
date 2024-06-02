"use client"
import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import {FaUser, FaSearch,FaChild} from "react-icons/fa";
import {useRouter} from "next/router";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ChildCare from '@mui/icons-material/ChildCare';
import Cookies from 'js-cookie';
interface Course {
    id: number;
    title: string;
    description: string;

}
interface child {
    id: number;
    name: string;

}

interface CoursesProps {
    courses: Course[];
    id : number ;
    childs :child[];
}
interface VisitedCourses {
    [childId: string]: number[];
}
const Courses: React.FC<CoursesProps> = ({ courses ,id,childs }) => {
    const [selectedChild, setSelectedChild] = useState<child | null>(null);
    useEffect(() => {
        const selectedChildId = Cookies.get('selectedChild');
        if (selectedChildId) {
            const selectedChild = childs.find(child => child.id.toString() === selectedChildId);
            if (selectedChild) {
                setSelectedChild(selectedChild);
            }
        }
    }, [childs]);




    const handleChildSelect = (child: child) => {
        setSelectedChild(child);
        Cookies.set('selectedChild', child.id.toString(), { expires: 7 }); // The cookie will expire after 7 days
    };

    const [anchorEl, setAnchorEl] = React.useState<null | Element>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event:React.MouseEvent) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const manageVisitedCourses = (childId:any, courseId:any) => {
        // Check if the cookie for visited courses exists
        const visitedCoursesCookie = Cookies.get('visitedCourses');

        // If the cookie exists, parse the JSON string to get the visited courses object
        let visitedCourses = visitedCoursesCookie ? JSON.parse(visitedCoursesCookie) : {};

        // If the child doesn't have an array for visited courses, create a new one
        if (!visitedCourses[childId]) {
            visitedCourses[childId] = [];
        }

        // Add the current course ID to the child's visited courses array if it doesn't already exist
        visitedCourses[childId].push(courseId);

        // Set the updated visited courses object as a cookie
        Cookies.set('visitedCourses', JSON.stringify(visitedCourses), { expires: 7 });
    };
    const handleCourseSelect = (courseId: number) => {
        // Get the selected child's ID from the existing cookie
        const selectedChildId = Cookies.get('selectedChild');

        if (!selectedChildId) {
            console.error('No selected child');
            return;
        }

        // Call manageVisitedCourses function
        manageVisitedCourses(selectedChildId, courseId);

        // Get the updated data from the 'visitedCourses' cookie
        const visitedCoursesCookie = Cookies.get('visitedCourses');
        const visitedCourses: VisitedCourses = visitedCoursesCookie ? JSON.parse(visitedCoursesCookie) : {};

        // Check if visitedCourses and selectedChildId exist
        if (visitedCourses && visitedCourses[selectedChildId]) {
            // Send the updated data to the server
            fetch('/api/visited-courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ childId: selectedChildId, courseIds: visitedCourses[selectedChildId] }),
            })
                .then((response) => {
                    if (response.ok) {
                        console.log('Visited courses data saved successfully');
                    } else {
                        console.error('Failed to save visited courses data');
                    }
                })
                .catch((error) => {
                    console.error('Error saving visited courses data:', error);
                });
        } else {
            console.error('Visited courses or selected child ID not defined');
        }
    };
    return (
        <div className="relative bg-white">

            {childs.length === 0 && (<div className="flex flex-col items-center mx-auto mt-8">
                <p className="text-lg font-semibold text-blue-600">You should add children to your profile in order to check the courses</p>
                <Link className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg" href="/profile">
                   Go to Profile
                </Link>
            </div>)}

            {childs.length > 0 && !selectedChild && (
                <div className="flex flex-col items-center mx-auto mt-8">
                    <Button
                        color="primary"
                        onClick={handleClick}
                    >
                        Select a child
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        {childs.map((child) => (
                            <MenuItem
                                key={child.id}
                                onClick={() => handleChildSelect(child)}
                            >
                                <ListItemIcon>
                                    <ChildCare fontSize="small" />
                                </ListItemIcon>
                                {child.name}
                            </MenuItem>
                        ))}
                    </Menu>
                </div>
            )}
            {selectedChild && (
                <div className="flex justify-center items-center min-h-screen  p-4">
                    <div className="container mx-auto flex flex-col lg:flex-row gap-6 items-center lg:items-stretch">
                        {/* First portion */}

                        <div
                            className="flex flex-col max-w-sm md:w-96 min-h-96 p-6 bg-blue-800 text-white rounded-2xl relative overflow-hidden">

                            <div className="relative">
                                {/* Dropdown button */}
                                <div className="flex justify-center mb-6">
                                    <Button color="info" onClick={handleClick}>
                                        {`Selected Child: ${selectedChild.name}`}
                                    </Button>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        onClick={handleClose}
                                        PaperProps={{
                                            elevation: 0,
                                            sx: {
                                                overflow: 'visible',
                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                mt: 1.5,
                                                '& .MuiAvatar-root': {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                                '&:before': {
                                                    content: '""',
                                                    display: 'block',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: 'background.paper',
                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                    zIndex: 0,
                                                },
                                            },
                                        }}
                                        transformOrigin={{horizontal: 'right', vertical: 'top'}}
                                        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                                    >
                                        {childs.map((child) => (
                                            <MenuItem key={child.id} onClick={() => handleChildSelect(child)}>
                                                <ListItemIcon>
                                                    <ChildCare fontSize="small"/>
                                                </ListItemIcon>
                                                {child.name}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </div>

                                {/* Div with image and spans */}
                                <div className="flex flex-col items-center justify-center min-h-screen p-4">
                                    <div
                                        className="flex flex-col max-w-sm md:w-96 min-h-96 p-6 bg-blue-800 text-white rounded-2xl relative">
                                        <div className="text-center flex-1 pt-6 pb-2">
                                            <span className="font-light text-3xl block">Explore Courses</span>
                                            <span className="font-bold text-4xl">For Children</span>
                                            <div className="text-lg leading-7 mt-4 mb-6 px-6 text-center">
                                                Choose a course and start learning with our fun and interactive
                                                platform.
                                            </div>
                                        </div>
                                        <div className="relative flex-1 flex items-center justify-center">

                                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                                                <RightArrow/>
                                            </div>
                                            <img
                                                src="/coursesimages/girl.png"
                                                alt="girl image for promot pricing plan"
                                                className="w-3/4 h-auto"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Course list */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                            {courses.map((course) => (
                                <div
                                    key={course.id}
                                    className="flex flex-col max-w-sm p-6 bg-white rounded-2xl border border-gray-200 shadow-lg"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 rounded-full bg-blue-100">
                                            <svg
                                                className="w-6 h-6 text-blue-600"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                                />
                                            </svg>
                                        </div>
                                        <span className="text-2xl font-bold">{course.title}</span>
                                    </div>
                                    <span className="block text-center text-gray-500 mb-4">
        About Course
      </span>
                                    <div className="flex items-start gap-3 mb-4">
                                        <svg
                                            className="w-6 h-6 text-blue-600"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                        <span className="text-lg">{course.description}</span>
                                    </div>
                                    <div className="border border-dashed border-gray-300 my-4"/>
                                    <div className="mt-auto">
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6 text-green-500 mr-2"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                                <span className="text-2xl font-bold">Free</span>
                                            </div>
                                            <Link
                                                className="w-full text-center rounded-xl font-semibold text-xl px-4 py-3 bg-blue-800 text-white hover:bg-blue-700 transition-colors duration-200"
                                                href={`/courses/${course.id}`}
                                                onClick={() => handleCourseSelect(course.id)}
                                            >
                                                Start Course
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
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
const ChevronRightIcon = ({...props}) => (
    <svg
        {...props}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            d="M16.28 9.28a.75.75 0 00-.76-.85h-.05a.75.75 0 00-.65.76l-.75 9.48A.77.77 0 009.27 19l4.25-3.82a.78.78 0 01.82-.05.75.75 0 01-.67-.76l-.57-5.19h.31z"
        />
    </svg>
);

export default Courses;