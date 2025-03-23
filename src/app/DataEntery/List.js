"use client";
import React, { useEffect, useState } from "react";
import { Table, Button, message } from "antd";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import NavBar from "@/Componants/NavBar";

const List = () => {
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://ghg-conversion-factors-backend.vercel.app/api/DashBoardData");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        
        const formattedData = responseData.map((row, index) => ({
          key: row.record_id,  // Use unique ID
          username: row.username || "Unknown",
          date: row.date ? dayjs(row.date).format("YYYY-MM-DD") : "",
          shift: row.shift || "N/A",
          goodsProduced: row.goodsProduced || 0,
          scope1: row.scope1 || 0,
          scope2: row.scope2 || 0,
          co2Emitted: row.co2Emitted || (Number(row.scope1 || 0) + Number(row.scope2 || 0)),
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

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
    },
    {
      title: "Shift",
      dataIndex: "shift",
      key: "shift",
    },
    {
      title: "Goods Produced",
      dataIndex: "goodsProduced",
      key: "goodsProduced",
    },
    {
      title: "Scope 1",
      dataIndex: "scope1",
      key: "scope1",
    },
    {
      title: "Scope 2",
      dataIndex: "scope2",
      key: "scope2",
    },
    {
      title: "CO2 Emitted",
      dataIndex: "co2Emitted",
      key: "co2Emitted",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-4">
          <Button type="default" onClick={() => router.push(`/ScopeOne/Activities/edit/${record.key}`)}>
            Edit
          </Button>
          <Button type="default" danger>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <NavBar />
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />
    </div>
  );
};

export default List;
