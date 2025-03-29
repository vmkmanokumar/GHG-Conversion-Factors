"use client";
import React, { useEffect, useState } from "react";
import { Table, Input, Button, DatePicker, Select, message, Segmented, Form, Drawer, Space, Modal } from "antd";
import { BarsOutlined, AppstoreAddOutlined, PoweroffOutlined, SyncOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useScopeOne } from "../(Scopes)/ScopeOne/Context/ScopeOneContext";
import ParametersAndUnits from "../(Scopes)/ScopeOne/Activities/parameterAndUnit/page";
import NavBar from "@/Componants/NavBar";

const { confirm } = Modal;
const { Option } = Select;

const DataTable = () => {
  const [scopeOneTotal, setScopeOneTotal] = useState(null);
  const { data, setData ,user_Id,setUser_Id} = useScopeOne();

  console.log("userID",user_Id)

  const [templateId,setTemplateId] = useState(null)

  console.log("templateID",templateId)


  const router = useRouter();
  const [view, setView] = useState("DataEntry");
  const [form] = Form.useForm();
  const [size, setSize] = useState();
  const [open, setOpen] = useState(false);
  const [loadings, setLoadings] = useState([]);
  const [currentRow, setCurrentRow] = useState(null);  // ✅ Store row being edited
  const [isEditMode, setIsEditMode] = useState(false); // ✅ Track if editing
  const [messageApi, contextHolder] = message.useMessage();
  

  const onClose = () => {
    setOpen(false);
  };


  const showLargeDrawer = () => {
    setSize("large");
    setOpen(true);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUser = localStorage.getItem("username");
      if (currentUser) {
        setUser_Id(currentUser);  
        form.setFieldsValue({ username: currentUser });  // ✅ Set the form value dynamically
      }
    }
  }, [form]);
  
  

  const enterLoading = (index) => {

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
    setView("DataEntry");

    // Switch to data entry view

    setScopeOneTotal(row.scope1);
    // setScopeOneTotal(row.username)

    form.setFieldsValue({
      username: user_Id,
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
      scope1: scopeOneTotal || 0,
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

        messageApi.success("Data updated successfully");

        // Update UI with edited row
        const newData = data.map((row) =>
          row.key === currentRow.key ? { ...row, ...newRow, isSaved: true } : row
        );
        setData(newData);

      } else {
        // ✅ Add Mode: Insert new record
        const response = await fetch("https://ghg-conversion-factors-backend.vercel.app/DashBoardData", {
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

// ✅ Move fetchData outside of useEffect
const fetchData = async () => {
  try {
    const templateId = JSON.parse(localStorage.getItem("templatID"))[0];  // ✅ Parse the ID properly

    const response = await fetch(`https://ghg-conversion-factors-backend.vercel.app/api/DashBoardData?Template_Id=${templateId}`);

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


useEffect(() => {
  // const templateId = localStorage.getItem("templatID")
  // const parsedId = JSON.parse(templateId);
  // if(parsedId){
  //   setTemplateId(parsedId[0])
  // } 
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
      {contextHolder}
      <div className="w-[1400] ml-[280] mt-[40] shadow-lg p-10 h-[800]">
        <Segmented
          options={[
            { label: "Data Entry", value: "DataEntry", icon: <AppstoreAddOutlined /> },
            { label: "List", value: "List", icon: <BarsOutlined /> },
          ]}
          onChange={setView}
          value={view}
        />

        {view === "DataEntry" && (
          <>
          <Form form={form} onFinish={handleFormSubmit} layout="vertical" className="p-4 mt-10">
            <Form.Item label="Username" name="username" initialValue={user_Id}>
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
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Button onClick={showLargeDrawer} icon={<PlusOutlined />}>Parameters</Button><span className="ml-3">{scopeOneTotal}</span>
              </div>
            </Form.Item>

            <Form.Item label="Scope 2" name="scope2" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Save Data
            </Button>
          </Form>
          </>
        )}

{view === "List" && (
  <div className="mt-5"> 
    {/* ✅ Refresh and Date Filter */}
    <div className="flex justify-between mb-4">
      {/* ✅ Date Filter */}
      <DatePicker.RangePicker
        onChange={(dates) => {
          if (dates && dates.length === 2) {
            const [startDate, endDate] = dates;
            const filtered = data.filter((item) => {
              const itemDate = dayjs(item.date);
              return itemDate.isAfter(startDate.subtract(1, "day")) && itemDate.isBefore(endDate.add(1, "day"));
            });
            setData(filtered);  // ✅ Update with filtered data
          } else {
            fetchData();        // ✅ Reset to full data when cleared
          }
        }}
      />

      {/* ✅ Refresh Button with Animation */}
      <Button 
        type="primary" 
        icon={<SyncOutlined />} 
        onClick={async () => {
          setLoadings([true]);          // ✅ Show loading animation
          await fetchData();            // ✅ Fetch the data
          setLoadings([false]);         // ✅ Hide loading animation
        }}
        loading={loadings[0]}           // ✅ Display spinner while loading
      >
        {loadings[0] ? "Refreshing..." : "Refresh"}
      </Button>
    </div>

    {/* ✅ Scrollable container */}
    <div>
      <Table
        className="mt-10"
        columns={columns}
        dataSource={[...data].sort((a, b) => new Date(b.date) - new Date(a.date))}  
        pagination={false}
        scroll={{ y: 550 }}
      />
    </div>
  </div>
)}




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
        <ParametersAndUnits setScopeOneTotal={setScopeOneTotal} scopeOneTotal={scopeOneTotal}></ParametersAndUnits>
      </Drawer>

    </div>
  );
};

export default DataTable;