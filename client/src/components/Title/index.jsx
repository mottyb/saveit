import React from 'react'
import style from './style.module.css'

export default function Title({text}) {
  return (
    <h2 className={style.title}>
      {text}
    </h2>
  )
}
