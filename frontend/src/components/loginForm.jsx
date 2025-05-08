'use client';
import React, { useState } from "react";
import { baseUrl } from "../constants";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

const LoginForm = ({ onToggle }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);

        try {
            const response = await fetch(`${baseUrl}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Network response was not ok");

            const data = await response.json();
            console.log('Login successful:', data);

            setSuccess(true);
            setTimeout(() => {
                navigate("/dashboard");
            }, 1500); // Redirect after showing success for 1.5s

        } catch (error) {
            alert("Invalid credentials!");
            console.error('Login failed:', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="bg-white rounded-lg max-w-sm w-full p-6 relative">
            {(loading || success) && (
                <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center rounded-lg z-10">
                    {loading && (
                        <>
                            <ImSpinner2 className="animate-spin text-blue-600 text-3xl mb-2" />
                            <p className="text-gray-700 font-semibold">Logging in...</p>
                        </>
                    )}
                    {success && (
                        <>
                            <FaCheckCircle className="text-green-600 text-4xl mb-2" />
                            <p className="text-green-700 font-semibold">Successfully logged in!</p>
                        </>
                    )}
                </div>
            )}

            <div className="flex justify-center mb-6">
                <h2 className="text-black font-bold text-2xl">StyleSync</h2>
            </div>

            <h2 className="text-black font-semibold text-xl mb-4">Login</h2>

            <button
                type="button"
                className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 mb-3 text-sm text-gray-700 hover:bg-gray-50"
            >
                <img
                    src="https://img.icons8.com/color/512/google-logo.png"
                    alt="Google logo"
                    width={18}
                    height={18}
                />
                Login with Google
            </button>

            <div className="flex items-center mb-4">
                <hr className="border-gray-300 flex-grow" />
                <span className="text-gray-400 text-xs px-2">or</span>
                <hr className="border-gray-300 flex-grow" />
            </div>

            <form onSubmit={handleSubmit}>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Email</label>
                <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-md py-2 px-3 mb-4 text-sm"
                    placeholder="name@example.com"
                    required
                />

                <label className="block text-sm font-semibold text-gray-900 mb-1">Password</label>
                <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-md py-2 px-3 mb-4 text-sm"
                    placeholder="••••••••"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white text-sm font-semibold rounded-md py-2 hover:bg-blue-700"
                >
                    Log In
                </button>
            </form>

            <p className="text-sm text-gray-600 text-center mt-4">
                Don't have an account?{" "}
                <button onClick={onToggle} className="text-blue-600 hover:underline">
                    Create one
                </button>
            </p>
        </main>
    );
};

export default LoginForm;
