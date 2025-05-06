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

    return (
        <>
            <div className="bg-gray-100 flex justify-center items-start min-h-screen pt-4 sm:pt-12">
                <div className="bg-gray-100 rounded-md w-full max-w-sm p-4">
                    <h1 className="text-center font-extrabold text-2xl sm:text-3xl mb-2">
                        Hii User name
                    </h1>
                    <p className="text-center text-base sm:text-lg mb-8">
                        View &amp; manage your Shop
                    </p>

                    <button
                        onClick={handleExpense}
                        type="button"
                        className="w-full flex justify-between items-center bg-[#C2D4EF] rounded-lg py-4 px-6 mb-4 text-black font-semibold text-lg"
                    >
                        <span>Expenses</span>
                        <img
                            src="https://storage.googleapis.com/a1aa/image/e938a731-23ba-4c8e-8364-adaff48ea523.jpg"
                            alt="Expenses icon"
                            className="w-8 h-8"
                            width="32"
                            height="32"
                        />
                    </button>

                    <button
                        type="button"
                        className="w-full flex justify-between items-center bg-[#BBE8B6] rounded-lg py-4 px-6 mb-4 text-black font-semibold text-lg"
                    >
                        <span>Inventory</span>
                        <img
                            src="https://storage.googleapis.com/a1aa/image/5e2ca784-1437-4d36-bc22-d08da5bf384a.jpg"
                            alt="Inventory icon"
                            className="w-8 h-8"
                            width="32"
                            height="32"
                        />
                    </button>

                    <button
                        onClick={handleUserlist}
                        type="button"
                        className="w-full flex justify-between items-center bg-[#EEC1C2] rounded-lg py-4 px-6 text-black font-semibold text-lg"
                    >
                        <span>Customers</span>
                        <img
                            src="https://storage.googleapis.com/a1aa/image/615fd2b9-2644-4763-b6b2-48076538cce9.jpg"
                            alt="Customers icon"
                            className="w-8 h-8"
                            width="32"
                            height="32"
                        />
                    </button>

                    <button
                        onClick={handleAddService}
                        type="button"
                        aria-label="Add new item"
                        className="fixed bottom-6 right-6 bg-[#347C34] rounded-full w-16 h-16 flex justify-center items-center text-white text-4xl leading-none shadow-lg"
                    >
                        +
                    </button>
                </div>
            </div>
        </>
    )
}

export default Dashboard