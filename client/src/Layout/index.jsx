import React, { createContext, useEffect, useState } from "react";
import style from "./style.module.css";
import Header from "../components/Header";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import axios from "axios";

export const familyContext = createContext();
export const userContext = createContext();

export default function Layout() {
  const nav = useNavigate();
  const [user, setUser] = useState();
  const [family, setFamily] = useState();
  const checkToken = async (token) => {
    const result = await axios.get(
      `${import.meta.env.VITE_BASIC_SERVER}api/login`,
      {
        headers: { Authorization: `${token}` },
      }
    );
    if (result.data.family && result.data.user) {
      setFamily(result.data.family);
      setUser(result.data.user);
      nav("../");
    } else nav("/sign");
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkToken(localStorage.getItem("token"));
    } else nav("/sign");
  }, [localStorage.token]);
  return (
    <familyContext.Provider value={{ family, setFamily }}>
      <userContext.Provider value={{ user, setUser }}>
        <div className={style.layout}>
          <Header />
          <Routes>
            <Route path="*" element={user ? <HomePage /> : <LoginPage />} />
            <Route path="/*" element={user ? <HomePage /> : <LoginPage />} />
            <Route path="/sign/*" element={<LoginPage />} />
          </Routes>
        </div>
      </userContext.Provider>
    </familyContext.Provider>
  );
}
