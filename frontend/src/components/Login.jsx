import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Atom from './Atom';
import Animation from './Animation'
import { MdAdminPanelSettings } from "react-icons/md";
import logo from "../assets/logo.png";
const Login = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL + "/api/auth/admin", { email, password });
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        navigate("/welcome");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className='min-h-screen bg-white flex items-center flex-col justify-center relative w-full overflow-hidden'>
      <Animation />
      <div className='bg-white shadow-md z-10 rounded-lg px-8 py-6 max-w-md'>
        <div className="flex flex-col items-center justify-center mb-4">
          {/* Logo Image */}
          <img
            className="w-[max(10%,150px)] cursor-pointer transition duration-300 transform hover:scale-110 mb-2"
            src={logo}
            alt="Logo"
          />
          {/* Admin Panel Text */}
          <div className="flex items-center justify-center text-4xl font-bold text-russian_violet">
            <MdAdminPanelSettings className="mr-2" />
            <h3>Admin Panel</h3>
          </div>
        </div>
        <Atom />
        <form onSubmit={handleLogin}>
          <div className='mb-3 min-w-72'>
            <p className='text-md font-medium text-russian_violet mb-2'>Email Address</p>
            <input onChange={(e) => setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='your@email.com' required />
          </div>
          <div className='mb-3 min-w-72'>
            <p className='text-md font-medium text-russian_violet mb-2'>Password</p>
            <input onChange={(e) => setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='Enter your password' required />
          </div>
          <button className='mt-2 w-full py-2 px-4 rounded-md font-medium text-white bg-true_blue hover:bg-russian_violet' type="submit"> Login </button>
        </form>
      </div>
    </div>
  );
};

export default Login;