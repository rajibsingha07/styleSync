import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../constants';

const UserList = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [userList, setUserList] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserData(selectedDate);
    }, [selectedDate]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const fetchUserData = async (date) => {
        try {
            setLoading(true);
            const response = await fetch(`${baseUrl}/customer/all`, {
                credentials: 'include',
            });

            if (response.status === 401) {
                if (confirm('Unauthorized! Please log in again.')) {
                    navigate("/auth");
                }
                setLoading(false);
                return;
            }

            const data = await response.json();

            if (data.message !== "Customers fetched successfully") {
                console.error("Error fetching customers:", data.message);
                setUserList([]);
                return;
            }

            const filteredData = data.customers.filter((customer) => {
                const customerDate = new Date(customer.created_at);
                return customerDate.toDateString() === date.toDateString();
            });

            const mappedData = filteredData.map((customer, index) => {
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
            setUserList([]);
        } finally {
            setLoading(false);
        }
    };

    const handleBackClick = () => {
        navigate('/dashboard');
    };

    const handleViewClick = async (id) => {
        try {
            const response = await fetch(`${baseUrl}/customer/${id}`, {
                credentials: 'include',
            });

            if (response.status === 401) {
                if (confirm('Unauthorized! Please log in again.')) {
                    navigate("/auth");
                }
                setLoading(false);
                return;
            }

            const data = await response.json();

            if (data.message !== "Customer fetched successfully") {
                console.error("Error fetching customer details:", data.message);
                return;
            }

            const customerDetails = data.customer;
            const totalPrice = customerDetails.services.reduce((total, service) => total + service.price, 0);

            setSelectedCustomer({ ...customerDetails, totalPrice });
            setModalOpen(true);
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

            <h3 className="text-2xl text-center text-gray-800 mb-4">
                User List for {selectedDate.toDateString()}
            </h3>

            {loading ? (
                <div className="flex flex-col items-center justify-center h-40 text-indigo-600">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mb-3"></div>
                    <p className="text-lg font-semibold">Loading users...</p>
                </div>
            ) : userList.length === 0 ? (
                <p className="text-center text-gray-500 text-lg mt-4">No user in this date. Try changing the date.</p>
            ) : (
                <div className="overflow-x-auto max-h-[400px]">
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
                                    <td className="py-2 px-4 text-sm text-indigo-600">
                                        <button
                                            onClick={() => handleViewClick(user.id)}
                                            className="hover:underline"
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {modalOpen && selectedCustomer && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6 sm:p-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-4 text-center">
                Customer Details
            </h3>

            <div className="space-y-2 text-gray-800">
                <p><span className="font-semibold">Gender:</span> {selectedCustomer.gender}</p>
                <p><span className="font-semibold">Date:</span> {new Date(selectedCustomer.createdAt).toLocaleDateString()}</p>
                <p><span className="font-semibold">Time:</span> {new Date(selectedCustomer.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>

            <div className="mt-6">
                <h4 className="text-lg font-semibold text-indigo-500 mb-2">Services Availed:</h4>
                <ul className="space-y-1 text-gray-700">
                    {selectedCustomer.services.map((service) => (
                        <li key={service._id} className="flex justify-between border-b py-1">
                            <span>{service.serviceName}</span>
                            <span className="text-right font-medium">₹{service.price}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-6 text-right">
                <p className="text-xl font-bold text-indigo-600">
                    Total: ₹{selectedCustomer.totalPrice}
                </p>
            </div>

            <button
                onClick={closeModal}
                className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
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
