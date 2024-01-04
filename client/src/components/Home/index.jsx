import React, { createContext, useEffect, useState } from "react";
import style from "./style.module.css";
import SaveBar from "../SaveBar";
import Main from "../Main";
import Footer from "../Footer";
import { Route, Routes } from "react-router-dom";
import Competition from "../Competition";

export default function Home() {
  return (
    <div className={style.layout}>
      <SaveBar />
      <Routes>
        <Route path="/competition/*" element={<Competition />} />
        <Route path="/*" element={<Main />} />
        <Route path="*" element={<Main />} />
      </Routes>
      <Footer />
    </div>
  );
}
