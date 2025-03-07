"use client";

import React, { useState ,useEffect} from "react";
import { Layout, Button, Typography, Switch, Drawer, DatePicker, Card, Statistic, Menu } from "antd";
import { MenuOutlined, ArrowLeftOutlined, SunOutlined, MoonOutlined, FormOutlined, EditOutlined, TableOutlined, FileDoneOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

const { Header, Content } = Layout;
const { Title } = Typography;
const { RangePicker } = DatePicker;

const dummyData = [
  { date: "2025-03-01", goodsProduced: 100, co2Emitted: 200, scope1: 120, scope2: 80 },
  { date: "2025-03-02", goodsProduced: 150, co2Emitted: 250, scope1: 140, scope2: 110 },
  { date: "2025-03-03", goodsProduced: 180, co2Emitted: 300, scope1: 160, scope2: 140 },
  { date: "2025-03-04", goodsProduced: 200, co2Emitted: 350, scope1: 180, scope2: 170 },
  { date: "2025-03-05", goodsProduced: 220, co2Emitted: 380, scope1: 200, scope2: 180 },
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
      <Header className="shadow-md flex items-center px-6 h-[80px] bg-white text-black">
        <Button icon={<MenuOutlined />} type="text" onClick={() => setDrawerVisible(true)} className="text-xl mr-4 text-gray-800" />
        <Button icon={<ArrowLeftOutlined />} type="text" onClick={() => router.back()} className="text-xl mr-4 text-gray-800" />
        <Title level={3} className="m-0 flex-1">Dashboard</Title>
        <span className="mr-4">{userId}</span>
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
        <h2>CO₂ Emission Dashboard</h2>
        <RangePicker defaultValue={dateRange} onChange={(dates) => setDateRange(dates || [dayjs().startOf("month"), dayjs().endOf("month")])} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 20 }}>
          <Card className="bg-white"><Statistic title="Total Goods Produced" value={totalGoods} /></Card>
          <Card className="bg-white"><Statistic title="Total CO₂ Emitted (kg)" value={totalCO2} /></Card>
          <Card className="bg-white"><Statistic title="Scope 1 Emissions" value={totalScope1} /></Card>
          <Card className="bg-white"><Statistic title="Scope 2 Emissions" value={totalScope2} /></Card>
        </div>

        <h3>Daily Goods Produced vs CO₂ Emitted</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="goodsProduced" fill="#8884d8" name="Goods Produced" />
            <Bar dataKey="co2Emitted" fill="#82ca9d" name="CO₂ Emitted" />
          </BarChart>
        </ResponsiveContainer>

        <h3>Cumulative Goods Produced & CO₂ Emissions</h3>
        <ResponsiveContainer width="100%" height={300}>
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