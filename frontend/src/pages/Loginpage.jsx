import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      login(email, password);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-700 via-purple-500 to-pink-500 flex justify-center items-center">
      <div className="w-full max-w-md shadow-2xl rounded-2xl bg-white p-8">
        <form onSubmit={handleSubmit}>
          <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
            Welcome Back
          </h2>
          <h5 className="text-xl text-gray-600 font-medium mb-6 text-center">
            Sign into your account
          </h5>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="shadow-md border-gray-300 rounded-xl w-full py-2 px-4 text-gray-700 
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow-md border-gray-300 rounded-xl w-full py-2 px-4 text-gray-700 
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <button
              type="submit"
              className="bg-purple-500 text-white w-full py-3 rounded-xl hover:bg-purple-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              Login
            </button>
          </div>
          <div className="text-center">
            <a href="#!" className="text-sm text-purple-500 hover:underline">
              Forgot password?
            </a>
          </div>
          <p className="text-sm text-gray-700 mt-6 text-center">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-purple-500 font-semibold hover:underline"
            >
              Register Now
            </Link>
          </p>
          <div className="flex items-center justify-center space-x-2 mt-4">
            <a href="#!" className="text-sm text-gray-600 hover:underline">
              Terms of use
            </a>
            <a href="#!" className="text-sm text-gray-600 hover:underline">
              Privacy policy
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
