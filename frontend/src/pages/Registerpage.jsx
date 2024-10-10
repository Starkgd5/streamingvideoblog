import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Registerpage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const { registerUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    registerUser(email, username, password, password2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 flex items-center justify-center">
      <div className="container mx-auto py-12 px-4 md:flex md:items-center md:justify-center">
        <div className="w-full max-w-md shadow-2xl rounded-2xl bg-white p-8">
          <div className="flex justify-center mb-6">
            <i className="fas fa-cubes fa-3x text-purple-500"></i>
            <span className="text-4xl font-extrabold text-gray-800 ml-3">
              Mars Tube
            </span>
          </div>
          <h5 className="text-2xl mb-6 text-gray-600 font-semibold">Sign Up</h5>
          <form onSubmit={handleSubmit}>
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
                placeholder="youremail@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="shadow-md border-gray-300 rounded-xl w-full py-2 px-4 text-gray-700 
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
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
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password2"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="password2"
                className="shadow-md border-gray-300 rounded-xl w-full py-2 px-4 text-gray-700 
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                placeholder="Confirm Password"
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>
            <div className="pt-1 mb-4">
              <button
                className="w-full bg-purple-500 text-white py-3 rounded-xl hover:bg-purple-600 transition-all duration-300"
                type="submit"
              >
                Register
              </button>
            </div>
            <a className="text-sm text-purple-500" href="#!">
              Forgot password?
            </a>
            <p className="text-sm mt-5 text-gray-700">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-500 font-semibold">
                Login Now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registerpage;
