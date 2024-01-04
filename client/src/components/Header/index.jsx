import React from "react";
import style from "./style.module.css";
import logo from "../../assets/logo.png";

export default function Header() {
  return (
    <h1 className={style.header}>
      Save<span>It</span>
    </h1>
  );
}
