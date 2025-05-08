import React from "react"
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    const handleExpense = () => {
        navigate("/expenses");
    };

    const handleUserlist = () => {
        navigate("/userlist");
    };

    const handleAddService = () => {
        // Navigate to Add Service Page
        navigate("/addservice");
    };
    const handleInventory = () => {
        // Navigate to Inventory Page
        navigate("/inventory");
    };

    return (
        <>
            <div className="bg-gradient-to-br from-gray-100 to-white flex justify-center items-start min-h-screen pt-6 sm:pt-12 px-4">
                <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
                    <div className="text-center">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-1">
                            👋 Hi, User Name
                        </h1>
                        <p className="text-gray-600 text-base sm:text-lg">
                            Manage your shop efficiently
                        </p>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={handleExpense}
                            type="button"
                            className="w-full flex items-center justify-between bg-gradient-to-r from-[#C2D4EF] to-[#A3BDE6] rounded-xl py-4 px-5 text-black font-medium text-lg shadow hover:shadow-md transition"
                        >
                            <span>💰 Financials</span>
                            <img
                                src="https://storage.googleapis.com/a1aa/image/e938a731-23ba-4c8e-8364-adaff48ea523.jpg"
                                alt="Expenses icon"
                                className="w-8 h-8"
                            />
                        </button>

                        <button
                            onClick={handleInventory}
                            type="button"
                            className="w-full flex items-center justify-between bg-gradient-to-r from-[#BBE8B6] to-[#A3E2A1] rounded-xl py-4 px-5 text-black font-medium text-lg shadow hover:shadow-md transition"
                        >
                            <span>📦 Inventory</span>
                            <img
                                src="https://storage.googleapis.com/a1aa/image/5e2ca784-1437-4d36-bc22-d08da5bf384a.jpg"
                                alt="Inventory icon"
                                className="w-8 h-8"
                            />
                        </button>

                        <button
                            onClick={handleUserlist}
                            type="button"
                            className="w-full flex items-center justify-between bg-gradient-to-r from-[#EEC1C2] to-[#E89E9F] rounded-xl py-4 px-5 text-black font-medium text-lg shadow hover:shadow-md transition"
                        >
                            <span>👥 Customers</span>
                            <img
                                src="https://storage.googleapis.com/a1aa/image/615fd2b9-2644-4763-b6b2-48076538cce9.jpg"
                                alt="Customers icon"
                                className="w-8 h-8"
                            />
                        </button>
                    </div>

                    <button
                        onClick={handleAddService}
                        type="button"
                        aria-label="Add new item"
                        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 bg-green-600 hover:bg-green-700 transition rounded-full w-16 h-16 flex justify-center items-center text-white text-4xl shadow-xl"
                    >
                        +
                    </button>
                </div>
            </div>

        </>
    )
}

export default Dashboard