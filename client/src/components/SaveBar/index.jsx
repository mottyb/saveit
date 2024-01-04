import React, { useContext, useEffect, useState } from 'react'
import style from './style.module.css'
import SaveShow from '../SaveShow'
import { socketContext } from "../../pages/HomePage";
import { familyContext, userContext } from '../../Layout';

export default function SaveBar() {
  const {socket} = useContext(socketContext)
  const [selfSave,setSelfSave] = useState(0)
  const [familySave,setFamilySave] = useState(0)
  const {user,setUser} = useContext(userContext)
  const {family,setFamily} = useContext(familyContext)
useEffect(()=>{
  if(socket){
    socket.on("my_total", (data) => {
      setUser(data)
      sessionStorage.setItem("my_total", data.total_save)
    });
    socket.on("family_total", (data) => {
      setFamily(data)
      sessionStorage.setItem("family_total", data.total_save)
    });
  }
},[socket])
useEffect(()=>{
  setSelfSave(user&&user.total_save?user.total_save:0)
},[user])
useEffect(()=>{
  setFamilySave(family&&family.total_save?family.total_save:0)
},[family])
  return (
    <div className={style.saveBar}>
        <SaveShow  text='אני חסכתי' from ={'my_total'} endNumber={selfSave}/>
        <SaveShow text='המשפחה חסכה' from ={'family_total'} endNumber={familySave}/>
    </div>
  )
}
