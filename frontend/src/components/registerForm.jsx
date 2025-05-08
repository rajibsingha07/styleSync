'use client';
import React, { useState } from "react";
import { baseUrl } from "../constants";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ onToggle }) => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
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
                throw new Error("Network response was not ok");
            }

            const data = await response.json();


            alert("Successfully registered!");
            // Handle successful login
            navigate("/dashboard");          
          } catch (error) {
            alert(error.message)
            console.error('Login failed:', error.response?.data || error.message);
          }
    };

    return (
        <main className="bg-white rounded-lg max-w-sm w-full p-6">
            <div className="flex justify-center mb-6">
                <h2 className="text-black font-bold text-2xl">StyleSync</h2>
            </div>
            <h2 className="text-black font-semibold text-base mb-4">Register</h2>

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
                Register with Google
            </button>

            <div className="flex items-center mb-4">
                <hr className="border-gray-300 flex-grow" />
                <span className="text-gray-400 text-xs px-2">or</span>
                <hr className="border-gray-300 flex-grow" />
            </div>

            <form onSubmit={step === 1 ? handleNext : handleSubmit}>
                {step === 1 ? (
                    <>
                        <label className="block text-s font-semibold text-gray-900 mb-1">
                            Name
                        </label>
                        <input
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-md py-2 px-3 mb-4 text-s"
                            placeholder="John Doe"
                            required
                        />
                        <label className="block text-s font-semibold text-gray-900 mb-1">
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-md py-2 px-3 mb-4 text-s"
                            placeholder="name@example.com"
                            required
                        />

                        <label className="block text-s font-semibold text-gray-900 mb-1">
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-md py-2 px-3 mb-4 text-s"
                            placeholder="••••••••"
                            required
                        />

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white text-m font-semibold rounded-md py-2 hover:bg-blue-700"
                        >
                            Next
                        </button>
                    </>
                ) : (
                    <>
                        <label className="block text-s font-semibold text-gray-900 mb-1">
                            Phone
                        </label>
                        <input
                            name="phone"
                            type="text"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-md py-2 px-3 mb-4 text-s"
                            placeholder="+91....."
                            required
                        />
                        <label className="block text-s font-semibold text-gray-900 mb-1">
                            Shop name
                        </label>
                        <input
                            name="shopName"
                            type="text"
                            value={formData.shopName}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-md py-2 px-3 mb-4 text-s"
                            placeholder="Your Shop Name"
                            required
                        />
                        <label className="block text-s font-semibold text-gray-900 mb-1">
                            Location
                        </label>
                        <input
                            name="location"
                            type="text"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-md py-2 px-3 mb-4 text-s"
                            placeholder="City, State"
                            required
                        />
                        <label className="block text-s font-semibold text-gray-900 mb-1">
                            Any Govt. Id number
                        </label>
                        <input
                            name="documentVerificationNumber"
                            type="text"
                            value={formData.documentVerificationNumber}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-md py-2 px-3 mb-4 text-s"
                            placeholder="City, State"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white text-m font-semibold rounded-md py-2 hover:bg-blue-700"
                        >
                            Create Account
                        </button>
                    </>
                )}
            </form>

            <p className="text-s text-gray-600 text-center mt-4">
                Already have an account?{" "}
                <button onClick={onToggle} className="text-blue-600 hover:underline">
                    Sign in
                </button>
            </p>
        </main>
    );
};

export default RegisterForm;
