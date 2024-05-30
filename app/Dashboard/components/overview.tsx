"use client"
import react, {useEffect} from "react";
import {useState} from "react";
import * as React from "react";
interface User {
    id: number;
    name: string | null; // Allow 'null' for 'fullName'
    email: string | null; // Allow 'null' for 'email'
    // Add other fields as needed
}


export default function Overview() {
    const [users, setUsers] = React.useState<User[]>([]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch('/api/courses')
            .then(response => response.json())
            .then(data => setCourses(data))
            .catch(error => console.error(error));
    }, []);
    React.useEffect(() => {
        const getUsers = async () => {
            const response = await fetch('/api/getusers', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const usersFromDb = await response.json();
            setUsers(usersFromDb);
        };

        getUsers();
    }, []);

    return(


        <>
            <main className="flex-1 overflow-hidden transition-all duration-200">

                <div className="mt-4 flex justify-between px-4 text-slate-500 md:px-10">
                    <h2 className="text-xl font-medium md:pl-0 my-2">Overview</h2>
                </div>

                <div className="m-4 grid grid-cols-1 gap-4 md:m-10 md:grid-cols-2 lg:grid-cols-3">

                    <div
                        className="flex h-48 items-center justify-between overflow-hidden rounded-xl bg-white px-4 py-4 shadow-sm">
                        <div>
                            <h3 className="mb-1 text-xl font-medium text-gray-600">Total Users</h3>
                            <p className="text-base text-gray-400">
                                {new Date().toLocaleString('default', {month: 'long'})} {new Date().getFullYear()}
                            </p>
                            {users.length > 0 ? (
                                <p className="text-2xl font-medium text-gray-500">{users.length}</p>
                            ) : (
                                <p className="text-2xl font-medium text-gray-500">Loading ...</p>
                            )}
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-200" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"
                                      d="M12 11c-3.866 0-7 3.134-7 7 0 1.105.895 2 2 2h10c1.105 0 2-.895 2-2 0-3.866-3.134-7-7-7zm0-3c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z"/>
                            </svg>
                        </div>
                    </div>
                    <div
                        className="flex h-48 items-center justify-between overflow-hidden rounded-xl bg-white px-4 py-4 shadow-sm">
                        <div>
                            <h3 className="mb-1 text-xl font-medium text-gray-600">Total courses</h3>
                            <p className="text-base text-gray-400">
                                {new Date().toLocaleString('default', {month: 'long'})} {new Date().getFullYear()}
                            </p>
                            {courses.length > 0 ? (
                                <p className="text-2xl font-medium text-gray-500">{courses.length}</p>
                            ) : (
                                <p className="text-2xl font-medium text-gray-500">Loading ...</p>
                            )}
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-200" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"
                                      d="M17 9V7a2 2 0 00-2-2h-2a2 2 0 00-2 2v2M7 9V7a2 2 0 00-2-2H3a2 2 0 00-2 2v2m2 10v-2a2 2 0 00-2-2H1a2 2 0 00-2 2v2m20-8V7a2 2 0 00-2-2h-2a2 2 0 00-2 2v2m0 0v10m0-10H3v10m2-8h10m-4 4v-4m0 4h4m0 0v4m0-4H3"/>
                            </svg>
                        </div>
                    </div>
                    <div
                        className="flex h-48 items-center justify-between overflow-hidden rounded-xl bg-white px-4 py-4 shadow-sm">
                        <div>
                            <h3 className="mb-1 text-xl font-medium text-gray-600">Pending courses</h3>
                            <p className="text-base text-gray-400">
                                {new Date().toLocaleString('default', {month: 'long'})} {new Date().getFullYear()}
                            </p>
                            <p className="text-2xl font-medium text-gray-500">10</p>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-200" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"
                                      d="M13 16V8M11 16V8m4 4H7"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )

}