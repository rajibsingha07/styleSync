import React, { useState } from "react";
import { FaCheckCircle, FaTrash, FaPlus, FaArrowLeft } from "react-icons/fa";
import { baseUrl } from "../constants";
import { useNavigate } from "react-router-dom";

const commonServices = [
  "Haircut",
  "Head Massage",
  "Shaving",
  "Hair Coloring",
  "Beard Trim",
  "Facial",
  "Hair Wash",
];

const AddService = () => {
  const navigate = useNavigate();
  const [serviceName, setServiceName] = useState("");
  const [customService, setCustomService] = useState("");
  const [price, setPrice] = useState("");
  const [services, setServices] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAddToList = () => {
    const name = serviceName === "custom" ? customService.trim() : serviceName;
    if (!name || !price) return alert("Please fill both name and price.");
    setServices([...services, { name, price: parseInt(price) }]);
    setServiceName("");
    setCustomService("");
    setPrice("");
  };

  const handleRemove = (index) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (services.length === 0) return alert("No services to submit.");
    setIsSubmitting(true);
    try {
      const res = await fetch(`${baseUrl}/service/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(services),
      });

      if (!res.ok) throw new Error("Failed to add services");

      setIsSubmitting(false);
      setIsSuccess(true);
      setServices([]);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (err) {
      setIsSubmitting(false);
      alert(err.message || "Something went wrong!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
       <button
        className="flex items-center gap-2 text-blue-600 mb-4"
        onClick={() => navigate("/dashboard")}
      >
        <FaArrowLeft /> Back to Dashboard
      </button>
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Add Your Services
      </h2>

      {/* Service Selector */}
      <div className="mb-4">
        <label className="block font-medium mb-1 text-gray-700">Select a Service</label>
        <select
          className="w-full border border-gray-300 p-2 rounded mb-2"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
        >
          <option value="">-- Choose --</option>
          {commonServices.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
          <option value="custom">Other (Type manually)</option>
        </select>

        {serviceName === "custom" && (
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded mb-2"
            placeholder="Enter custom service name"
            value={customService}
            onChange={(e) => setCustomService(e.target.value)}
          />
        )}

        <input
          type="number"
          className="w-full border border-gray-300 p-2 rounded mb-2"
          placeholder="Enter Price (₹)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button
          onClick={handleAddToList}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          <FaPlus /> Add to List
        </button>
      </div>

      {/* List of Added Services */}
      {services.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Services to be Added:</h3>
          <ul className="space-y-2">
            {services.map((s, i) => (
              <li
                key={i}
                className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded"
              >
                <span>{s.name} - ₹{s.price}</span>
                <button
                  onClick={() => handleRemove(i)}
                  className="text-red-600 hover:text-red-800"
                  title="Remove"
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Submit Button */}
      {isSubmitting ? (
        <div className="text-center text-blue-600 font-medium">
          <div className="animate-spin inline-block mr-2 border-2 border-blue-500 border-t-transparent rounded-full w-5 h-5"></div>
          Adding services...
        </div>
      ) : isSuccess ? (
        <div className="text-center text-green-600 font-semibold flex flex-col items-center">
          <FaCheckCircle size={40} className="mb-2" />
          Services added successfully!
        </div>
      ) : (
        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition"
        >
          Add Services
        </button>
      )}
    </div>
  );
};

export default AddService;
