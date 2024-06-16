import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../service/api";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [roll, setRoll] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { email, password, username, roll };
      const res = await signupUser(userData);
      console.log("Signup response:", res);
      alert("Signup successful");
      navigate("/login");
    } catch (error) {
      setError("Invalid email or password");
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="container mx-auto py-4 p-96 h-screen">
      <h2 className="text-3xl font-bold mb-4 text-center">Sign up</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <label htmlFor="email" className="text-lg">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="username" className="text-lg">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="roll" className="text-lg">
            Roll Number:
          </label>
          <input
            type="text"
            id="roll"
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="text-lg">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 w-1/3 py-2 rounded-md hover:bg-green-600"
          >
            Sign up
          </button>
        </div>
      </form>
      <p className="mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
