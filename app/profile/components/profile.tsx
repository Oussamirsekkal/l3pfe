"use client"
import React, { useEffect, useRef,useState } from 'react';
import {useRouter} from "next/navigation";
import {FaServer, FaPlusCircle, FaEye, FaCheck, FaSave, FaChevronDown} from 'react-icons/fa';
import { FaChild, FaUsers, FaArrowRight } from 'react-icons/fa';
import AddChild from "@/app/profile/components/addchild";
import Managechildren from "@/app/profile/components/managechildren";
import toast from 'react-hot-toast';
interface Child {
    id: number;
    name: string;
    age: number;
}


interface ProfileProps {
    email : any ;
    id : any ;
}

 const Profile: React.FC<ProfileProps> = ({email,id}) =>
{
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelection = (section:string) => {
        setactivesection(section);
        setIsOpen(false);
    };
    const [activesection ,setactivesection] = useState("profile");
    const router = useRouter();
    const [childaction,setchildaction] = useState("add");
    const [receiveEmail, setReceiveEmail] = useState(true);

    const [showAddChild, setShowAddChild] = useState(false);
    const [showManageChild, setShowManageChild] = useState(false);

    const [children, setChildren] = React.useState<Child[]>([]);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    async function fetchChildrenData() {
        const response = await fetch('/api/children', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: id }),
        });

        if (!response.ok) {
            throw new Error('Error fetching children data');
        }

        const data = await response.json();
        return data.children;
    }
    React.useEffect(() => {
        fetchChildrenData().then(setChildren);
    }, []);
    const handlePasswordChange = async (event: React.FormEvent) => {
        event.preventDefault();

        // Check if the old password and the new password are not empty
        if (!oldPassword || !newPassword) {
            console.error('Old password and new password cannot be empty');
            return;
        }

        const response = await fetch('/api/update-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, oldPassword, newPassword }), // Include the email in the request body
        });

        const data = await response.json();

        if (data.success) {
            // Password updated successfully
            // Clear the form
            setOldPassword('');
            setNewPassword('');
            toast.success('Password updated successfully');
        } else {
            // Handle error
            console.error(data.message);
            toast.error('Error while updating password');
        }
    };
    // In Profile component
