import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="h-14 bg-purple-700 flex justify-center items-center">
      <div className="w-10/12 flex gap-10 text-white font-sans ">
        <Link to={'/'}>HOME</Link>
        <Link to={'/login'}>LOGIN</Link>
        <Link to={'/register'}>REGISTER</Link>
      </div>
    </div>
  );
};

export default Navbar;
