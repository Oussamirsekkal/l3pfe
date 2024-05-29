"use client"
import Overview from "@/app/Dashboard/components/overview";
import Users from "@/app/Dashboard/components/users";
import ManageCourses from "@/app/Dashboard/components/managecourses";
import Settings from "@/app/Dashboard/components/settings";
import Security from "@/app/Dashboard/components/security";
import {useEffect, useState} from "react";
import { FaUsers } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import { FaCog } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Dashboard() {
const [activesection,setactivesection] = useState("overview");
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [courses, setCourses] = useState([]);
    {}
    useEffect(() => {
        fetch('/api/courses')
            .then(response => response.json())
            .then(data => setCourses(data))
            .catch(error => console.error(error));
    }, []);
    return (

        <>
            <div className="bg-slate-200 flex h-auto">

                <aside className="relative z-50 md:relative">
                    <input type="checkbox" className="peer hidden" id="sidebar-open"/>
                    <label htmlFor="sidebar-open"
                           className="peer-checked:rounded-full peer-checked:p-2 peer-checked:right-6 peer-checked:bg-gray-600 peer-checked:text-white absolute top-0 z-20 mx-4 cursor-pointer md:hidden"
                           onClick={() => setSidebarOpen(!isSidebarOpen)}>
                        {isSidebarOpen ? <FaTimes className="h-4 w-4"/> : <FaBars className="h-4 w-4"/>}
                    </label>
                    <nav aria-label="Sidebar Navigation"
                         className="peer-checked:w-64 left-0 z-10 flex h-auto w-0 flex-col overflow-hidden bg-black text-white transition-all md:h-auto md:w-64 lg:w-72">
                        <div className="bg-slate-800 mt-5 py-4 pl-10 md:mt-10">
        <span className="inline-flex items-center">
        <span className="text-2xl font-bold">Kid<span className="text-blue-600">Code</span></span>
        </span>
                        </div>
                        <ul className="mt-8 space-y-3 md:mt-20">
                            <li className="relative">
                                <button
                                    onClick={() => setactivesection("overview")}
                                    className="focus:bg-slate-600 hover:bg-slate-600 flex w-full space-x-2 rounded-md px-10 py-4 text-gray-300 focus:outline-none">
        <span>
            <FaRegEye className="h-6 w-6"/>
        </span>
                                    <span>Overview</span>
                                </button>
                            </li>
                            <li className="relative">
                                <button
                                    onClick={() => setactivesection("users")}
                                    className="focus:bg-slate-600 hover:bg-slate-600 flex w-full space-x-2 rounded-md px-10 py-4 font-semibold focus:outline-none">
        <span>
            <FaUsers className="h-6 w-6"/>
        </span>
                                    <span>Users</span>
                                </button>
                            </li>
                            <li className="relative">
                                <button
                                    onClick={() => setactivesection("managecourses")}
                                    className="focus:bg-slate-600 hover:bg-slate-600 flex w-full space-x-2 rounded-md px-10 py-4 text-gray-300 focus:outline-none">
        <span>
            <FaBookOpen className="h-6 w-6"/>
        </span>
                                    <span>Manage Courses</span>
                                </button>
                            </li>

                            <li className="relative">
                                <button
                                    onClick={() => setactivesection("settings")}
                                    className="focus:bg-slate-600 hover:bg-slate-600 flex w-full space-x-2 rounded-md px-10 py-4 text-gray-300 focus:outline-none">
        <span>
            <FaCog className="h-6 w-6"/>
        </span>
                                    <span>Settings</span>
                                </button>
                            </li>
                            <li className="relative">
                                <button
                                    onClick={() => setactivesection("security")}
                                    className="focus:bg-slate-600 hover:bg-slate-600 flex w-full space-x-2 rounded-md px-10 py-4 text-gray-300 focus:outline-none">
        <span>
            <FaShieldAlt className="h-6 w-6"/>
        </span>
                                    <span>Security</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </aside>
                {activesection === "overview" && <Overview/>}
                {activesection === "users" && <Users/>}
                {activesection === "managecourses" && <ManageCourses courses={courses} />}
                {activesection === "settings" && <Settings/>}
                {activesection === "security" && <Security/>}


            </div>
        </>

    );

}