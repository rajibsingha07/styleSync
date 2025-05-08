import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const predefinedServices = [
    { id: 1, name: "Haircut", price: 250 },
    { id: 2, name: "Shave", price: 150 },
    { id: 3, name: "Facial", price: 300 },
    { id: 4, name: "Hair Color", price: 500 },
];

function AddService() {
    const navigate = useNavigate();
    const [selectedServices, setSelectedServices] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [gender, setGender] = useState("");

    const handleChangeService = (e) => {
        const selectedServiceId = parseInt(e.target.value);
        let updatedSelectedServices = [...selectedServices];

        if (updatedSelectedServices.includes(selectedServiceId)) {
            updatedSelectedServices = updatedSelectedServices.filter(
                (id) => id !== selectedServiceId
            );
        } else {
            updatedSelectedServices.push(selectedServiceId);
        }

        setSelectedServices(updatedSelectedServices);

        let newTotalPrice = 0;
        updatedSelectedServices.forEach((id) => {
            const service = predefinedServices.find((s) => s.id === id);
            newTotalPrice += service.price;
        });

        setTotalPrice(newTotalPrice);
    };

    const handleGenderChange = (selectedGender) => {
        setGender(selectedGender);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Services Added:", selectedServices);
        console.log("Total Price:", totalPrice);
        console.log("Gender:", gender);
        navigate("/userlist");
    };

    const handleBackClick = () => {
        navigate("/dashboard");
    };

    return (
        <div className="bg-gray-100 flex justify-center items-center p-2">
            <div className="bg-white rounded-md w-full max-w-md p-4 shadow-md">
                <h1 className="text-center font-extrabold text-2xl sm:text-3xl mb-4">
                    Add New Service
                </h1>

                <button
                    onClick={handleBackClick}
                    className="mb-4 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
                >
                    Back
                </button>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Services
                        </label>
                        <div className="space-y-2">
                            {predefinedServices.map((service) => (
                                <div key={service.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        value={service.id}
                                        id={`service-${service.id}`}
                                        onChange={handleChangeService}
                                        className="mr-2"
                                    />
                                    <label htmlFor={`service-${service.id}`} className="text-sm text-gray-700">
                                        {service.name} - ₹{service.price}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Gender
                        </label>
                        <div className="flex items-center space-x-6">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={gender === "Male"}
                                    onChange={() => handleGenderChange("Male")}
                                />
                                <span>Male</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={gender === "Female"}
                                    onChange={() => handleGenderChange("Female")}
                                />
                                <span>Female</span>
                            </label>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="totalPrice" className="block text-sm font-medium text-gray-700 mb-2">
                            Total Price
                        </label>
                        <input
                            type="number"
                            id="totalPrice"
                            value={totalPrice}
                            onChange={(e) => setTotalPrice(Number(e.target.value))}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700"
                    >
                        Add Service
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddService;
