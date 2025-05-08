'use client';
import React, { useState } from "react";
import { baseUrl } from "../constants";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const RegisterForm = ({ onToggle }) => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        location: '',
        shopName: '',
        documentVerificationNumber: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(`${baseUrl}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error("Registration failed");
            }
            await response.json();
            setIsLoading(false);
            setIsSuccess(true);
            setTimeout(() => navigate("/dashboard"), 1500);
        } catch (error) {
            setIsLoading(false);
            alert(error.message || "Something went wrong");
        }
    };

    return (
        <main className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 mx-auto">
            <div className="flex justify-center mb-6">
                <h2 className="text-black font-bold text-2xl">StyleSync</h2>
            </div>
            <h2 className="text-black font-semibold text-base mb-4">Register</h2>

            <button
                type="button"
                className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 mb-3 text-sm text-gray-700 hover:bg-gray-50 transition"
            >
                <img
                    src="https://img.icons8.com/color/512/google-logo.png"
                    alt="Google logo"
                    width={18}
                    height={18}
                />
                Register with Google
            </button>

            <div className="flex items-center mb-4">
                <hr className="border-gray-300 flex-grow" />
                <span className="text-gray-400 text-xs px-2">or</span>
                <hr className="border-gray-300 flex-grow" />
            </div>

            {isLoading ? (
                <div className="text-center py-6 text-blue-600 font-semibold text-sm">
                    <div className="animate-spin inline-block mr-2 border-2 border-blue-500 border-t-transparent rounded-full w-5 h-5"></div>
                    Signing up...
                </div>
            ) : isSuccess ? (
                <div className="text-center py-6 text-green-600 font-semibold flex flex-col items-center">
                    <FaCheckCircle size={40} className="mb-2" />
                    Successfully Registered!
                </div>
            ) : (
                <form onSubmit={step === 1 ? handleNext : handleSubmit}>
                    {step === 1 ? (
                        <>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 mb-4 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                                placeholder="John Doe"
                                required
                            />
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 mb-4 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                                placeholder="name@example.com"
                                required
                            />
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 mb-4 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white font-semibold rounded-md py-2 hover:bg-blue-700 transition"
                            >
                                Next
                            </button>
                        </>
                    ) : (
                        <>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <input
                                name="phone"
                                type="text"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 mb-4 text-sm"
                                placeholder="+91..."
                                required
                            />
                            <label className="block text-sm font-medium text-gray-700 mb-1">Shop name</label>
                            <input
                                name="shopName"
                                type="text"
                                value={formData.shopName}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 mb-4 text-sm"
                                placeholder="Your Shop Name"
                                required
                            />
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <input
                                name="location"
                                type="text"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 mb-4 text-sm"
                                placeholder="City, State"
                                required
                            />
                            <label className="block text-sm font-medium text-gray-700 mb-1">Govt. ID Number</label>
                            <input
                                name="documentVerificationNumber"
                                type="text"
                                value={formData.documentVerificationNumber}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 mb-4 text-sm"
                                placeholder="ID Number"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white font-semibold rounded-md py-2 hover:bg-blue-700 transition"
                            >
                                Create Account
                            </button>
                        </>
                    )}
                </form>
            )}

            <p className="text-sm text-gray-600 text-center mt-4">
                Already have an account?{" "}
                <button onClick={onToggle} className="text-blue-600 hover:underline">
                    Sign in
                </button>
            </p>
        </main>
    );
};

export default RegisterForm;
