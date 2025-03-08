"use client";

import React, { useState, useEffect } from "react";
import { Layout, Button, Typography, Drawer, DatePicker, Card, Statistic, Menu } from "antd";
import { MenuOutlined, FormOutlined, EditOutlined, TableOutlined, FileDoneOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

const { Header, Content } = Layout;
const { Title } = Typography;
const { RangePicker } = DatePicker;


const dummyData = [
  { date: "2025-03-01", goodsProduced: 100, co2Emitted: 200, scope1: 120, scope2: 80 },
  { date: "2025-03-02", goodsProduced: 150, co2Emitted: 250, scope1: 140, scope2: 110 },
  { date: "2025-03-03", goodsProduced: 130, co2Emitted: 230, scope1: 135, scope2: 105 },
  { date: "2025-03-04", goodsProduced: 180, co2Emitted: 280, scope1: 160, scope2: 130 },
  { date: "2025-03-05", goodsProduced: 170, co2Emitted: 260, scope1: 150, scope2: 120 },
  { date: "2025-03-06", goodsProduced: 200, co2Emitted: 300, scope1: 180, scope2: 150 },
  { date: "2025-03-07", goodsProduced: 190, co2Emitted: 290, scope1: 175, scope2: 145 },
  { date: "2025-03-08", goodsProduced: 210, co2Emitted: 320, scope1: 190, scope2: 160 },
  { date: "2025-03-09", goodsProduced: 250, co2Emitted: 350, scope1: 220, scope2: 180 },
  { date: "2025-03-10", goodsProduced: 230, co2Emitted: 330, scope1: 210, scope2: 170 },
  { date: "2025-03-11", goodsProduced: 260, co2Emitted: 370, scope1: 230, scope2: 190 },
  { date: "2025-03-12", goodsProduced: 240, co2Emitted: 350, scope1: 220, scope2: 180 },
  { date: "2025-03-13", goodsProduced: 280, co2Emitted: 390, scope1: 250, scope2: 210 },
  { date: "2025-03-14", goodsProduced: 260, co2Emitted: 370, scope1: 240, scope2: 200 },
  { date: "2025-03-15", goodsProduced: 290, co2Emitted: 400, scope1: 260, scope2: 220 },
  { date: "2025-03-16", goodsProduced: 270, co2Emitted: 380, scope1: 250, scope2: 210 },
  { date: "2025-03-17", goodsProduced: 310, co2Emitted: 420, scope1: 280, scope2: 240 },
  { date: "2025-03-18", goodsProduced: 290, co2Emitted: 400, scope1: 270, scope2: 230 },
  { date: "2025-03-19", goodsProduced: 320, co2Emitted: 440, scope1: 290, scope2: 250 },
  { date: "2025-03-20", goodsProduced: 300, co2Emitted: 420, scope1: 280, scope2: 240 },
  { date: "2025-03-21", goodsProduced: 340, co2Emitted: 460, scope1: 310, scope2: 270 },
  { date: "2025-03-22", goodsProduced: 320, co2Emitted: 440, scope1: 300, scope2: 260 },
  { date: "2025-03-23", goodsProduced: 360, co2Emitted: 480, scope1: 330, scope2: 290 },
  { date: "2025-03-24", goodsProduced: 340, co2Emitted: 460, scope1: 320, scope2: 280 },
  { date: "2025-03-25", goodsProduced: 380, co2Emitted: 500, scope1: 350, scope2: 310 },
  { date: "2025-03-26", goodsProduced: 360, co2Emitted: 480, scope1: 340, scope2: 300 },
  { date: "2025-03-27", goodsProduced: 400, co2Emitted: 520, scope1: 370, scope2: 330 },
  { date: "2025-03-28", goodsProduced: 380, co2Emitted: 500, scope1: 360, scope2: 320 },
  { date: "2025-03-29", goodsProduced: 420, co2Emitted: 840, scope1: 390, scope2: 350 },
  { date: "2025-03-30", goodsProduced: 400, co2Emitted: 820, scope1: 380, scope2: 340 },
];

const filterDataByDateRange = (data, startDate, endDate) => {
  return data.filter((item) => {
    const itemDate = dayjs(item.date);
    return itemDate.isAfter(startDate.subtract(1, "day")) && itemDate.isBefore(endDate.add(1, "day"));
  });
};

export default function Dashboard() {
  const router = useRouter();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [dateRange, setDateRange] = useState([dayjs().startOf("month"), dayjs().endOf("month")]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userName = localStorage.getItem("username");
      if (userName) setUserId(userName);
    }
  }, []);

  const filteredData = filterDataByDateRange(dummyData, dateRange[0], dateRange[1]);

  const totalGoods = filteredData.reduce((sum, item) => sum + item.goodsProduced, 0);
  const totalCO2 = filteredData.reduce((sum, item) => sum + item.co2Emitted, 0);
  const totalScope1 = filteredData.reduce((sum, item) => sum + item.scope1, 0);
  const totalScope2 = filteredData.reduce((sum, item) => sum + item.scope2, 0);

  let cumulativeGoods = 0;
  let cumulativeCO2 = 0;
  const cumulativeData = filteredData.map((item) => {
    cumulativeGoods += item.goodsProduced;
    cumulativeCO2 += item.co2Emitted;
    return { date: item.date, cumulativeGoods, cumulativeCO2 };
  });

  return (
    <Layout className="h-screen bg-white text-black">
      <Header className="shadow-md flex items-center px-4 sm:px-6 h-[80px] bg-white text-black">
        <Button icon={<MenuOutlined />} type="text" onClick={() => setDrawerVisible(true)} className="text-xl mr-4 text-gray-800" />
        <Title level={3} className="m-0 flex-1 mt-3 text-lg sm:text-xl">Dashboard</Title>
        <span className="mr-4 text-sm sm:text-base">{userId}</span>
      </Header>

      <Drawer title="Menu" placement="left" onClose={() => setDrawerVisible(false)} visible={drawerVisible} className="bg-white">
        <Menu>
          <Menu.Item icon={<FormOutlined />}><Link href="/ScopeOne">Create Template</Link></Menu.Item>
          <Menu.Item icon={<EditOutlined />}><Link href="/TemplateSelector">Edit Template</Link></Menu.Item>
          <Menu.Item icon={<TableOutlined />}><Link href="/ScopeOne">Enter Actual Data</Link></Menu.Item>
          <Menu.Item icon={<FileDoneOutlined />}><Link href="/ScopeOne">Enter Target Data</Link></Menu.Item>
          <Menu.Item icon={<CheckCircleOutlined />}><Link href="/ScopeOne">Validate Actual Data</Link></Menu.Item>
          <Menu.Item icon={<CheckCircleOutlined />}><Link href="/ScopeOne">Validate Target Data</Link></Menu.Item>
        </Menu>
      </Drawer>

      <Content className="p-4 sm:p-6 bg-white text-black">
        <h2 className="text-lg sm:text-xl">CO₂ Emission Dashboard</h2>
        <RangePicker className="mt-5 w-full sm:w-auto" defaultValue={dateRange} onChange={(dates) => setDateRange(dates || [dayjs().startOf("month"), dayjs().endOf("month")])} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          {[
            { title: "Total Goods Produced", key: "goodsProduced", value: totalGoods },
            { title: "Total CO₂ Emitted (kg)", key: "co2Emitted", value: totalCO2 },
            { title: "Scope 1 Emissions", key: "scope1", value: totalScope1 },
            { title: "Scope 2 Emissions", key: "scope2", value: totalScope2 },
          ].map((item) => (
            <Card
              key={item.key}
              className={`p-4 text-white rounded-lg shadow-lg ${
                item.value < 200 ? "bg-[#82ca9d]" : item.value < 400 ? "bg-yellow-400" : "bg-red-400"
              }`}
            >
              <Statistic
                title={<span style={{ fontSize: "26px", fontWeight: "bold", color: "black" }}>{item.title}</span>}
                value={item.value}
                valueStyle={{ fontSize: "45px", color: "white" }}
                className="font-semibold"
              />
            </Card>
          ))}
        </div>

        <h3 className="text-lg sm:text-xl mt-8">Daily Goods Produced vs CO₂ Emitted</h3>
        <ResponsiveContainer width="100%" height={300} className="mt-5">
          <BarChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="goodsProduced" fill="#8884d8" name="Goods Produced" />
            <Bar dataKey="co2Emitted" name="CO₂ Emitted">
              {filteredData.map((entry, index) => {
                let color = "#00c49f"; // Default green
                if (entry.co2Emitted > 800) {
                  color = "red";
                } else if (entry.co2Emitted > 400) {
                  color = "orange";
                } else if (entry.co2Emitted > 200) {
                  color = "yellow";
                }
                return <Cell key={`cell-${index}`} fill={color} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <h3 className="text-lg sm:text-xl mt-8">Cumulative Goods Produced & CO₂ Emissions</h3>
        <ResponsiveContainer width="100%" height={300} className="mt-5">
          <LineChart data={cumulativeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="cumulativeGoods" stroke="#8884d8" name="Cumulative Goods" />
            <Line type="monotone" dataKey="cumulativeCO2" stroke="#82ca9d" name="Cumulative CO₂" />
          </LineChart>
        </ResponsiveContainer>
      </Content>
    </Layout>
  );
}