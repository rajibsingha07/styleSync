import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

const Financial = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [earningsList, setEarningsList] = useState([]);
    const navigate = useNavigate();

    const dummyEarnings = [
        { id: 1, client: 'Ravi', service: 'Haircut', price: 150, date: new Date() },
        { id: 2, client: 'Amit', service: 'Shave', price: 80, date: new Date() },
        { id: 3, client: 'Suman', service: 'Facial', price: 250, date: new Date('2025-05-05') },
        { id: 4, client: 'Karan', service: 'Haircut + Shave', price: 200, date: new Date('2025-05-05') },
    ];

    useEffect(() => {
        filterEarningsByDate(selectedDate);
    }, [selectedDate]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const filterEarningsByDate = (date) => {
        const filtered = dummyEarnings.filter(
            (entry) => entry.date.toDateString() === date.toDateString()
        );
        setEarningsList(filtered);
    };

    const handleBackClick = () => {
        navigate('/dashboard');
    };

    const totalEarnings = earningsList.reduce((sum, e) => sum + e.price, 0);

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">📊 Financial Earnings</h2>

            {/* Back Button */}
            <button
                onClick={handleBackClick}
                className="mb-4 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
            >
                Back
            </button>

            {/* Date Picker */}
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

            {/* Earnings Table */}
            {selectedDate && (
                <div>
                    <h3 className="text-2xl text-gray-800 text-center mb-4">
                        Earnings for {selectedDate.toDateString()}
                    </h3>
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-2 px-4 text-left text-sm text-gray-600">Client</th>
                                <th className="py-2 px-4 text-left text-sm text-gray-600">Service</th>
                                <th className="py-2 px-4 text-left text-sm text-gray-600">Price (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {earningsList.map((entry) => (
                                <tr key={entry.id} className="border-t hover:bg-gray-50">
                                    <td className="py-2 px-4 text-sm text-gray-800">{entry.client}</td>
                                    <td className="py-2 px-4 text-sm text-gray-800">{entry.service}</td>
                                    <td className="py-2 px-4 text-sm text-gray-800">{entry.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-4 text-right font-semibold text-xl">
                        Total Earnings: ₹{totalEarnings}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Financial;
