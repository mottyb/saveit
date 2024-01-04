import React, { useContext, useEffect, useState } from "react";
import { familyContext } from "../../Layout";
import axios from "axios";
import style from "./style.module.css";

export default function Competition() {
  const [team, setTeam] = useState();
  const { family } = useContext(familyContext);
  const [myPosition, setMyPosition] = useState();
  const go = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BASIC_SERVER}api/team_challenge/one/` +
        family.teamChallenge
    );
    const sort = res.data.team_family.sort(
      (a, b) => b.total_save - a.total_save
    );
    setTeam(sort);
  };
  useEffect(() => {
    go();
  }, []);
  useEffect(() => {
    if (team) {
      const myIndex = team.findIndex(
        (familyValue) => family._id === familyValue._id
      );
      setMyPosition(myIndex + 1);
    }
  }, [team]);
  return (
    <div className={style.competition}>
      <div className={style.table}>
        <div
          className={style.place}
          style={myPosition === 2 ? { border: "2px solid gold" } : null}
        >
          <div>{team && team[1]?.total_save}</div>
          <div className={style.tow}>2</div>
        </div>
        <div
          className={style.place}
          style={myPosition === 1 ? { border: "2px solid gold" } : null}
        >
          <div>{team && team[0]?.total_save}</div>
          <div className={style.one}>1</div>
        </div>
        <div
          className={style.place}
          style={myPosition === 3 ? { border: "2px solid gold" } : null}
        >
          <div>{team && team[2]?.total_save}</div>
          <div className={style.three}>3</div>
        </div>
      </div>
      {myPosition > 3 && (
        <div className={style.text}>
          <span>{myPosition}/{team&&team.length}</span>{" "}
          <span>המשפחה שלי חסכה: {family.total_save}</span>
        </div>
      )}
    </div>
  );
}
