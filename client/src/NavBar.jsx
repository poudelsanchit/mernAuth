import React, { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { NavLink } from "react-router-dom";
import { CgMenuRight } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";

const NavBar = () => {
  const { user, logout } = useContext(UserContext);
  console.log(user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 bg-primarybackground h-20 w-full text-white flex justify-center shadow-sm shadow-gray-800 z-50">
      <div className="sm:w-[95%] w-[97%] flex sm:justify-center justify-around items-center gap-2">
        <div className="h-12 sm:w-9/12 w-full rounded-md flex items-center justify-between cursor-pointer ">
          <div className="font-semibold font-Poppins pl-4 text-sm">
            Admin,
            <span className="font-medium"> {!!user && user.username}</span>
          </div>
        </div>
        <div
          className="h-12 w-2/12 rounded-md sm:hidden flex items-center justify-between cursor-pointer"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <div className="font-semibold font-Poppins pl-4 text-2xl">
            <CgMenuRight />
          </div>
        </div>
        {isMenuOpen ? (
          <div className="absolute right-4 w-32 bg-primarybackground shadow-xl top-20 rounded-md min-h-32 flex flex-col text-white font-Poppins">
            <NavLink
              to="/"
              className="hover:bg-secondaybackground w-full h-max p-2 rounded-t-md cursor-pointer"
              activeClassName="active"
            >
              Page 1
            </NavLink>
            <NavLink
              to="/contact"
              className="hover:bg-secondaybackground w-full h-max p-2 rounded-t-md cursor-pointer"
              activeClassName="active"
            >
              Page 2
            </NavLink>
            <NavLink
              to="/email"
              className="hover:bg-secondaybackground w-full h-max p-2 rounded-t-md cursor-pointer"
              activeClassName="active"
            >
              Page 3
            </NavLink>
          </div>
        ) : null}
        <NavLink
          to="/"
          className="relative h-12 sm:w-1/12 w-1/12 rounded-md sm:flex hidden items-center justify-between cursor-pointer"
          activeClassName="active"
        >
          <div className="h-full w-full rounded-lg flex justify-center items-center text-sm font-medium hover:text-purple-500 font-Poppins ">
            Page 1
          </div>
        </NavLink>
        <NavLink
          to="/page2"
          className="h-12 w-1/12 rounded-lg sm:flex hidden gap-2 cursor-pointer"
          activeClassName="active"
        >
          <div className="h-full w-full rounded-lg flex justify-center items-center text-sm font-medium hover:text-purple-500 font-Poppins">
            Page 2
          </div>
        </NavLink>
        <NavLink
          to="/page3"
          className="h-12 w-1/12 rounded-lg sm:flex hidden gap-2 cursor-pointer"
          activeClassName="active"
        >
          <div className="h-full w-full rounded-lg flex justify-center items-center text-sm font-medium hover:text-purple-500 font-Poppins">
            Page 3
          </div>
        </NavLink>
        <div onClick={logout} className=" text-xl p-1 rounded-sm bg-secondaybackground hover:scale-105 flex justify-center items-center ">
          <IoLogOutOutline className="rotate-180 cursor-pointer    " />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