// In Profile component
     useEffect(() => {
         fetch('/api/children', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify({ userId: id }),
         })
             .then(response => response.json())
             .then(data => setChildren(data.children)) // Access the children property of the response data
             .catch(error => console.error(error));
     }, [id]); // add id as a dependency
    const childrenArray = Object.values(children);// add id as a dependency; // add dependencies if any// add dependencies if any
    const handleProceedClick = () => {
        if(childaction === "manage") {setShowManageChild(true);}
        if(childaction === "add"){   setShowAddChild(true);}

    };

    const handleCancelClick = () => {
        if(childaction === "manage") {setShowManageChild(false);}
        if(childaction === "add"){   setShowAddChild(false);}
    };
    const handleCheckboxChange = () => {
        setReceiveEmail(!receiveEmail);
    };

    const handleSave = () => {
        // Handle saving preferences
    };
    return (
        <div className="mx-4 min-h-auto max-w-auto-xl sm:mx-6 xl:mx-auto">
            <h1 className="border-b py-6 text-4xl font-semibold">Settings</h1>
            <div className="relative my-4 md:block lg:hidden">
                <div
                    className="flex items-center w-full cursor-pointer select-none rounded-lg border p-4 text-base text-gray-700 bg-white ring-blue-700"
                    onClick={toggleDropdown}
                >
                    <span className="flex-grow">{activesection}</span>
                    <FaChevronDown
                        className={`ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                </div>
                {isOpen && (
                    <ul className="absolute left-0 right-0 mt-2 overflow-hidden rounded-lg bg-white shadow-md">
                        <li
                            className="cursor-pointer px-4 py-3 text-base text-gray-600 hover:bg-blue-700 hover:text-white"
                            onClick={() => handleSelection("profile")}
                        >
                            Profile
                        </li>
                        <li
                            className="cursor-pointer px-4 py-3 text-base text-gray-600 hover:bg-blue-700 hover:text-white"
                            onClick={() => handleSelection("children")}
                        >
                            Your children
                        </li>
                        <li
                            className="cursor-pointer px-4 py-3 text-base text-gray-600 hover:bg-blue-700 hover:text-white"
                            onClick={() => handleSelection("notifications")}
                        >
                            Notifications
                        </li>
                    </ul>
                )}
            </div>
            <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">


                <div className="col-span-2 hidden sm:block">
                    <ul>
                        <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700"
                            onClick={() => {
                                setactivesection("profile")
                            }}>Profile
                        </li>
                        <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700"
                            onClick={() => {
                                setactivesection("children")
                            }}>Your children
                        </li>
                        <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700"
                            onClick={() => {
                                setactivesection("notifications")
                            }}>Notifications
                        </li>
                    </ul>
                </div>

                {activesection === "profile" && (
                    <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
                        <div className="pt-4">
                            <h1 className="py-2 text-2xl font-semibold">Account settings</h1>
                        </div>
                        <hr className="mt-4 mb-8"/>
                        <p className="py-2 text-xl font-semibold">Email Address</p>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-gray-600">Your email address is <strong>{email}</strong></p>
                            <button
                                className="inline-flex text-sm font-semibold text-blue-600 underline decoration-2">Change
                            </button>
                        </div>
                        <hr className="mt-4 mb-8"/>
                        <p className="py-2 text-xl font-semibold">Password</p>
                        <div className="flex items-center">
                            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                                <label>
                                    <span className="text-sm text-gray-500">Current Password</span>
                                    <div
                                        className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                                        <input type="password" id="login-password"
                                               className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                                               placeholder="***********"
                                               value={oldPassword}
                                               onChange={(e) => setOldPassword(e.target.value)}
                                        />
                                    </div>
                                </label>
                                <label>
                                    <span className="text-sm text-gray-500">New Password</span>
                                    <div
                                        className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                                        <input type="password" id="login-password"
                                               className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                                               placeholder="***********"
                                               value={newPassword}
                                               onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </div>
                                </label>


                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 className="mt-5 ml-2 h-6 w-6 cursor-pointer text-sm font-semibold text-gray-600 underline decoration-2"
                                 fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                            </svg>
                        </div>
                        <p className="mt-2">Can&apos;t remember your current password. <a
                            className="text-sm font-semibold text-blue-600 underline decoration-2" href="#">Recover
                            Account</a></p>
                        <button type="submit" onClick={handlePasswordChange}
                                className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white">Save Password
                        </button>
                        <hr className="mt-4 mb-8"/>


                    </div>)}

                {activesection === "children" && (
                    <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
                        <div className="pt-4">
                            <h1 className="py-2 text-2xl font-semibold">Children settings</h1>
                        </div>
                        <hr className="mt-2 mb-0"/>
                        <div className="py-20 text-gray-700 mt-0 ">
                            <div className="flex flex-col lg:flex-row items-center justify-between mb-8">
                                <button
                                    className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                    onClick={handleProceedClick}
                                >
                                    <FaArrowRight className="mr-2"/>
                                    Proceed
                                </button>
                                {showAddChild && <AddChild onCancel={handleCancelClick} userId={id} setChildren={setChildren}/>}
                                {showManageChild && <Managechildren onCancel={handleCancelClick} childs={children} setChildren={setChildren}/>}
                            </div>
                            <form className="flex flex-col lg:flex-row gap-8 lg:space-x-8 items-center">
                                <div className="relative w-full lg:w-96 h-32">
                                    <input className="peer hidden" id="radio_1" type="radio" name="radio"
                                           onClick={() => {
                                               setchildaction("add")
                                           }} defaultChecked/>
                                    <label
                                        className="peer-checked:border-2 peer-checked:border-blue-400 peer-checked:bg-blue-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4 pr-16"
                                        htmlFor="radio_1">
                                        <FaChild className="text-blue-500 text-2xl mr-4"/>
                                        <div>
                                            <span className="mt-2 font-semibold">Add a Child</span>
                                        </div>
                                    </label>
                                </div>
                                <div className="relative w-full lg:w-96 h-32">
                                    <input className="peer hidden" id="radio_2" type="radio" name="radio"
                                           onClick={() => {
                                               setchildaction("manage")
                                           }}/>
                                    <label
                                        className="peer-checked:border-2 peer-checked:border-blue-400 peer-checked:bg-blue-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4 pr-16"
                                        htmlFor="radio_2">
                                        <FaUsers className="text-blue-500 text-2xl mr-4"/>
                                        <div>
                                            <span className="mt-2 font-semibold">Manage Children</span>
                                        </div>
                                    </label>
                                </div>
                            </form>
                        </div>


                    </div>

                )}
                {activesection === "notifications" && (
                    <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
                        <div className="pt-4">
                            <h1 className="py-2 text-2xl font-semibold">Notifications</h1>
                        </div>
                        <hr className="mt-4 mb-8"/>
                        <p className="py-2 text-xl font-semibold">Email Address</p>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-gray-600">Your email address is <strong>{email}</strong></p>
                            <button
                                className="inline-flex text-sm font-semibold text-blue-600 underline decoration-2">Change
                            </button>
                        </div>
                        <div className="flex items-center mt-6">
                            <label htmlFor="receiveEmail" className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    id="receiveEmail"
                                    className="sr-only"
                                    checked={receiveEmail}
                                    onChange={handleCheckboxChange}
                                />
                                <div className="relative w-5 h-5 border rounded-md border-gray-300 mr-2 flex-shrink-0">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        {receiveEmail && <FaCheck className="text-blue-500"/>}
                                    </div>
                                </div>
                                <div className="text-sm">Receive email from our newsletter and latest updates</div>
                            </label>
                        </div>
                        <button
                            className="mt-4 inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            onClick={handleSave}>
                            <FaSave className="mr-2"/>
                            Save
                        </button>
                    </div>)}

            </div>
        </div>


    );


 }
export default Profile;