import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./style.module.css";
import FamilyAvatar from "../FamilyAvatar";
import { socketContext } from "../../pages/HomePage";
import { familyContext, userContext } from "../../Layout";
import Toolbar from "../Toolbar";
import { Button } from "antd";

export default function Footer() {
  const { socket } = useContext(socketContext);
  const [isFamilyBar, setIsFamilyBar] = useState(false);
  const { family, setFamily } = useContext(familyContext);
  const { user, setUser } = useContext(userContext);
  const inputMonyRef = useRef();
  const openFamilyBar = () => {
    setIsFamilyBar((prev) => !prev);
  };
  const onClickAdd = (target) => {
    socket.emit("addSave", { save: target.value, userId: user._id });
    target.value = "";
  };
  return (
    <div className={style.main_footer}>
      <div className={style.footer}>
        <input
          className={style.inputMony}
          type="number"
          placeholder="כמה חסכתי"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onClickAdd(e.target);
            }
          }}
          ref={inputMonyRef}
        />
        <Button
              onClick={() => onClickAdd(inputMonyRef.current)}
          className={style.addExpense}
        >
          +
        </Button>

        {isFamilyBar ? <FamilyAvatar close={setIsFamilyBar} /> : null}
        <img
          src={`https://avatar.oxro.io/avatar.svg?name=${
            user ? user.firstName : "p"
          } ${user ? user.lastName : "p"}`}
          className={style.profile}
          onClick={openFamilyBar}
        />
      </div>
      <Toolbar />
    </div>
  );
}
