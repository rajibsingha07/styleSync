import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../constants";
import { FaCheckCircle } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

function AddCustomer() {
    const navigate = useNavigate();
    const [selectedServices, setSelectedServices] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [availableServices, setAvailableServices] = useState(null);
    const [gender, setGender] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChangeService = (e) => {
        const selectedServiceId = e.target.value;
        let updatedSelectedServices = [...selectedServices];

        if (updatedSelectedServices.includes(selectedServiceId)) {
            updatedSelectedServices = updatedSelectedServices.filter(id => id !== selectedServiceId);
        } else {
            updatedSelectedServices.push(selectedServiceId);
        }

        setSelectedServices(updatedSelectedServices);

        let newTotalPrice = 0;
        updatedSelectedServices.forEach((id) => {
            const service = availableServices.find((s) => s.id === id);
            newTotalPrice += service?.price || 0;
        });

        setTotalPrice(newTotalPrice);
    };

    const fetchAvailableServices = async () => {
        try {
            const response = await fetch(`${baseUrl}/service/all`, {
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.json();
            setAvailableServices(data.services);
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };

    const handleGenderChange = (selectedGender) => {
        setGender(selectedGender);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const response = await fetch(`${baseUrl}/customer/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                gender: gender,
                services: selectedServices,
                total_price: totalPrice,
            }),
        });

        if (!response.ok) {
            console.error("Failed to add customer");
            setIsSubmitting(false);
            return;
        }

        setSubmitted(true);
        setIsSubmitting(false);
        setTimeout(() => navigate("/userlist"), 1500);
    };

    const handleBackClick = () => {
        navigate("/dashboard");
    };

    useEffect(() => {
        fetchAvailableServices();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 flex justify-center items-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
                <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">Add New Customer</h1>

                <button
                    onClick={handleBackClick}
                    className="mb-4 text-sm text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md"
                >
                    Back
                </button>

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Services
                        </label>
                        {availableServices === null ? (
                            <div className="flex justify-center items-center text-indigo-500">
                                <ImSpinner2 className="animate-spin text-2xl" />
                                <span className="ml-2">Loading Services...</span>
                            </div>
                        ) : (
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                                {availableServices.map((service) => (
                                    <label
                                        key={service.id}
                                        className="flex items-center space-x-3 p-2 rounded-md border hover:bg-indigo-50 transition"
                                    >
                                        <input
                                            type="checkbox"
                                            value={service.id}
                                            onChange={handleChangeService}
                                            className="accent-indigo-600"
                                        />
                                        <span className="text-sm text-gray-800">
                                            {service.serviceName} - ₹{service.price}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Gender
                        </label>
                        <div className="flex gap-6">
                            {["Male", "Female"].map((g) => (
                                <label key={g} className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="gender"
                                        checked={gender === g}
                                        onChange={() => handleGenderChange(g)}
                                        className="accent-pink-500"
                                    />
                                    <span className="text-gray-700">{g}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="totalPrice" className="block text-sm font-medium text-gray-700 mb-2">
                            Total Price
                        </label>
                        <input
                            type="number"
                            id="totalPrice"
                            value={totalPrice}
                            onChange={(e) => setTotalPrice(Number(e.target.value))}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || submitted}
                        className={`w-full py-2 text-white rounded-md font-semibold transition ${
                            isSubmitting || submitted
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-indigo-600 hover:bg-indigo-700"
                        }`}
                    >
                        {isSubmitting ? (
                            <span className="flex justify-center items-center">
                                <ImSpinner2 className="animate-spin mr-2" />
                                Adding...
                            </span>
                        ) : submitted ? (
                            <span className="flex justify-center items-center text-green-600">
                                <FaCheckCircle className="mr-2" />
                                Successfully added!
                            </span>
                        ) : (
                            "Add Customer"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddCustomer;
