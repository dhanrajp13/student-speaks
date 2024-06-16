import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../service/api";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = { email, password };
            const res = await loginUser(userData);
            console.log("Login response:", res);
            if (res.status == 200) {
                localStorage.setItem(
                    "auth",
                    JSON.stringify({ user: res.user, token: res.token })
                );
                alert("Login successful");
                navigate("/");
            }
        } catch (error) {
            setError("Invalid email or password");
            console.error("Login error:", error);
        }
    };

    return (
        <div className='container py-4 p-96 h-screen'>
            <h1 className='text-3xl font-bold mb-4 text-center'>Login</h1>
            <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
                <div>
                    <label htmlFor='email' className='text-lg'>
                        Email:
                    </label>
                    <input
                        type='email'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='border border-gray-300 rounded-md px-3 py-2 w-full'
                    />
                </div>
                <div>
                    <label htmlFor='password' className='text-lg'>
                        Password:
                    </label>
                    <input
                        type='password'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='border border-gray-300 rounded-md px-3 py-2 w-full'
                    />
                </div>
                <div className='flex justify-center'>
                    <button
                        type='submit'
                        className='bg-blue-500 text-white px-4 w-1/3 py-2 rounded-md hover:bg-blue-600 '
                    >
                        Login
                    </button>
                </div>
            </form>
            <p className='mt-4'>
                Don't have an account?{" "}
                <Link to='/signup' className='text-blue-500 hover:underline'>
                    Sign up
                </Link>
            </p>
        </div>
    );
};

export default Login;
