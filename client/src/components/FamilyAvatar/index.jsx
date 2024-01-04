import React, { useContext } from "react";
import style from "./style.module.css";
import { familyContext, userContext } from "../../Layout";
import axios from "axios";
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function FamilyAvatar({ close }) {
  const { family } = useContext(familyContext);
  const { user, setUser } = useContext(userContext);
  const nav = useNavigate();
  const chooseUser = async (userChosen) => {
    const token = await axios.post(
      `${import.meta.env.VITE_BASIC_SERVER}api/token`,
      { familyId: family._id, userId: userChosen._id }
    );
    localStorage.setItem("token", token.data);
    setUser(userChosen);
    close((prev) => !prev);
  };
  return (
    <div className={style.familyBar}>
      <div
        className={style.userBar}
        onClick={() => {
          nav("../choseuser");
        }}
      >
        <FaPlusCircle
          className={style.profile}
          color="black"
        />
      </div>
      {family.my_family
        .filter((userFromData) => user._id !== userFromData._id)
        .map((userFromData) => {
          return (
            <div
              className={style.userBar}
              onClick={() => {
                chooseUser(userFromData);
              }}
              key={userFromData._id}
            >
              <img
                src={`https://avatar.oxro.io/avatar.svg?name=${userFromData.firstName} ${userFromData.lastName}`}
                className={style.profile}
              />
            </div>
          );
        })}
    </div>
  );
}
