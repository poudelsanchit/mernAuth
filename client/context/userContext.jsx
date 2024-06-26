import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const isLoggedIn = !!user;

  useEffect(() => {
    axios
      .get("/profile")
      .then(({ data }) => {
        setUser(data);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  const logout = async () => {
    try {
      await axios.post("/logout");
      setUser(null);
      toast.success("Logged out succesfully!");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, logout }}>
      {children}
    </UserContext.Provider>
  );
}
