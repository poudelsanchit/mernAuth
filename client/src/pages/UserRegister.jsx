import axios from "axios";
import React, { useState } from "react";
import { BsFilePerson } from "react-icons/bs";
import { CiLock, CiMail, CiUser } from "react-icons/ci";
import { IoPerson } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

const InputField = ({ icon, placeholder, value, onChange, type }) => {
  return (
    <div className="flex items-center h-12 w-full bg-secondaybackground rounded-lg focus:outline-none pl-4 p-2">
      {icon}
      <input
        type={type}
        className="bg-secondaybackground w-full h-full rounded-lg focus:outline-none pl-4 text-white placeholder:text-[#686c6c]"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

const UserRegister = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    const { username, email, password } = data;
    try {
      const {data} = await axios.post("/register", { username, email, password });
      console.log(data)
      if(data.error)
        {
          toast.error(data.error)
        }
        else
        {
          setData({})
          toast.success("User Created Succesful, Welcome!")
          navigate('/login')
        }
    } catch (error) {
      console.error(error); // Handle error
    }
  };

  return (
    <div className="h-screen w-full z-50 bg-primarybackground  flex justify-center sm:pt-32 pt-10 text-white">
      <div className="md:w-[38%] h-[32rem]  rounded-lg p-4 flex flex-col gap-10 items-center">
        <div className="w-full justify- flex flex-col text-3xl font-medium font-Roboto tracking-normal gap-2">
          <div>Register Page</div>
          <div className="text-[#686c6c] font-Roboto text-xs">
            Create your account!
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <InputField
            icon={<CiUser className="text-xl" />}
            placeholder="username"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            type={"username"}
          />
          <InputField
            icon={<CiMail className="text-xl" />}
            placeholder="you@example.com"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            type={"email"}
          />
          <InputField
            icon={<CiLock className="text-xl" />}
            placeholder="password, at Least 8 characters..."
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            type={"password"}
          />
          <div
            className="bg-green-600 rounded-md flex justify-center items-center py-3 cursor-pointer font-Poppins text-bold hover:bg-green-700"
            onClick={handleLogin}
          >
            Sign Up
          </div>
          <div>
            Don't have an Account?{" "}
            <Link to={"/login"} className="text-green-500 font-semibold">
              Login
            </Link>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
