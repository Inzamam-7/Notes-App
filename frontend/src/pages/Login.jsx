import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import {Link ,useNavigate} from 'react-router-dom'
import { validateEmail } from '../utils/Helper';
import axiosInstances from "../utils/axiosInstance";
const Login = () => {

    const [email,setEmail] =useState('');
    const [password, setPassword] = useState('');
    const[error,setError] = useState(null);

    const navigate = useNavigate();

    const handleLogin =async(e) =>{
       e.preventDefault();

       if(!validateEmail(email)){
          setError("Please enter a valid email address");
          return;
       }

       setError("");

       try{
         const response = await axiosInstances.post("/api/auth/login",{
            email: email,
            password: password,
         })

         if(response.data && response.data.accessToken){
            localStorage.setItem("token", response.data.accessToken);
            navigate("/");
         }
       }catch(error){
            if(error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message);
            }else{
                setError("An unexpected error occured. Please try again");
            }
       }
    }
  return (
    <>
     <Navbar />

     <div className='flex items-center justify-center mt-20'>
        <div className='w-80 border rounded-2xl border-amber-100 bg-white px-10 py-5'>
            <form onSubmit={handleLogin}>
                <h4 className='text-2xl mb-7 text-center  font-medium '>Login</h4>

                <input
                type='text'
                value={email}
                placeholder='Email'
                onChange={(e) =>{setEmail(e.target.value)}}
                className='w-full text-sm bg-transparent border-2 px-5 py-3 rounded-lg outline-0 mb-4'
                />

               <input
                type='password'
                value={password}
                placeholder='Password'
                required
                onChange={(e) =>{setPassword(e.target.value)}}
                className='w-full text-sm bg-transparent border-2 px-5 py-3 rounded-lg outline-0 mb-4'
                />

                {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
                <button 
                type='submit'
                className='bg-blue-600 py-2 rounded w-full mt-4 hover:bg-blue-700 mb-2'
                >
                    Login
                </button>
                <p className='text-sm text-center'>Not registered yet? {""}
                    <Link to="/signup" className="font-medium text-primary underline">
                    Create an Account
                    </Link>
                </p>
            </form>
        </div>
     </div>
    </>
  )
}

export default Login