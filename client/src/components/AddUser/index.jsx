import React, { useContext, useEffect, useState } from "react";
import style from "./style.module.css";
import Popup from "../Popup";
import { Card, Button, Form, Input } from "antd";
const { Meta } = Card;
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { familyContext, userContext } from "../../Layout";
import Title from "../Title";

export default function AddUser() {
  const nav = useNavigate();
  const { family, setFamily } = useContext(familyContext);
  const [showAU, setShowAu] = useState(false);
  const { user, setUser } = useContext(userContext);
  const [users, setUsers] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const onFinish = (values) => {
    setUsers((prev) => [...prev, { ...values }]);
    setOpenForm(false);
    setShowAu(true);
  };
  const onFinishFailed = (errorInfo) => {};
  useEffect(() => {
    if (family && family.my_family.length > 0) {
      setUsers(family.my_family);
    }
    else if(!family){
      nav('../')
    }
  }, []);
  useEffect(() => {
    console.log(users);
  }, [users]);
  const endRegister = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_BASIC_SERVER}api/addusers`,
      { familyId: family._id, my_family: users.filter((user) => !user._id) }
    );
    setFamily(res.data);
    setShowAu(false);
    setUsers(res.data.my_family);
  };
  const chooseUser = async (userFromChose) => {
    if (!showAU) {
      const token = await axios.post(
        `${import.meta.env.VITE_BASIC_SERVER}api/token`,
        { familyId: family._id, userId: userFromChose._id }
      );
      localStorage.setItem("token", token.data);
      setUser(userFromChose);
      nav("../../");
    }
  };
  const deleteUser = async (userToDelete) => {
    if (userToDelete._id) {
      const res = await axios.post(
        `${import.meta.env.VITE_BASIC_SERVER}api/deleteuser`,
        { _id: userToDelete._id }
      );
      setUsers(res.data.my_family);
      setFamily(res.data);
    } else {
      setUsers((prev) =>
        prev.filter(
          (us) =>
            us.firstName !== userToDelete.firstName &&
            us.lastName !== userToDelete.lastName
        )
      );
    }
  };
  return (
    <div className={style.addUsers}>
      <Title text={'מי מחובר לאתגר?'}/>
      {users.length > 0
        ? users.map((userData) => {
            return (
              <div className={style.antdCard}>
                <Card
                  hoverable
                  className={style.antdCard}
                  key={`${userData.firstName} ${userData.lastName}`}
                  onClick={() => {
                    chooseUser(userData);
                  }}
                  cover={
                    <img
                    className={style.antdCardCover}
                      style={{
                        borderRadius: "50%",
                      }}
                      src={`https://avatar.oxro.io/avatar.svg?name=${userData.firstName} ${userData.lastName}`}
                    />
                  }
                >
                  <Meta
                    className={style.antdMetaPic}
                    title={`${userData.firstName} ${userData.lastName}`}
                  />
                  
                </Card>
                    <Button
                    onClick={() => {
                      deleteUser(userData);
                    }}
                    className={style.delete}
                  >
                    X
                  </Button>
              </div>
            );
          })
        : null}

      <div>
        <Card
          hoverable
          className={style.antdButAdd}
          onClick={() => {
            setOpenForm(true);
          }}
        >
          <Meta 
          className={style.antdMetaAdd} 
          title="הוספת בן משפחה לאתגר" 
        />
        </Card>
        {showAU && (
          <Button className={style.benBut} type="button" onClick={endRegister}>
            נא לאשר הוספת בן משפחה
          </Button>
        )}
      </div>
      {openForm ? (
        <Popup
        className={style.pop3}
          close={() => {
            setOpenForm(false);
          }}
        >
          <Form
            className={style.myForm}
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
            className={style.formItem}
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "נא למלא שם פרטי",
                },
              ]}
            >
              <Input placeholder="שם פרטי" />
            </Form.Item>

            <Form.Item
            className={style.formItem}
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "נא למלא שם משפחה",
                },
              ]}
            >
              <Input placeholder="שם משפחה" />
            </Form.Item>

            <Form.Item
            className={style.formItem}
  
            >
              <Button type="primary" className={style.antdMetaAdd}  htmlType="submit">
                להתחיל לחסוך
              </Button>
            </Form.Item>
          </Form>
        </Popup>
      ) : null}
    </div>
  );
}

