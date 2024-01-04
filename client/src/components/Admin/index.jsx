import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const nav = useNavigate();
  const onClick = (e) => {
    if (e.target.innerText === "טבלת מידע ימים") nav("./dayTable");
    else if (e.target.innerText === "מידע על כל הקבוצות") nav("./team_challenge");
    else if (e.target.innerText === "הוסף משפחה לאתגר") nav("./addUser");
  };
  return (
    <div>
      <Button onClick={onClick} >
        טבלת מידע ימים
      </Button>
      <Button onClick={onClick}>
        מידע על כל הקבוצות
      </Button>
      <Button onClick={onClick}>
        הוסף משפחה לאתגר
      </Button>
    </div>
  );
}
