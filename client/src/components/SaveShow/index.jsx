import React, { useEffect, useState } from "react";
import style from "./style.module.css";
export default function SaveShow({ endNumber, text, from }) {
  const [count, setCount] = useState(sessionStorage.getItem(from));
  const [end, setEnd] = useState(0);
  const [isPositive, setIsPositive] = useState(true);
  const duration = 5;
  useEffect(() => {
    if (endNumber > 0) {
      setEnd(endNumber);
      setIsPositive(true);
    } else if (endNumber === 0) {
      setEnd(0);
      setIsPositive(true);
    } else {
      setEnd(endNumber);
      setIsPositive(false);
    }
  }, [endNumber]);

  useEffect(() => {
    let start = 0;
    if (start === end) {
      setCount(0);
      return;
    }

    let incrementTime = (duration / end) * 1000;

    let timer = setInterval(() => {
      if (isPositive) {
        start += 1;
      } else {
        start -= 1;
      }
      if (start > Number(count)) {
        setCount(String(start));
      }
      if (start === end) clearInterval(timer);
    }, incrementTime);
  }, [end, duration]);

  return (
    <div className={style.saveShow}>
      <span>{text}</span>
      <h4 style={{ direction: "ltr" }}>₪{count}</h4>
    </div>
  );
}
