import * as React from 'react';
import {FaTimes} from "react-icons/fa";
import toast from "react-hot-toast";

interface User {
    id: number;
    name: string | null; // Allow 'null' for 'fullName'
    email: string | null; // Allow 'null' for 'email'
    // Add other fields as needed
}

interface EditUserFormProps {
    user: User;
    onUpdate: (updatedUser: User) => void;
    onCancel: () => void; // Add this line
}

const EditUserForm: React.FC<EditUserFormProps> = ({ user, onUpdate,onCancel }) => {
    const [name, setName] = React.useState(user.name || '');
    const [email, setEmail] = React.useState(user.email || '');
    const [newPassword, setNewPassword] = React.useState('');
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const updatedUser = { ...user, name, email };

        try {
            const response = await fetch('/api/updateuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
            });

            if (!response.ok) {
                throw new Error('Error updating user');
            }

            const updatedUserFromServer = await response.json();

            // Call the onUpdate function with the updated user from the server
            onUpdate(updatedUserFromServer);
            toast.success('User updated successfully')
        } catch (error) {
            toast.error('Failed to update user');
            console.error('Failed to update user:', error);
        }
    };
    const handlePasswordChange = async () => {
        try {
            const response = await fetch('/api/update-password-admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: user.email, newPassword }),
            });

            if (!response.ok) {
                throw new Error('Error changing password');
            }

            toast.success('Password changed successfully');
        } catch (error) {
            toast.error('Failed to change password');
            console.error('Failed to change password:', error);
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
                            <span className="font-semibold text-blue-600 md:inline">Edit User</span>
                        </div>

                        <div className="flex w-full flex-col">
                            <h1 className="text-2xl font-semibold">Edit User</h1>
                            <p className="mt-2 text-gray-500">Please fill out the information below:</p>
                            <div className="mt-4 grid items-center gap-3 gap-y-5 sm:grid-cols-4">
                                <div className="col-span-2 flex flex-col">
                                    <label className="mb-1 ml-3 font-semibold text-gray-500"
                                           htmlFor="userName">User&apos;s
                                        Name</label>
                                    <input className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
                                           id="userName" type="text"
                                           value={name}
                                           onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col sm:col-span-3 ">
                                    <label className="mb-1 ml-3 font-semibold text-gray-500"
                                           htmlFor="userEmail">User&apos;s
                                        Email</label>
                                    <input className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
                                           id="userEmail" type="text"
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col sm:col-span-3 ">
                                    <label className="mb-1 ml-3 font-semibold text-gray-500"
                                           htmlFor="newPassword">New Password</label>
                                    <input className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
                                           id="newPassword" type="password"
                                           value={newPassword}
                                           onChange={(e) => setNewPassword(e.target.value)}
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
                                    onClick={handleSubmit}>Update User
                                </button>
                                <button
                                    className="group my-2 flex w-full items-center justify-center rounded-lg bg-green-700 py-2 text-center font-bold text-white outline-none transition sm:order-1 sm:w-40 focus:ring"
                                    onClick={handlePasswordChange}>Change Password
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
export default EditUserForm;