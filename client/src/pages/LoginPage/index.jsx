import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../../components/Login'
import Register from '../../components/Register'
import AddUser from '../../components/AddUser'

export default function LoginPage() {
  return (
    <Routes>
        <Route path='/register/*' element={<Register/>}/>
        <Route path='/addusers/*' element={<AddUser/>}/>
        <Route path='/choseuser/*' element={<AddUser/>}/>
        <Route path='*' element={<Login/>}/>
        <Route path='/*' element={<Login/>}/>
    </Routes>
  )
}
