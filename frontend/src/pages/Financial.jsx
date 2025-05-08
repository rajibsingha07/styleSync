import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { baseUrl } from "../constants";


const Financial = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const customerRes = await fetch(`${baseUrl}/customer/all`, {
          credentials: "include",
        });
        const inventoryRes = await fetch(`${baseUrl}/inventory/all`, {
          credentials: "include",
        });

        if (customerRes.status === 401 || inventoryRes.status === 401) {
          alert('Unauthorized! Please log in again.');
          navigate("/auth");
          return;
          
      }

        const customerData = await customerRes.json();
        const inventoryData = await inventoryRes.json();

        setCustomers(customerData?.customers || []);
        const inventoryItems = inventoryData?.inventories?.products || [];
        setExpenses(inventoryItems);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterByDate = (dateStr) => {
    const date = new Date(dateStr);
    return (!fromDate || date >= fromDate) && (!toDate || date <= toDate);
  };

  const filteredCustomers = customers.filter(
    (c) => c.created_at && filterByDate(c.created_at)
  );
  const filteredExpenses = expenses.filter(
    (e) => e.lastUpdated && filterByDate(e.lastUpdated)
  );

  const totalIncome = filteredCustomers.reduce(
    (acc, cur) => acc + (cur.total_price || 0),
    0
  );
  const totalExpenses = filteredExpenses.reduce(
    (acc, cur) => acc + (cur.price || 0),
    0
  );
  const netProfit = totalIncome - totalExpenses;

  const chartData = [
    { name: "Income", amount: totalIncome },
    { name: "Expenses", amount: totalExpenses },
    { name: "Net Profit", amount: netProfit },
  ];

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <button
        className="flex items-center gap-2 text-blue-600 mb-4"
        onClick={() => navigate("/dashboard")}
      >
        <FaArrowLeft /> Back to Dashboard
      </button>

      <h1 className="text-3xl font-bold mb-6 text-center">Financial Report</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center">
        <div>
          <label className="block mb-1 font-medium">From Date:</label>
          <DatePicker
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
            className="border px-3 py-2 rounded w-full"
            placeholderText="Select start date"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">To Date:</label>
          <DatePicker
            selected={toDate}
            onChange={(date) => setToDate(date)}
            className="border px-3 py-2 rounded w-full"
            placeholderText="Select end date"
          />
        </div>
      </div>

      {loading ? (
        <p className="text-center font-semibold text-lg">Loading...</p>
      ) : (
        <>
          <div className="overflow-x-auto mb-8">
            <h2 className="text-2xl font-semibold mb-4">Income Table</h2>
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-4 py-2">Customer No.</th>
                  <th className="border px-4 py-2">Gender</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Date</th>
                  <th className="border px-4 py-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((c) => {
                  const date = new Date(c.created_at);
                  return (
                    <tr key={c.id} className="text-center">
                      <td className="border px-4 py-2">{c.id}</td>
                      <td className="border px-4 py-2">{c.Gender}</td>
                      <td className="border px-4 py-2">
                        {c.total_price ?? "N/A"}
                      </td>
                      <td className="border px-4 py-2">
                        {date.toLocaleDateString()}
                      </td>
                      <td className="border px-4 py-2">
                        {date.toLocaleTimeString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="overflow-x-auto mb-8">
            <h2 className="text-2xl font-semibold mb-4">Expenses Table</h2>
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-4 py-2">Purchased Item</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Date</th>
                  <th className="border px-4 py-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((item, idx) => {
                  const date = new Date(item.lastUpdated);
                  return (
                    <tr key={idx} className="text-center">
                      <td className="border px-4 py-2">{item.productName}</td>
                      <td className="border px-4 py-2">{item.price}</td>
                      <td className="border px-4 py-2">
                        {date.toLocaleDateString()}
                      </td>
                      <td className="border px-4 py-2">
                        {date.toLocaleTimeString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Summary</h2>
            <p className="text-lg">
              Total Income: <strong>₹{totalIncome}</strong>
            </p>
            <p className="text-lg">
              Total Expenses: <strong>₹{totalExpenses}</strong>
            </p>
            <p className="text-lg">
              Net Profit: <strong>₹{netProfit}</strong>
            </p>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default Financial;
