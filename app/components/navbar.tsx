"use client"
import {useRouter} from "next/navigation";
import jwtDecode from "jsonwebtoken";
import {FaUser, FaSearch} from "react-icons/fa";
import {useState} from "react";

interface NavbarProps {
    isLoggedIn: boolean;
    isAdmin?: boolean;
    name?: string;
}

export default function Navbar({ isLoggedIn,isAdmin,name}: NavbarProps) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');


    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Redirect to the search results page
        router.push(`/search?query=${searchTerm}`);
    };
    const signOut = async () => {
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Logout failed');
            }

            router.push('/login');
            router.refresh();

        } catch (error) {
            console.error('An error occurred:', error);

        }
    };

    const handleLogin = () => {
        router.push('/login');
        router.refresh();
    };

    return (
        <div className="shadow mb-2">
            <div
                className="relative flex max-w-auto-xl flex-col overflow-hidden px-4 py-4 md:mx-auto md:flex-row md:items-center">
                <a href="/" className="flex items-center whitespace-nowrap text-2xl font-black">
      <span className="mr-2 text-4xl text-blue-600">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em"
             preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor"
                                                                           d="M6.925 16.875Q5.2 16.225 4.1 14.713Q3 13.2 3 11.25q0-1.975.938-3.513Q4.875 6.2 6 5.15q1.125-1.05 2.062-1.6L9 3v2.475q0 .625.45 1.062q.45.438 1.075.438q.35 0 .65-.15q.3-.15.5-.425L12 6q.95.55 1.625 1.35t1.025 1.8l-1.675 1.675q-.05-.6-.287-1.175q-.238-.575-.638-1.05q-.35.2-.738.287q-.387.088-.787.088q-1.1 0-1.987-.612Q7.65 7.75 7.25 6.725q-.95.925-1.6 2.062Q5 9.925 5 11.25q0 .775.275 1.462q.275.688.75 1.213q.05-.5.287-.938q.238-.437.588-.787L9 10.1l2.15 2.1q.05.05.1.125t.1.125l-1.425 1.425q-.05-.075-.087-.125q-.038-.05-.088-.1L9 12.925l-.7.7q-.125.125-.212.287q-.088.163-.088.363q0 .3.175.537q.175.238.45.363ZM9 10.1Zm0 0ZM7.4 22L6 20.6L19.6 7L21 8.4L17.4 12H21v2h-5.6l-.5.5l1.5 1.5H21v2h-2.6l2.1 2.1l-1.4 1.4l-2.1-2.1V22h-2v-4.6l-1.5-1.5l-.5.5V22h-2v-3.6Z"/></svg>
      </span>
                    <span className="text-2xl font-bold">Kid<span className="text-blue-600">Code</span></span>
                </a>
                <input type="checkbox" className="peer hidden" id="navbar-open"/>
                <label className="absolute top-5 right-7 cursor-pointer md:hidden" htmlFor="navbar-open">
                    <span className="sr-only">Toggle Navigation</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </label>
                <nav aria-label="Header Navigation"
                     className="peer-checked:mt-8 peer-checked:max-h-56 flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all md:ml-24 md:max-h-full md:flex-row md:items-start">
                    {/* Modern and responsive search bar */}
                    <div
                        className="mx-auto flex w-full max-w-md items-center rounded-full border border-gray-300 bg-white px-4 py-2 md:mx-0 md:mr-4 my-1">
                        <form onSubmit={handleSearchSubmit} className="flex w-full items-center">
                            <FaSearch className="text-gray-500" onClick={handleSearchSubmit}/>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="ml-2 w-full border-none bg-transparent outline-none"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </form>
                    </div>
                    <ul className="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0 md:ml-4">
                        {isAdmin && (
                            <li className="text-gray-600 md:mr-12 hover:text-blue-600 my-1"><a
                                href="/Dashboard">Dashboard</a></li>
                        )}
                        {isLoggedIn && !isAdmin && (
                            <li className="text-gray-600 md:mr-12 hover:text-blue-600 my-1"><a href="/profile">Profile</a>
                            </li>)}
                        {isLoggedIn && !isAdmin && (
                            <li className="text-gray-600 md:mr-12 hover:text-blue-600 my-1"><a href="/courses">Courses</a>
                            </li>)}
                        {!isAdmin && (
                            <li className="text-gray-600 md:mr-12 hover:text-blue-600 my-1"><a href="/benefits">Benefits</a>
                            </li>)}

                        {isLoggedIn && (
                            <li className="flex items-center text-gray-600 md:mr-12 hover:text-blue-600 my-1" >
                                <FaUser className="mr-2"/>
                                <span>{name}</span>
                            </li>
                        )}
                        <li className="text-gray-600 md:mr-12 hover:text-blue-600 my-1">
                            {isLoggedIn ? (
                                <button
                                    className="rounded-md border-2 border-blue-600 px-6 py-1 font-medium text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
                                    onClick={signOut}
                                >
                                    Logout
                                </button>
                            ) : (
                                <button
                                    className="rounded-md border-2 border-blue-600 px-6 py-1 font-medium text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
                                    onClick={handleLogin}
                                >
                                    Login
                                </button>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}