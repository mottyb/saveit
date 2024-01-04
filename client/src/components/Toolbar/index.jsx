import { Button } from "antd";
import style from "./style.module.css";
import React, { useState } from "react";
import { IoMdHome, IoIosTrophy, IoMdShare, IoMdLogOut } from "react-icons/io";
import { FaChalkboard } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Popup from "../Popup";
import Share from "../Share";

export default function Toolbar() {
  const nav = useNavigate();
  const [active, setActive] = useState("home");
  const [OpenSocial, setOpenSocial] = useState(false);
  const options = [
    {
      value: "home",
      icon: (
        <IoMdHome
          className={style.icon}
          color={active === "home" ? "blue" : "black"}
        />
      ),
      onclick: (e) => {
        setActive("home");
        nav("../");
      },
    },
    {
      value: "competition",
      icon: (
        <IoIosTrophy
          className={style.icon}
          color={active === "competition" ? "blue" : "black"}
        />
      ),
      onclick: (e) => {
        setActive("competition");
        nav("../competition");
      },
    },
    {
      value: "share",
      icon: (
        <IoMdShare
          className={style.icon}
          color={active === "share" ? "blue" : "black"}
        />
      ),
      onclick: (e) => {
        setActive("share");
        // setOpenSocial(true);
      },
    },
    {
      value: "webinar",
      icon: (
        <FaChalkboard
          className={style.icon}
          color={active === "webinar" ? "blue" : "black"}
        />
      ),
      onclick: (e) => {
        setActive("webinar");
      },
    },
    {
      value: "logout",
      icon: (
        <IoMdLogOut
          className={style.icon}
          color={active === "logout" ? "blue" : "black"}
        />
      ),
      onclick: (e) => {
        setActive("logout");
        localStorage.removeItem("token");
        nav("../login");
      },
    },
  ];
  return (
    <>
      {OpenSocial && (
        <Popup close={() => setOpenSocial(false)}>
          <Share/>
        </Popup>
      )}
      <div className={style.icon_list}>
        {options.map((option) => {
          return (
            <Button
              onClick={option.onclick}
              value={option.value}
              key={option.value}
              className={style.icon_button}
            >
              {option.icon}
            </Button>
          );
        })}
      </div>
    </>
  );
}
