import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker'; // Make sure you have this installed
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker styles
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const UserList = () => {
    const [selectedDate, setSelectedDate] = useState(new Date()); // Default to today's date
    const [userList, setUserList] = useState([]);
    const navigate = useNavigate(); // Initialize navigate function

    useEffect(() => {
        // Simulate fetching user data for the selected date
        fetchUserData(selectedDate);
    }, [selectedDate]);

    const handleDateChange = (date) => {
        setSelectedDate(date); // Set the selected date
    };

    const fetchUserData = (date) => {
        // Simulate fetching user data based on selected date
        const dummyData = [
            { id: 1, service: 'Haircut', price: 500, date: new Date() },
            { id: 2, service: 'Shave', price: 200, date: new Date() },
            { id: 3, service: 'Haircut', price: 500, date: new Date() },
            { id: 4, service: 'Beard Trim', price: 300, date: new Date() },
        ];

        // Filter users based on the selected date (for simulation)
        const filteredData = dummyData.filter((user) => {
            return (
                user.date.toDateString() === date.toDateString() // Match the date exactly
            );
        });

        setUserList(filteredData);
    };

    const handleBackClick = () => {
        navigate('/dashboard'); // Navigate back to the dashboard
    };

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">User List</h2>

             {/* Back Button */}
             <button 
                onClick={handleBackClick}
                className="mb-4 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
            >
                Back
            </button>

            <div className="mb-6 flex justify-center">
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="MMMM d, yyyy"
                    className="p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-60"
                    calendarClassName="rounded-lg shadow-xl"
                    wrapperClassName="inline-block"
                />
            </div>
            {selectedDate && (
                <div>
                    <h3 className="text-2xl text-gray-800 text-center mb-4">
                        User List for {selectedDate.toDateString()}
                    </h3>
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-2 px-4 text-left text-sm text-gray-600">Customer</th>
                                <th className="py-2 px-4 text-left text-sm text-gray-600">Service</th>
                                <th className="py-2 px-4 text-left text-sm text-gray-600">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList.map((user, index) => (
                                <tr key={user.id} className="border-t hover:bg-gray-50">
                                    <td className="py-2 px-4 text-sm text-gray-800">Customer {index + 1}</td>
                                    <td className="py-2 px-4 text-sm text-gray-800">{user.service}</td>
                                    <td className="py-2 px-4 text-sm text-gray-800">{user.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-4 text-right font-semibold text-xl">
                        Total Price: {userList.reduce((total, user) => total + user.price, 0)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserList;
