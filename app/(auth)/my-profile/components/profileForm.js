"use client";

import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '@/app/providers/authProvider';


export default function ProfileForm({ token }) {
    const [user, setAuthUser] = useState({ name: '', email: '' });
    const [profile, setProfile] = useState('');
    const [loading, setLoading] = useState(false);
    const { setUser } = useContext(AuthContext);
    const notifySettings = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("/api/users", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                if (data && data.user) {
                    setAuthUser({id: data.user._id, name: data.user.name, email: data.user.email });
                }
            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        };

        fetchUser();
    }, []);

    const handleFormSubmission = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("id", user.id);
        formData.append("name", user.name);
        formData.append("email", user.email);
        formData.append("profile", profile);

        try {
            const res = await fetch("/api/update-profile", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (data.status == true) {
                toast.success(data.message, notifySettings);
                setUser(data.data);
            } else {
                toast.error(data.message, notifySettings);
            }
        } catch (err) {
            toast.error(err.message, notifySettings);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <form onSubmit={handleFormSubmission} className="max-w-sm mx-auto my-5" encType='multipart/form-data'>
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                    <input
                        type="text"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={user.name}
                        placeholder="John Doe"
                        onChange={(e) => setAuthUser({ ...user, name: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                    <input
                        type="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={user.email}
                        placeholder="name@example.com"
                        onChange={(e) => setAuthUser({ ...user, email: e.target.value })}
                        required
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Profile</label>
                    <input type="file" id="profile" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => setProfile(e.target.files[0])} accept='image/*' />
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" disabled={loading}>
                    {
                        loading ? (
                            <>
                                Please wait
                                <svg aria-hidden="true" role="status" className="inline w-4 h-4 ms-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg>
                            </>
                        ) : `Update Profile`
                    }
                </button>
            </form>
            <ToastContainer />
        </>
    );
}
