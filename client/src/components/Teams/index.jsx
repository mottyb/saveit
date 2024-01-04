import { Button, Input, Form } from "antd";
import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import axios from "axios";
import Popup from "../Popup";
import Title from "../Title";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [update, setUpdate] = useState(true);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const onFinish = async (value) => {
    await axios.post(
      `${import.meta.env.VITE_BASIC_SERVER}api/team_challenge/`,
      { date: new Date(value.date)}
    );
    setUpdate((prev) => !prev);
    setOpen(false);
  };
  const getTeams = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BASIC_SERVER}api/team_challenge/All`
    );
    setTeams(res.data);
  };
  const onClickAdd = async () => {
    setOpen(true);
  };
  useEffect(() => {
    getTeams();
  }, [update]);
  return (
    <div className={style.teams}>
      <Title text={'ניהול קבוצות'}/>
      {teams.map((team) => {
        return <Button>{new Date(team.date).toLocaleDateString('en-GB')}</Button>;
      })}
      <Button onClick={onClickAdd}>התחל קבוצה חדשה</Button>
      {open && (
        <Popup close={setOpen}>
          <Form form={form} onFinish={onFinish}>
            <Form.Item
              name={"date"}
              style={{
                margin: 0,
              }}
              rules={[
                {
                  required: true,
                  message: `בבקשה הכנס תאריך!`,
                },
              ]}
            >
              <Input type="date" />
            </Form.Item>
            <Form.Item
              name={"submit"}
              style={{
                margin: 0,
              }}
            >
              <Button type="primary" htmlType="submit">
                אישור
              </Button>
            </Form.Item>
          </Form>
        </Popup>
      )}
    </div>
  );
}
