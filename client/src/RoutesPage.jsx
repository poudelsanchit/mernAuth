import React, { useContext, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Email from "./pages/Email";
import Contact from "./pages/Contact";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import { UserContext } from "../context/userContext";

const RoutesPage = () => {
  const { isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const routes = [
    { name: "/", element: <Home /> },
    { name: "/email", element: <Email /> },
    { name: "/contact", element: <Contact /> },
  ];

  return (
    <Routes>
      <Route path="*" element={isLoggedIn ? <Home /> : <UserLogin />} />
      <Route path="/login" element={isLoggedIn ? <Home /> : <UserLogin />} />
      <Route
        path="/register"
        element={isLoggedIn ? <Home /> : <UserRegister />}
      />

      {routes.map((data) => (
        <Route
          key={data.name}
          path={data.name}
          element={isLoggedIn ? data.element : <Navigate to="/login" replace />}
        />
      ))}
    </Routes>
  );
};

export default RoutesPage;
