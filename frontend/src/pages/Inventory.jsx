import React, { useState } from 'react';

const Inventory = () => {
    const [inventoryItems, setInventoryItems] = useState([]);
    const [newItem, setNewItem] = useState('');
    const [newAmount, setNewAmount] = useState('');
    const [newPrice, setNewPrice] = useState('');

    const handleAddItem = () => {
        if (!newItem || !newAmount || !newPrice) return;

        const newItemObject = {
            name: newItem,
            amount: parseFloat(newAmount),
            price: parseFloat(newPrice),
        };

        setInventoryItems([...inventoryItems, newItemObject]);
        setNewItem('');
        setNewAmount('');
        setNewPrice('');
    };

    const handleUpdateField = (index, field, value) => {
        const updatedItems = [...inventoryItems];
        updatedItems[index][field] = parseFloat(value);
        setInventoryItems(updatedItems);
    };

    const handleDeleteItem = (index) => {
        const updatedItems = inventoryItems.filter((_, i) => i !== index);
        setInventoryItems(updatedItems);
    };

    const totalCost = inventoryItems.reduce(
        (total, item) => total + item.price,
        0
    );

    const getRowColor = (amount) => {
        if (amount < 10) return 'bg-red-300';
        if (amount < 30) return 'bg-yellow-300';
        return '';
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">📦 Inventory Management</h2>

            <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                    type="text"
                    placeholder="Item name"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                />
                <input
                    type="number"
                    placeholder="Amount (%)"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                />
                <input
                    type="number"
                    placeholder="Price (₹)"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                />
                <button
                    onClick={handleAddItem}
                    className="sm:col-span-3 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    Add Item
                </button>
            </div>

            <table className="min-w-full table-auto border">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 px-4 text-left">Item</th>
                        <th className="py-2 px-4 text-left">Amount (%)</th>
                        <th className="py-2 px-4 text-left">Price (₹)</th>
                        <th className="py-2 px-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {inventoryItems.map((item, index) => (
                        <tr key={index} className={`${getRowColor(item.amount)} border-t`}>
                            <td className="py-2 px-4">{item.name}</td>
                            <td className="py-2 px-4">
                                <input
                                    type="number"
                                    value={item.amount}
                                    onChange={(e) =>
                                        handleUpdateField(index, 'amount', e.target.value)
                                    }
                                    className="w-20 p-1 border rounded"
                                />
                            </td>
                            <td className="py-2 px-4">
                                <input
                                    type="number"
                                    value={item.price}
                                    onChange={(e) =>
                                        handleUpdateField(index, 'price', e.target.value)
                                    }
                                    className="w-24 p-1 border rounded"
                                />
                            </td>
                            <td className="py-2 px-4">
                                <button
                                    onClick={() => handleDeleteItem(index)}
                                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-6 text-right text-xl font-semibold">
                Total Inventory Cost: ₹{totalCost.toFixed(2)}
            </div>
        </div>
    );
};

export default Inventory;
