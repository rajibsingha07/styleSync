import React, { useEffect, useState } from 'react';
import { baseUrl } from '../constants';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const Inventory = () => {
    const navigate = useNavigate()
    const [inventoryItems, setInventoryItems] = useState(null);
    const [newItem, setNewItem] = useState('');
    const [newAmount, setNewAmount] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [loading, setLoading] = useState(false);
    const [adding, setAdding] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editing, setEditing] = useState(false);

    const handleAddItem = async () => {
        if (!newItem || !newAmount || !newPrice) return;

        setAdding(true);

        const newItemObject = {
            productName: newItem,
            quantity: parseInt(newAmount),
            price: parseInt(newPrice),
        };

        const response = await fetch(`${baseUrl}/inventory/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify([newItemObject]),
        });

        if (response.status === 401) {
            console.error('Unauthorized! Please log in again.');
            navigate("/auth");
            setAdding(false);
            return;
            
        }

        if (!response.ok) {
            setAdding(false);
            return;
        }

        await handleFetchInventory();
        setNewItem('');
        setNewAmount('');
        setNewPrice('');
        setAdding(false);
    };

    const handleFetchInventory = async () => {
        setLoading(true);
        const response = await fetch(`${baseUrl}/inventory/all`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });


        if (response.status === 401) {
            if (confirm('Unauthorized! Please log in again.')) {
                navigate("/auth");
            }
            setLoading(false);
            return;
        }

        if (!response.ok) {
            setLoading(false);
            return;
        }

        const data = await response.json();
        setInventoryItems(data.inventories.products || []);
        setLoading(false);
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

    const handleEditItem = async (index) => {
        setEditing(true);
        setEditingIndex(index);

        const item = inventoryItems[index];

        const res = await fetch(`${baseUrl}/inventory/edit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                productName: item.productName,
                quantity: item.quantity,
                price: item.price,
            }),
        });

        if (!res.ok) {
            console.error('Failed to edit item');
            setEditing(false);
            setEditingIndex(null);
            return;
        }

        await handleFetchInventory();
        setEditing(false);
        setEditingIndex(null);
    };

    useEffect(() => {
        handleFetchInventory();
    }, []);

    const totalCost = inventoryItems?.reduce((total, item) => total + item.price * item.quantity, 0) || 0;

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-xl rounded-xl">
            <button
        className="flex items-center gap-2 text-blue-600 mb-4"
        onClick={() => navigate("/dashboard")}
      >
        <FaArrowLeft /> Back to Dashboard
      </button>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">📦 Inventory Management</h2>

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
                    placeholder="Quantity"
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
                    disabled={adding}
                    className="sm:col-span-3 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                >
                    {adding ? 'Adding...' : 'Add Item'}
                </button>
            </div>

            {inventoryItems==null || loading ? (
                <div className="text-center text-gray-500 text-lg">Loading inventories...</div>
            ) : inventoryItems?.length === 0 ? (
                <div className="text-center text-gray-600 text-lg">No inventories...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left border border-gray-200 shadow rounded-lg">
                        <thead className="bg-indigo-100 text-gray-700">
                            <tr>
                                <th className="px-6 py-3">Item</th>
                                <th className="px-6 py-3">Quantity</th>
                                <th className="px-6 py-3">Price (₹)</th>
                                <th className="px-6 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {inventoryItems.map((item, index) => (
                                <tr
                                    key={index}
                                    className="border-t hover:bg-gray-50 transition-all"
                                >
                                    <td className="px-6 py-4 font-medium">{item.productName}</td>
                                    <td className="px-6 py-4">
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) =>
                                                handleUpdateField(index, 'quantity', e.target.value)
                                            }
                                            className="w-20 p-1 border rounded"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <input
                                            type="number"
                                            value={item.price}
                                            onChange={(e) =>
                                                handleUpdateField(index, 'price', e.target.value)
                                            }
                                            className="w-24 p-1 border rounded"
                                        />
                                    </td>
                                    <td className="px-6 py-4 flex flex-wrap justify-center gap-2">
                                        <button
                                            onClick={() => handleEditItem(index)}
                                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                            disabled={editing && editingIndex === index}
                                        >
                                            {editing && editingIndex === index ? 'Saving...' : 'Edit'}
                                        </button>
                                        <button
                                            onClick={() => handleDeleteItem(index)}
                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="mt-6 text-right text-xl font-semibold text-gray-800">
                Total Inventory Cost: ₹{totalCost.toFixed(2)}
            </div>
        </div>
    );
};

export default Inventory;
