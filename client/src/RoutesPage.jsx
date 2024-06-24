import React, { useContext, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Email from "./pages/Email";
import Contact from "./pages/Contact";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import { UserContext } from "../context/userContext";

const RoutesPage = () => {
  const { isLoggedIn } = useContext(UserContext);
  console.log(isLoggedIn);
  const routes = [
    { name: "/", element: <Home /> },
    { name: "/email", element: <Email /> },
    { name: "/contact", element: <Contact /> },
    { name: "/login", element: <UserLogin /> },
    { name: "/register", element: <UserRegister /> },
  ];
  return (
    <>
      <Routes>
        {/* <Route path="/login" element={isLoggedIn ? <Home /> : <UserLogin />} /> */}
        {routes.map((data) => {
          return (
            <>
              <Route path={data.name} element={data.element} />
            </>
          );
        })}
      </Routes>
    </>
  );
};

export default RoutesPage;
