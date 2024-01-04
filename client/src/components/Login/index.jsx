import React, { useContext } from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import style from "./style.module.css";
import { familyContext } from "../../Layout";
import axios from "axios";

export default function Login() {
  const nav = useNavigate();
  const { family, setFamily } = useContext(familyContext);
  const onFinish = async (values) => {
    const res = await axios.post(
      `${import.meta.env.VITE_BASIC_SERVER}api/login`,
      values
    );
    setFamily(res.data)
    nav("../choseuser");
  };
  const onFinishFailed = (errorInfo) => {
  };
  return (
    <div className={style.login}>
      <Form
        className={style.form}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "נא למלא אימייל תקין",
            },
          ]}
        >
          <Input placeholder="דואר אלקטרוני או שם משתמש" className={style.input_item} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "נא להזין סיסמא",
            },
          ]}
        >
          <Input.Password placeholder="נא להכניס סיסמה" className={style.input_item} />
        </Form.Item>

        <Form.Item className={style.form_item}>
          <Button type="primary" htmlType="submit" className={style.Button}>
            כניסה לאתגר
          </Button>
        </Form.Item>


      
      </Form>
      <Button
        type="link"
        htmlType="button"
        onClick={() => {
          nav("./forgot");
        }}
        className={style.link_button}
      >
        שכחתי סיסמה
      </Button>
      <div className={style.web_connection}>
        <div className={style.line_separator}>או</div>
      </div>
      <Button
        type="link"
        htmlType="button"
        onClick={() => {
          nav("./register");
        }}
        className={style.link_button}
      >
        מעוניין להירשם לאתגר
      </Button>
    </div>
  );
}
