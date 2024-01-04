import React from 'react'
import style from './style.module.css'

export default function Button({text='',onClick=()=>{},className=''}) {
  return (
    <button className={`${style.default} ${className}`} onClick={onClick}>{text}</button>
  )
}
