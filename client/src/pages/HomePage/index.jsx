import React, { createContext, useContext, useEffect, useState } from "react";
import style from "./style.module.css";
import io from "socket.io-client";
import { Route, Routes } from "react-router-dom";
import Home from "../../components/Home";
import AdminPage from "../AdminPage";
import { familyContext } from "../../Layout";
import AddUser from "../../components/AddUser";

export const socketContext = createContext();

export default function HomePage() {
  const [socket, setSocket] = useState();
  const {family} = useContext(familyContext)
  useEffect( () => {
    const tempSocket = io.connect(import.meta.env.VITE_BASIC_SERVER, {
      transportOptions: {
        polling: {
          extraHeaders: { Authorization: `${localStorage.getItem("token")}` },
        },
      },
    });
    setSocket(tempSocket);
  }, []);
  useEffect(() => {
    if (socket) {
      socket.on("error", (data) => {
        console.log(data);
      });
      socket.on('connects',()=>{
        socket.emit('getDayData')
      })
    }
  }, [socket]);
  return (
    <socketContext.Provider value={{ socket }}>
      <Routes>
        <Route path="/*" element={<Home/>} />
        <Route path="/choseuser" element={<AddUser/>} />
        <Route path="*" element={<Home/>} />
        <Route path="/admin/*" element={<AdminPage />} />
      </Routes>
    </socketContext.Provider>
  );
}
