import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

const Header = () => {
    const currenturl = useLocation();
    const navigate = useNavigate();
    const [auth] = useAuth();
    useEffect(() => {}, [auth]);
    const logout = () => {
        localStorage.removeItem("auth");
        navigate("/login");
    };
    return (
        <header className='bg-gray-800 text-white py-2'>
            <div className='container mx-auto flex justify-between items-center'>
                <h1 className='text-lg font-bold'>
                    <Link to='/'>
                        <div className='flex'>
                            <img src='docs.svg' alt='' className='size-10' />
                            <h1 className='mx-2 align-middle'>
                                Student Speaks
                            </h1>
                        </div>
                    </Link>
                </h1>
                <nav>
                    <ul className='flex space-x-2'>
                        {!auth?.user ? (
                            <div className='flex'>
                                {currenturl?.pathname != "/login" && (
                                    <li>
                                        <Link to='/login'>
                                            <button className='bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded mx-1'>
                                                Login
                                            </button>
                                        </Link>
                                    </li>
                                )}
                                {currenturl?.pathname != "/signup" && (
                                    <li>
                                        <Link to='/signup'>
                                            <button className='bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded mx-1'>
                                                Signup
                                            </button>
                                        </Link>
                                    </li>
                                )}
                            </div>
                        ) : (
                            <div className='flex'>
                                <h1 className='text-lg font-bold mx-3'>
                                    {auth.user.username}
                                </h1>
                                <li>
                                    <button
                                        className='bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded mx-1'
                                        onClick={logout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </div>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
