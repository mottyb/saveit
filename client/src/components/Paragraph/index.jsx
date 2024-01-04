import React from 'react'
import style from './style.module.css'

export default function Paragraph({text}) {
  return (
    <p className={style.paragraph}>{text}</p>
  )
}
