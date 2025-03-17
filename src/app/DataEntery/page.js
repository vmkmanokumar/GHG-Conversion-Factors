"use client"
import React, { useEffect, useState } from "react";
import { Table, Input, Button, DatePicker, Select, message } from "antd";
import dayjs from "dayjs";
// import { ExclamationCircleFilled } from "@ant-design/icons";



import { useScopeOne } from "../(Scopes)/ScopeOne/Context/ScopeOneContext";

import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";

const { confirm } = Modal;

const { Option } = Select;

const DataTable = () => {

  const {data,setData} = useScopeOne()



  // Function to add a new row
  const addRow = () => {
    const newRow = {
      key: Date.now(),
      username: "Current User",
      date: null, // User selects date
      shift: "",
      goodsProduced: "",
      scope1: "",
      scope2: "",
      co2Emitted: 0,
      isSaved: false, // Editable before saving
    };
    setData([newRow, ...data]);
  };

  // Function to update a row field
  const updateRow = (key, field, value) => {
    const newData = data.map((row) => {
      if (row.key === key) {
        let updatedRow = { ...row, [field]: value };
  
        // Ensure CO2 emitted is updated dynamically
        if (field === "scope1" || field === "scope2") {
          updatedRow.co2Emitted =
            Number(updatedRow.scope1 || 0) + Number(updatedRow.scope2 || 0);
        }
  
        return updatedRow;
      }
      return row;
    });
    setData(newData);
  };
  
  // Function to save row (lock editing)
  const saveRow = async (key) => {
    const updatedRow = data.find((row) => row.key === key);
    
    if (!updatedRow) return;
  
    const formattedData = {
      record_date: updatedRow.date, // Ensure date is correctly formatted
      username: updatedRow.username,
      goods_produced: updatedRow.goodsProduced,
      co2_emitted: updatedRow.co2Emitted,
      scope1: updatedRow.scope1,
      scope2: updatedRow.scope2,
      shift: updatedRow.shift,
    };
  
    try {
      const response = await fetch("https://ghg-conversion-factors-backend.vercel.app/DashBoardData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData), // Send latest row data
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      message.success("Data saved successfully");
  
      const responseData = await response.json();
      console.log("Response from server:", responseData);
  
      // Mark the row as saved and update its values
      const newData = data.map((row) =>
        row.key === key ? { ...row, ...formattedData, isSaved: true } : row
      );
      setData(newData);
  
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };
  
  const deleteRow = (key) => {
    console.log("keys", key);
    
    Modal.confirm({
      title: "Are you sure you want to delete this record?",
      icon: <ExclamationCircleFilled />,
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        try {
          const response = await fetch(`https://ghg-conversion-factors-backend.vercel.app/DashBoardData/Delete/${key}`, {
            method: "DELETE",
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const responseData = await response.json();
          console.log("Response from server:", responseData);
  
          // Remove deleted row from UI
          setData((prevData) => prevData.filter((row) => row.key !== key));
  
          message.success("Record deleted successfully");
        } catch (error) {
          console.error("Error deleting data:", error);
          message.error("Failed to delete record");
        }
      },
      onCancel() {
        console.log("Delete action canceled");
      },
    });
    console.log("maoj")
  };
  
  
  const UpdateRow = async (key) => {
    const updatedRow = data.find((row) => row.key === key);
  
    if (!updatedRow) return;
  
    const formattedData = {
      record_date: updatedRow.date, // Ensure date format
      username: updatedRow.username,
      goods_produced: updatedRow.goodsProduced,
      co2_emitted: updatedRow.co2Emitted,
      scope1: updatedRow.scope1,
      scope2: updatedRow.scope2,
      shift: updatedRow.shift,
    };
  
    try {
      const res = await fetch(`https://ghg-conversion-factors-backend.vercel.app/DashBoardData/Update/${key}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData), // Send updated row data
      });
  
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      const responseData = await res.json();
      console.log("Response from server:", responseData);
  
      message.success("Data updated successfully");
  
      // Mark row as saved after updating
      const newData = data.map((row) =>
        row.key === key ? { ...row, isSaved: true } : row
      );
      setData(newData);
  
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  

const editRow = (key) => {

  console.log("edit",key)

  const newData = data.map((row) =>
    row.key === key ? { ...row, isSaved: false } : row
  );
  setData(newData);
};

 // Runs only on the first render

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch("https://ghg-conversion-factors-backend.vercel.app/api/DashBoardData");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      console.log("Fetched Data:", data); // Debugging step

      // Ensure correct key names and add missing fields with defaults
      const formattedData = data.map((row, index) => ({
        key: row.record_id, // Ensure unique key
        username: row.username || "Unknown",
        date: row.date || "", // Handle missing date
        shift: row.shift || "N/A",
        goodsProduced: row.goodsProduced || 0,
        scope1: row.scope1 || 0,
        scope2: row.scope2 || 0,
        co2Emitted: row.co2Emitted || (Number(row.scope1 || 0) + Number(row.scope2 || 0)),
        isSaved: true, // Mark as saved since fetched from DB
      }));

      setData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, []);



  // Function to disable future dates in DatePicker
  const disableFutureDates = (current) => {
    return current && current > dayjs().endOf("day"); // Only allows today & past dates
  };

  // Table columns
  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text, record) =>
        record.isSaved ? (
          text
        ) : (
          <DatePicker
            value={text ? dayjs(text) : null}
            onChange={(date, dateString) => updateRow(record.key, "date", dateString)}
            disabledDate={disableFutureDates} // Restrict future dates
          />
        ),
    },
    {
      title: "Shift",
      dataIndex: "shift",
      key: "shift",
      render: (text, record) =>
        record.isSaved ? (
          text
        ) : (
          <Select
            style={{ width: 120 }}
            value={text}
            onChange={(value) => updateRow(record.key, "shift", value)}
          >
            <Option value="1">Shift 1</Option>
            <Option value="2">Shift 2</Option>
          
          </Select>
        ),
    },
    {
      title: "Total Goods Produced",
      dataIndex: "goodsProduced",
      key: "goodsProduced",
      render: (text, record) =>
        record.isSaved ? (
          text
        ) : (
          <Input
            type="number"
            value={text}
            onChange={(e) => updateRow(record.key, "goodsProduced", e.target.value)}
          />
        ),
    },
    {
      title: "Scope 1",
      dataIndex: "scope1",
      key: "scope1",
      render: (text, record) =>
        record.isSaved ? (
          text
        ) : (
          <Input
            type="number"
            value={text}
            onChange={(e) => updateRow(record.key, "scope1", e.target.value)}
          />
        ),
    },
    {
      title: "Scope 2",
      dataIndex: "scope2",
      key: "scope2",
      render: (text, record) =>
        record.isSaved ? (
          text
        ) : (
          <Input
            type="number"
            value={text}
            onChange={(e) => updateRow(record.key, "scope2", e.target.value)}
          />
        ),
    },
    {
      title: "co2Emitted",
      dataIndex: "co2Emitted",
      key: "co2Emitted",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) =>
        record.isSaved ? (
          <div className="flex gap-4">
          <Button type="default" onClick={() => editRow(record.key)}>
            Edit
          </Button>
          <Button type="default" className="!bg-red-600" onClick={() => {
  console.log("Delete button clicked for key:", record.key);
  deleteRow(record.key);
}}>
  Delete
</Button>

        
          </div>
          

        ) : (
        <>
        <Button type="primary" onClick={() => saveRow(record.key)}>
            Save
          </Button> 
          <Button type="primary" onClick={() => UpdateRow(record.key)}>
            Update
          </Button> 

        
        </>
          
        ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={addRow} style={{ marginBottom: 16 }}>
        Add
      </Button>
      <Table columns={columns} dataSource={data} pagination={false} virtual />
    </div>
  );
};

export default DataTable;
