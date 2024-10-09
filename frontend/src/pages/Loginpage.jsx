import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      // Check if email is not empty before calling loginUser
      loginUser(email, password);
    }
  };

  return (
    <div className="container py-5 h-screen flex justify-center items-center">
      <div className="col-xl-10">
        <div className="card bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-6">Welcome back</h2>
            <h5 className="text-xl mb-6">Sign into your account</h5>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-indigo-500 focus:ring-w-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-indigo-500 focus:ring-w-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between mb-6">
              <button
                type="submit"
                className="bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700"
              >
                Login
              </button>
              <a href="#!" className="text-sm text-gray-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <p className="text-sm text-gray-700 mb-4">
              Don't have an account?{" "}
              <Link to="/register" className="text-indigo-600 hover:underline">
                Register Now
              </Link>
            </p>
            <div className="flex items-center space-x-2">
              <a href="#!" className="text-sm text-gray-600 hover:underline">
                Terms of use.
              </a>
              <a href="#!" className="text-sm text-gray-600 hover:underline">
                Privacy policy
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
