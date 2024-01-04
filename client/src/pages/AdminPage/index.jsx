import React from 'react'
import style from "./style.module.css";
import Admin from '../../components/Admin';
import { Route, Routes } from 'react-router-dom';
import DayTable from '../../components/DayTable';
import Teams from '../../components/Teams';
import AdminAddUser from '../../components/AdminAddUser';

export default function AdminPage() {
  return (
    <Routes>
      <Route path='/*' element={<Admin/>}/>
      <Route path='*' element={<Admin/>}/>
      <Route path='/team_challenge' element={<Teams/>}/>
      <Route path='/dayTable' element={<DayTable/>}/>
      <Route path='/addUser' element={<AdminAddUser/>}/>
    </Routes>
  )
}
