import React from 'react'
import style from "./style.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";


export default function Popup({close=()=>{},children}) {
  return (
    <div className={style.popup}>
      <div className={style.close}>
      <AiOutlineCloseCircle onClick={close} />
      </div>
      {children}
    </div>
  )
}
