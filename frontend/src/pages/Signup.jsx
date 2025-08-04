import React, { useState } from 'react'
import { validateEmail } from '../utils/Helper';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const Signup = () => {
    const[name, setName] = useState('');
    const[email, setEmail] =useState('');
    const[password,setPassword] = useState('');
    const[error, setError] = useState('');

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
    
        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }
    
        try {
            const response = await axiosInstance.post("/api/auth/signup", {
                fullName: name,
                email,
                password,
            });
    
            if (response.data && response.data.error) {
                setError(response.data.error)
                return;
            }
            if(response.data && response.data.accessToken){
                localStorage.setItem("token", response.data.accessToken);
                navigate("/")
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                console.log(error);
                setError("An unexpected error occurred. Please try again.");
            }
        }
    };
    return (
        <>
            <Navbar />

            <div className='flex items-center justify-center mt-20'>
                <div className='w-80 border rounded-2xl border-amber-100 bg-white px-10 py-5'>
                    <form onSubmit={handleSignup}>
                        <h4 className='text-2xl mb-7 text-center  font-medium '>Signup</h4>
                         
                        <input
                            type='text'
                            value={name}
                            placeholder='Name'
                            required
                            onChange={(e) => { setName(e.target.value) }}
                            className='w-full text-sm bg-transparent border-2 px-5 py-3 rounded-lg outline-0 mb-4'
                        />
                        <input
                            type='email'
                            value={email}
                            placeholder='Email'
                            required
                            onChange={(e) => { setEmail(e.target.value) }}
                            className='w-full text-sm bg-transparent border-2 px-5 py-3 rounded-lg outline-0 mb-4'
                        />

                        <input
                            type='password'
                            value={password}
                            placeholder='Password'
                            required
                            onChange={(e) => { setPassword(e.target.value) }}
                            className='w-full text-sm bg-transparent border-2 px-5 py-3 rounded-lg outline-0 mb-4'
                        />

                        {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
                        <button
                            type='submit'
                            className='bg-blue-600 py-2 rounded w-full mt-4 hover:bg-blue-700 mb-2'
                        >
                            Signup
                        </button>
                        <p className='text-sm text-center'>Already have an account ? {""}
                            <Link to="/login" className="font-medium text-primary underline">
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup