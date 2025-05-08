import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

const Financial = () => {
    const navigate = useNavigate();

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [earningsList, setEarningsList] = useState([]);
    const [expensesList, setExpensesList] = useState([]);
    const [editEarningId, setEditEarningId] = useState(null);
    const [editExpenseId, setEditExpenseId] = useState(null);
    const [editedEarning, setEditedEarning] = useState({});
    const [editedExpense, setEditedExpense] = useState({});

    const dummyEarnings = [
        { id: 1, client: 'Ravi', service: 'Haircut', price: 150, payment: 'Cash', date: new Date() },
        { id: 2, client: 'Amit', service: 'Shave', price: 80, payment: 'UPI', date: new Date() },
        { id: 3, client: 'Suman', service: 'Facial', price: 250, payment: 'Cash', date: new Date('2025-05-05') },
        { id: 4, client: 'Karan', service: 'Haircut + Shave', price: 200, payment: 'UPI', date: new Date('2025-05-05') },
    ];

    const dummyExpenses = [
        { id: 1, item: 'Shampoo Bottle', cost: 100, payment: 'Cash', date: new Date() },
        { id: 2, item: 'Blade Pack', cost: 40, payment: 'UPI', date: new Date() },
        { id: 3, item: 'Facial Cream', cost: 120, payment: 'Cash', date: new Date('2025-05-05') },
    ];

    useEffect(() => {
        filterFinancialsByDateRange();
    }, [startDate, endDate]);

    const filterFinancialsByDateRange = () => {
        const filteredEarnings = dummyEarnings.filter(
            (entry) => entry.date >= startDate && entry.date <= endDate
        );
        const filteredExpenses = dummyExpenses.filter(
            (entry) => entry.date >= startDate && entry.date <= endDate
        );
        setEarningsList(filteredEarnings);
        setExpensesList(filteredExpenses);
    };

    const totalEarnings = earningsList.reduce((sum, e) => sum + e.price, 0);
    const totalExpenses = expensesList.reduce((sum, e) => sum + e.cost, 0);
    const profit = totalEarnings - totalExpenses;

    const handleDelete = (type, id) => {
        if (type === 'earning') {
            setEarningsList(prev => prev.filter(item => item.id !== id));
        } else {
            setExpensesList(prev => prev.filter(item => item.id !== id));
        }
    };

    const startEditEarning = (entry) => {
        setEditEarningId(entry.id);
        setEditedEarning({ ...entry });
    };

    const saveEditEarning = () => {
        setEarningsList(prev =>
            prev.map(item => (item.id === editEarningId ? editedEarning : item))
        );
        setEditEarningId(null);
    };

    const startEditExpense = (entry) => {
        setEditExpenseId(entry.id);
        setEditedExpense({ ...entry });
    };

    const saveEditExpense = () => {
        setExpensesList(prev =>
            prev.map(item => (item.id === editExpenseId ? editedExpense : item))
        );
        setEditExpenseId(null);
    };

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">📊 Financial Summary</h2>

            <button
                onClick={() => navigate('/dashboard')}
                className="mb-6 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            >
                Back
            </button>

            {/* Date Picker */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-6">
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="MMMM d, yyyy"
                    className="p-2 border border-gray-300 rounded w-full sm:w-64"
                />
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    dateFormat="MMMM d, yyyy"
                    className="p-2 border border-gray-300 rounded w-full sm:w-64"
                />
            </div>

            {/* Income Table */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Income</h3>
                <div className="w-full overflow-x-auto">
                    <table className="min-w-full table-auto border text-sm sm:text-base">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Service</th>
                                <th className="px-4 py-2 text-left">Price</th>
                                <th className="px-4 py-2 text-left">Payment</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {earningsList.map((entry) => (
                                <tr key={entry.id} className="border-t">
                                    <td className="px-4 py-2">
                                        {editEarningId === entry.id ? (
                                            <input
                                                type="text"
                                                value={editedEarning.client}
                                                onChange={(e) =>
                                                    setEditedEarning({ ...editedEarning, client: e.target.value })
                                                }
                                                className="border px-2 py-1 rounded w-full"
                                            />
                                        ) : (
                                            entry.client
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {editEarningId === entry.id ? (
                                            <input
                                                type="text"
                                                value={editedEarning.service}
                                                onChange={(e) =>
                                                    setEditedEarning({ ...editedEarning, service: e.target.value })
                                                }
                                                className="border px-2 py-1 rounded w-full"
                                            />
                                        ) : (
                                            entry.service
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {editEarningId === entry.id ? (
                                            <input
                                                type="number"
                                                value={editedEarning.price}
                                                onChange={(e) =>
                                                    setEditedEarning({ ...editedEarning, price: parseInt(e.target.value) })
                                                }
                                                className="border px-2 py-1 rounded w-full"
                                            />
                                        ) : (
                                            entry.price
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {editEarningId === entry.id ? (
                                            <input
                                                type="text"
                                                value={editedEarning.payment}
                                                onChange={(e) =>
                                                    setEditedEarning({ ...editedEarning, payment: e.target.value })
                                                }
                                                className="border px-2 py-1 rounded w-full"
                                            />
                                        ) : (
                                            entry.payment
                                        )}
                                    </td>
                                    <td className="px-4 py-2 space-x-2">
                                        {editEarningId === entry.id ? (
                                            <button className="text-green-600 hover:underline" onClick={saveEditEarning}>
                                                Save
                                            </button>
                                        ) : (
                                            <button className="text-blue-600 hover:underline" onClick={() => startEditEarning(entry)}>
                                                Edit
                                            </button>
                                        )}
                                        <button className="text-red-600 hover:underline" onClick={() => handleDelete('earning', entry.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="text-right font-medium mt-2">Total Income: ₹{totalEarnings}</div>
            </div>

            {/* Expense Table */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Expenses</h3>
                <div className="w-full overflow-x-auto">
                    <table className="min-w-full table-auto border text-sm sm:text-base">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left">Purchase</th>
                                <th className="px-4 py-2 text-left">Amount</th>
                                <th className="px-4 py-2 text-left">Payment</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expensesList.map((entry) => (
                                <tr key={entry.id} className="border-t">
                                    <td className="px-4 py-2">
                                        {editExpenseId === entry.id ? (
                                            <input
                                                type="text"
                                                value={editedExpense.item}
                                                onChange={(e) =>
                                                    setEditedExpense({ ...editedExpense, item: e.target.value })
                                                }
                                                className="border px-2 py-1 rounded w-full"
                                            />
                                        ) : (
                                            entry.item
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {editExpenseId === entry.id ? (
                                            <input
                                                type="number"
                                                value={editedExpense.cost}
                                                onChange={(e) =>
                                                    setEditedExpense({ ...editedExpense, cost: parseInt(e.target.value) })
                                                }
                                                className="border px-2 py-1 rounded w-full"
                                            />
                                        ) : (
                                            entry.cost
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {editExpenseId === entry.id ? (
                                            <input
                                                type="text"
                                                value={editedExpense.payment}
                                                onChange={(e) =>
                                                    setEditedExpense({ ...editedExpense, payment: e.target.value })
                                                }
                                                className="border px-2 py-1 rounded w-full"
                                            />
                                        ) : (
                                            entry.payment
                                        )}
                                    </td>
                                    <td className="px-4 py-2 space-x-2">
                                        {editExpenseId === entry.id ? (
                                            <button className="text-green-600 hover:underline" onClick={saveEditExpense}>
                                                Save
                                            </button>
                                        ) : (
                                            <button className="text-blue-600 hover:underline" onClick={() => startEditExpense(entry)}>
                                                Edit
                                            </button>
                                        )}
                                        <button className="text-red-600 hover:underline" onClick={() => handleDelete('expense', entry.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="text-right font-medium mt-2">Total Expenses: ₹{totalExpenses}</div>
            </div>

            {/* Net Profit */}
            <div className="text-right font-bold text-xl">
                Net Profit: ₹{profit}
            </div>
        </div>
    );
};

export default Financial;
