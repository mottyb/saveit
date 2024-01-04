import { useState, React, useContext, useEffect } from "react";
import style from "./style.module.css";
import Video from "../Video";
import Title from "../Title";
import Paragraph from "../Paragraph";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { socketContext } from "../../pages/HomePage";
import { familyContext, userContext } from "../../Layout";
import { FaArrowLeftLong, FaArrowRight } from "react-icons/fa6";
import axios from "axios";

export default function Main() {
  const nav = useNavigate();
  const { socket } = useContext(socketContext);
  const { family, setFamily } = useContext(familyContext);
  const { user, setUser } = useContext(userContext);
  const [dayData, setDayData] = useState();
  const [team, setTeam] = useState(24);
  useEffect(() => {
    if (socket) {
      socket.on("dayData", (data) => {
        setDayData(data);
      });
    }
  }, [socket]);
  const onClickNewDay = (dayNumber) => socket.emit("getDay", { dayNumber });
  const go = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BASIC_SERVER}api/team_challenge/one/` +
        family.teamChallenge
    );
    setTeam(res.data);
  };
  useEffect(() => {
    go();
  }, []);
  useEffect(() => {
    if (!dayData && socket) {
      socket.emit("getDay", { dayNumber: team.dayNumber });
    }
  }, [team]);
  const downloadFile = async (data) => {
    fetch(`${import.meta.env.VITE_BASIC_SERVER}${data}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/pdf",
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", data.split("/")[1]);

        document.body.appendChild(link);

        link.click();

        link.parentNode.removeChild(link);
      });
  };

  return (
    <main className={style.main}>
      {dayData ? (
        <div>
          <div className={style.title}>
            {team.dayNumber > dayData.dayNumber && (
              <FaArrowRight
                onClick={() => {
                  onClickNewDay(dayData.dayNumber + 1);
                }}
              />
            )}
            <Title text={dayData.title} />
            {dayData.dayNumber > 1 && (
              <FaArrowLeftLong
                onClick={() => {
                  onClickNewDay(dayData.dayNumber - 1);
                }}
              />
            )}
          </div>
          <Paragraph text={dayData.description} />
          <Title text={"למה לא לקנות גם היום?"} />
          <Video videoId={dayData.videoIdWhy} />
          <Title text={"איך לחסוך מהר ב..."} />
          <Video videoId={dayData.videoIdHow} />
          {dayData.file ? (
            <>
              <Title text={"טיפ יומי"} />
              <Button
                onClick={() => {
                  downloadFile(dayData.file);
                }}
              >
                {`${dayData.file.split("/")[1]}`}
              </Button>
            </>
          ) : (
            <></>
          )}
        </div>
      ) : null}
      {user.role == "admin" && (
        <Button
          onClick={() => {
            nav("/admin");
          }}
        >
          ניהול
        </Button>
      )}
    </main>
  );
}
