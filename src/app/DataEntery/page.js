"use client";
import React, { useEffect, useState } from "react";
import { Table, Input, Button, DatePicker, Select, message, Segmented, Form, Drawer, Space, Modal } from "antd";
import { BarsOutlined, AppstoreAddOutlined, PoweroffOutlined, SyncOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useRouter } from "next/navigation"; 
import { useScopeOne } from "../(Scopes)/ScopeOne/Context/ScopeOneContext";
import ParametersAndUnits from "../(Scopes)/ScopeOne/Activities/parameterAndUnit/page";
import NavBar from "@/Componants/NavBar";

const { confirm } = Modal;
const { Option } = Select;

const DataTable = () => {
  const { data, setData } = useScopeOne();
  const router = useRouter();
  const [view, setView] = useState("DataEntry");
  const [form] = Form.useForm();
  const [size, setSize] = useState();
  const [open, setOpen] = useState(false);
  const [loadings, setLoadings] = useState([]);
  const [currentRow, setCurrentRow] = useState(null);  // ✅ Store row being edited
  const [isEditMode, setIsEditMode] = useState(false); // ✅ Track if editing

  const onClose = () => {
    setOpen(false);
  };

  const showLargeDrawer = () => {
    setSize("large");
    setOpen(true);
  };

  const enterLoading = (index) => {
    location.reload();
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 2000);
  };

  // ✅ Edit function - Switch to DataEntry and pre-fill form
  const editRow = (row) => {
    setCurrentRow(row);        // Store the row being edited
    setIsEditMode(true);       // Set to edit mode
    setView("DataEntry");      // Switch to data entry view

    form.setFieldsValue({
      username: row.username,
      date: dayjs(row.date),
      shift: row.shift,
      goodsProduced: row.goodsProduced,
      scope1: row.scope1,
      scope2: row.scope2,
    });
  };

  // ✅ Handle form submission (both edit and add)
  const handleFormSubmit = async (values) => {
    const newRow = {
      record_date: values.date ? dayjs(values.date).format("YYYY-MM-DD") : "",
      username: values.username || "Unknown",
      shift: values.shift || "",
      goods_produced: values.goodsProduced || 0,
      scope1: values.scope1 || 0,
      scope2: values.scope2 || 0,
      co2_emitted: Number(values.scope1 || 0) + Number(values.scope2 || 0),
    };

    try {
      if (isEditMode && currentRow) {
        // ✅ Edit Mode: Update existing record
        const res = await fetch(`https://ghg-conversion-factors-backend.vercel.app/DashBoardData/Update/${currentRow.key}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newRow),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        message.success("Data updated successfully");

        // Update UI with edited row
        const newData = data.map((row) =>
          row.key === currentRow.key ? { ...row, ...newRow, isSaved: true } : row
        );
        setData(newData);
        
      } else {
        // ✅ Add Mode: Insert new record
        const response = await fetch("http://127.0.0.1:5000/DashBoardData", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newRow),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        message.success("Data saved successfully");

        setData((prevData) => [
          { key: Date.now(), ...newRow, isSaved: true },
          ...prevData,
        ]);
      }

      form.resetFields();
      setIsEditMode(false);  // Reset edit mode
      setCurrentRow(null);   // Clear current row

    } catch (error) {
      console.error("Error saving data:", error);
      message.error("Failed to save data");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://ghg-conversion-factors-backend.vercel.app/api/DashBoardData");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        const formattedData = data.map((row) => ({
          key: row.record_id,
          username: row.username || "Unknown",
          date: row.date || "",
          shift: row.shift || "N/A",
          goodsProduced: row.goodsProduced || 0,
          scope1: row.scope1 || 0,
          scope2: row.scope2 || 0,
          co2Emitted: row.co2Emitted || (Number(row.scope1 || 0) + Number(row.scope2 || 0)),
          isSaved: true,
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Date", dataIndex: "date", key: "date", render: (text) => (text ? dayjs(text).format("YYYY-MM-DD") : "") },
    { title: "Shift", dataIndex: "shift", key: "shift" },
    { title: "Goods Produced", dataIndex: "goodsProduced", key: "goodsProduced" },
    { title: "Scope 1", dataIndex: "scope1", key: "scope1" },
    { title: "Scope 2", dataIndex: "scope2", key: "scope2" },
    { title: "CO2 Emitted", dataIndex: "co2Emitted", key: "co2Emitted" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-4">
          <Button onClick={() => editRow(record)}>Edit</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <NavBar />
<div className="w-[1000] ml-[500] mt-[70] shadow-lg p-10 h-[700]">
<Segmented
        options={[
          { label: "Data Entry", value: "DataEntry", icon: <AppstoreAddOutlined /> },
          { label: "List", value: "List", icon: <BarsOutlined /> },
        ]}
        onChange={setView}
        value={view}
      />

      {view === "DataEntry" && (
        <Form form={form} onFinish={handleFormSubmit} layout="vertical" className="p-4">
        <Form.Item label="Username" name="username" initialValue="Current User">
          <Input placeholder="Enter Username" disabled />
        </Form.Item>

        <Form.Item label="Date" name="date" rules={[{ required: true, message: "Please select date" }]}>
          <DatePicker />
        </Form.Item>

        <Form.Item label="Shift" name="shift" rules={[{ required: true, message: "Select shift" }]}>
          <Select>
            <Option value="1">Shift 1</Option>
            <Option value="2">Shift 2</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Goods Produced" name="goodsProduced" rules={[{ required: true, message: "Enter production" }]}>
          <Input type="number" />
        </Form.Item>

        <Form.Item label="Scope 1" name="scope1">
          <Button  onClick={showLargeDrawer}>Parameters</Button>
        </Form.Item>

        <Form.Item label="Scope 2" name="scope2">
          <Input type="number" />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Save Data
        </Button>
      </Form>
      )}

      {view === "List" && <Table columns={columns} dataSource={data} pagination={false} />}
</div>

<Drawer
        title="Paramter"
        placement="right"
        size={size}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
      <ParametersAndUnits></ParametersAndUnits>
      </Drawer>
      
    </div>
  );
};

export default DataTable;
