import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker'; // Make sure you have this installed
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker styles
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { baseUrl } from '../constants';

const UserList = () => {
    const [selectedDate, setSelectedDate] = useState(new Date()); // Default to today's date
    const [userList, setUserList] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null); // To store selected customer for the modal
    const [modalOpen, setModalOpen] = useState(false); // To manage modal visibility
    const navigate = useNavigate(); // Initialize navigate function

    useEffect(() => {
        // Simulate fetching user data for the selected date
        fetchUserData(selectedDate);
        console.log('Selected date:', selectedDate);
    }, [selectedDate]);

    const handleDateChange = (date) => {
        setSelectedDate(date); // Set the selected date
    };

    const fetchUserData = async (date) => {
        try {
            const response = await fetch(`${baseUrl}/customer/all`, {
                credentials: 'include',
            });
            const data = await response.json();

            if (data.message !== "Customers fetched successfully") {
                console.error("Error fetching customers:", data.message);
                return;
            }

            // Process the customers data
            const filteredData = data.customers.filter((customer) => {
                // Convert created_at to Date and compare with selectedDate
                const customerDate = new Date(customer.created_at);
                return customerDate.toDateString() === date.toDateString(); // Match the date exactly
            });

            // Map the filtered data to match your table format (gender, date, time, etc.)
            const mappedData = filteredData.map((customer, index) => {
                // Convert createdAt to readable date and time
                const createdAt = new Date(customer.created_at);
                const date = createdAt.toLocaleDateString();
                const time = createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                return {
                    id: customer.id,
                    gender: customer.Gender,
                    date,
                    time,
                };
            });

            setUserList(mappedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleBackClick = () => {
        navigate('/dashboard'); // Navigate back to the dashboard
    };

    const handleViewClick = async (id) => {
        // Fetch customer details on view click
        try {
            const response = await fetch(`${baseUrl}/customer/${id}`, {
                credentials: 'include',
            }
            );
            const data = await response.json();

            if (data.message !== "Customer fetched successfully") {
                console.error("Error fetching customer details:", data.message);
                return;
            }

            // Set the selected customer for modal
            const customerDetails = data.customer;
            const totalPrice = customerDetails.services.reduce((total, service) => total + service.price, 0);

            setSelectedCustomer({ ...customerDetails, totalPrice });
            setModalOpen(true); // Open the modal
        } catch (error) {
            console.error("Error fetching customer details:", error);
        }
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedCustomer(null);
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
                    <div className="overflow-x-auto max-h-[400px]"> {/* Add scroll and max height */}
    <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
            <tr>
                <th className="py-2 px-4 text-left text-sm text-gray-600">Sl No.</th>
                <th className="py-2 px-4 text-left text-sm text-gray-600">Gender</th>
                <th className="py-2 px-4 text-left text-sm text-gray-600">Date</th>
                <th className="py-2 px-4 text-left text-sm text-gray-600">Time</th>
                <th className="py-2 px-4 text-left text-sm text-gray-600">Actions</th>
            </tr>
        </thead>
        <tbody>
            {userList.map((user, index) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                    <td className="py-2 px-4 text-sm text-gray-800">{index + 1}</td>
                    <td className="py-2 px-4 text-sm text-gray-800">{user.gender}</td>
                    <td className="py-2 px-4 text-sm text-gray-800">{user.date}</td>
                    <td className="py-2 px-4 text-sm text-gray-800">{user.time}</td>
                    <td className="py-2 px-4 text-sm text-gray-800">
                        <button
                            onClick={() => handleViewClick(user.id)}
                            className="text-indigo-500 hover:text-indigo-600"
                        >
                            View
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

                </div>
            )}

            {/* Modal */}
            {modalOpen && selectedCustomer && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-2xl font-bold text-gray-700 mb-4">Customer Details</h3>
                        <p><strong>Gender:</strong> {selectedCustomer.gender}</p>
                        <p><strong>Date:</strong> {new Date(selectedCustomer.createdAt).toLocaleDateString()}</p>
                        <p><strong>Time:</strong> {new Date(selectedCustomer.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>

                        <h4 className="mt-4 font-semibold text-gray-700">Services:</h4>
                        <ul>
                            {selectedCustomer.services.map((service, index) => (
                                <li key={service._id} className="text-gray-700">
                                    {service.serviceName} - ${service.price}
                                </li>
                            ))}
                        </ul>

                        <p className="mt-4 font-semibold text-xl">Total Price: ${selectedCustomer.totalPrice}</p>

                        <button
                            onClick={closeModal}
                            className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserList;
