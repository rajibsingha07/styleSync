import Navbar from "./components/navbar.jsx"
import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from "./pages/About.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import Home from "./pages/Home.jsx"
import AuthPage from "./pages/Authpage.jsx";
import Financial from "./pages/Financial.jsx"
import UserList from "./pages/Userlist.jsx";
import AddService from "./pages/AddService.jsx";
import Inventory from "./pages/Inventory.jsx";
import AddCustomer from "./pages/AddCustomer.jsx";


function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-20"> {/* padding-top for fixed navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/expenses" element={<Financial />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/addservice" element={<AddService />} />
          <Route path="/addCustomer" element={<AddCustomer />} />
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
