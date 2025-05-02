"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import logo from "../assets/proxym_log.png";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login request to the API
      const response = await fetch("http://localhost:8083/auth/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      const data = await response.json();

      // Save the JWT token in local storage
      localStorage.setItem("token", data.token);

      // Redirect to the root page
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex h-full bg-white rounded-xl">
      {/* Left side - Login form */}
      <div className="flex flex-col items-center justify-center w-full px-6 lg:w-1/2 lg:px-16 xl:px-24">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center mb-10">
            <div className="mr-3">
              <img src={logo} className="h-16" alt="Proxym Logo" />
            </div>
            <h1 className="text-xl font-semibold text-gray-800">E-Statement Platform</h1>
          </div>
          <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">Login</h2>
          {error && <p className="flex justify-center mb-4 text-red-500 text-md">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                placeholder="example.email@gmail.com"
                className="w-full px-4 py-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-8">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter at least 8+ characters"
                  className="w-full px-4 py-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute text-gray-500 transform -translate-y-1/2 right-3 top-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 text-white transition duration-200 bg-indigo-500 rounded-md hover:bg-indigo-600"
            >
              Login
            </button>
          </form>
          <p className="mt-8 text-xs text-center text-gray-500">© 2025 Proxym IT - All rights reserved.</p>
        </div>
      </div>

      {/* Right side - Visual statistics */}    
      <div className="relative hidden overflow-hidden rounded-lg pt-44 lg:block lg:w-1/2 bg-gradient-to-br from-indigo-700 to-indigo-500">
      
        <div className="flex flex-col items-center justify-center h-full px-8">
          {/* Payment chart */}
          <div className="w-full max-w-md p-4 mb-8 bg-white shadow-lg z-9 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <p className="font-medium text-gray-800">Payment</p>
            </div>
            {/* Y-axis labels */}
            
            <div className="relative flex justify-between h-32">
              <div className="flex flex-col justify-between pr-2 text-xs text-gray-500">
                <span>$1,500</span>
                <span>$1,000</span>
                <span>$500</span>
                <span>0</span>
              </div>
              {/* Chart area */}
              <div className="relative flex-1">
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between">
                  <div className="border-t border-gray-200"></div>
                  <div className="border-t border-gray-200"></div>
                  <div className="border-t border-gray-200"></div>
                  <div className="border-t border-gray-200"></div>
                </div>
                {/* Vertical grid lines */}
                <div className="absolute inset-0 flex justify-between">
                  <div className="h-full border-l border-gray-200"></div>
                  <div className="h-full border-l border-gray-200"></div>
                  <div className="h-full border-l border-gray-200"></div>
                  <div className="h-full border-l border-gray-200"></div>
                  <div className="h-full border-l border-gray-200"></div>
                </div>
                {/* Line charts */}
                <svg className="absolute inset-0" viewBox="0 20 200 100" preserveAspectRatio="none">
                  {/* Blue line */}
                  <path
                    d="M0,70 C20,30 250,0 150,10 L180,86"
                    fill="none"
                    stroke="#4F46E5"
                    strokeWidth="2"
                  />
                  {/* Red line */}
                  <path
                    d="M0,10 C50,70 100,80 150,70 L200,60"
                    fill="none"
                    stroke="#EC4899"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
            {/* X-axis labels */}
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>May 01</span>
              <span>May 03</span>
              <span>May 05</span>
              <span>May 07</span>
            </div>
          </div>

          {/* Revenue card */}
          <div className="absolute z-20 w-64 p-4 transition-transform duration-200 bg-white shadow-lg top-32 right-16 rounded-xl hover:scale-105">
            <div className="mb-2">
              <p className="text-sm font-medium text-gray-500">Revenu</p>
              <div className="flex items-start justify-between">
                <p className="text-2xl font-bold text-gray-800">$72,000</p>
                <div className="flex items-center text-sm font-medium text-green-500">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                  25%
                </div>
              </div>
            </div>
            {/* Bar chart visualization */}
            <div className="flex items-end h-16 space-x-1">
              {[0.4, 0.6, 0.3, 0.7, 0.5, 0.8, 0.4, 0.9, 0.6, 0.7, 0.5].map((height, index) => (
                <div
                  key={index}
                  className={`w-2 rounded-t ${index % 2 === 0 ? "bg-indigo-600" : "bg-pink-600"}`}
                  style={{ height: `${height * 100}%` }}
                ></div>
              ))}
            </div>
          </div>

          {/* Text content at the bottom */}
          <div className="z-10 mt-auto mb-16 text-center text-white">
            <h2 className="mb-2 text-3xl font-bold">Welcome To Your Secure E-Statement Hub!</h2>
            <p className="max-w-md ml-20 text-indigo-100 ">
            Access, view, and manage e-statements in one place. Track transactions and insights—securely. Sign in for paperless banking.
            </p>
          </div>

          {/* Background decorative elements */}
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-indigo-300/20"></div>
          <div className="absolute w-48 h-48 rounded-full left-16 bottom-20 bg-indigo-300/20"></div>
          
        </div>
      </div>
    </div>
  );
}

export default SignIn;