import {
  Button,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useContext, useEffect, useState } from "react";
import { socketContext } from "../../pages/HomePage";

export default function DayTable() {
  const { socket } = useContext(socketContext);
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    let inputNode;
    if (inputType === "number" || inputType === "text")
      inputNode = inputType === "number" ? <InputNumber /> : <Input />;
    else
      inputNode = (
        <Upload
          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          listType="picture"
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
        </Upload>
      );
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `בבקשה הכנס ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
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
  useEffect(() => {
    if (socket) {
      socket.emit("getDaysData", {});
    }
  }, []);
  useEffect(() => {
    if (socket) {
      socket.on("updateDayData", (dataBase) => {
        setData(
          dataBase
            .sort((a, b) => a.dayNumber - b.dayNumber)
            .map((day) => {
              return {
                ...day,
                key: day.dayNumber,
                file: day.file ? (
                  <Button
                    onClick={() => {
                      downloadFile(day.file);
                    }}
                  >
                    הורד את קובץ {`${day.file ? day.file.split("/")[1] : ""}`}
                  </Button>
                ) : (
                  "לא קיים קובץ"
                ),
              };
            })
        );
      });
    }
  }, [socket]);
  const edit = (record) => {
    form.setFieldsValue({
      dayNumber: "",
      title: "",
      description: "",
      videoIdWhy: "",
      videoIdHow: "",
      file: "",
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      row.file = row.file.fileList ? row.file.fileList[0] : row.file;
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        socket.emit("updateDayData", {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {}
  };
  const columns = [
    {
      title: "יום מספר",
      dataIndex: "dayNumber",
      key: "dayNumber",
      editable: false,
    },
    {
      title: "כותרת",
      dataIndex: "title",
      key: "title",
      editable: true,
    },
    {
      title: "תיאור",
      dataIndex: "description",
      key: "description",
      editable: true,
    },
    {
      title: "וידאו id למה",
      dataIndex: "videoIdWhy",
      key: "videoIdWhy",
      editable: true,
    },
    {
      title: "וידאו id איך",
      dataIndex: "videoIdHow",
      key: "videoIdHow",
      editable: true,
    },
    {
      title: "קובץ",
      dataIndex: "file",
      key: "file",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              <p>שמור</p>
            </Typography.Link>
            <Popconfirm title="בטוח?" onConfirm={cancel}>
              <p>
                <a>ביטול</a>
              </p>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            ערוך
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => {
        return {
          record,
          inputType:
            col.dataIndex === "file"
              ? "file"
              : col.dataIndex === "dayNumber"
              ? "number"
              : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        };
      },
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
}
