"use client";

import React, { useState,useEffect } from "react";
import { Layout, Card, Statistic, Menu, Flex, DatePicker } from "antd";
import { FormOutlined, EditOutlined, TableOutlined, FileDoneOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell,AreaChart,Area } from "recharts";
import dayjs from "dayjs";
import Link from "next/link";
import NavBar from "@/Componants/NavBar";

import { useScopeOne } from "../(Scopes)/ScopeOne/Context/ScopeOneContext";

const { Content } = Layout;
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
  { date: "2025-03-29", goodsProduced: 420, co2Emitted: 540, scope1: 390, scope2: 350 },
  { date: "2025-03-30", goodsProduced: 400, co2Emitted: 520, scope1: 380, scope2: 340 },
]; 



export default function Dashboard() {
  const [data, setData] = useState([]);
  const [dateRange, setDateRange] = useState([dayjs().startOf("month"), dayjs().endOf("month")]);
  // const {data} = useScopeOne()
  

  console.log("data change",typeof(data))

  const Dashboard_Data = async () => {
    try {
      const response = await fetch("https://ghg-conversion-factors-backend.vercel.app/api/DashBoardData", {
        method: "GET",
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const res = await response.json();
      console.log("Response from Dashboard API:", res);
  
      return Array.isArray(res) ? res : []; // Ensure result is an array
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      return []; // Return empty array instead of null to avoid errors
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await Dashboard_Data();

      if (result.length > 0) { // Ensure there is data before mapping
        const formattedData = result.map((item) => ({
          date: item.date,
          goodsProduced: parseInt(item.goodsProduced, 10) || 0,
          co2Emitted: parseInt(item.co2Emitted, 10) || 0,
          scope1: parseInt(item.scope1, 10) || 0,
          scope2: parseInt(item.scope2, 10) || 0,
        }));

        console.log("Formatted Data:", formattedData);
        setData(formattedData);
      }
    };

    fetchData();
  }, []);

  // console.log("get from data entery page",data)


  const filterDataByDateRange = (data, startDate, endDate) => {
    return data.filter((item) => {
      const itemDate = dayjs(item.date);
      return itemDate.isAfter(startDate.subtract(1, "day")) && itemDate.isBefore(endDate.add(1, "day"));
    });
  };

  const filteredData = filterDataByDateRange(data, dateRange[0], dateRange[1]);

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

  useEffect(() => {
    console.log("Updated Data:", data);
  }, [data]);

  return (
    <Layout className="h-screen bg-white text-black">
      <NavBar />
      <Content className="p-4 sm:p-6 bg-white text-black">
        <h2 className="text-lg font-semibold sm:text-xl">CO₂ Emission Dashboard</h2>
        <div className="flex justify-center sm:justify-start mt-5">
          <RangePicker
            className="w-full sm:w-auto p-2 border border-gray-300 rounded-lg shadow-md hover:border-blue-500 focus:border-blue-600 transition duration-300 ease-in-out"
            defaultValue={dateRange}
            onChange={(dates) => setDateRange(dates || [dayjs().startOf("month"), dayjs().endOf("month")])}
            allowClear
          />
        </div>
        <div className="grid grid-cols-4 gap-5 mt-5">
          {[
            { title: "Total Goods Produced", key: "goodsProduced", value: totalGoods, color: "linear-gradient(185deg, rgba(205,233,255,1) 0%, rgba(131,202,255,1) 66%)" },
            { title: "Total CO₂ Emitted (kg)", key: "co2Emitted", value: totalCO2, color: "linear-gradient(185deg, rgba(255,240,205,1) 23%, rgba(226,177,145,1) 91%)" },
            { title: "Scope 1 Emissions", key: "scope1", value: totalScope1, color: "linear-gradient(185deg, rgba(255, 255, 205, 1) 0%, rgba(255, 255, 131, 1) 66%)" },
            { title: "Scope 2 Emissions", key: "scope2", value: totalScope2, color: "linear-gradient(185deg, rgba(255, 255, 205, 1) 0%, rgba(255, 255, 131, 1) 66%)" },
          ].map((item) => (
            <Card key={item.key} className="relative p-5 text-white rounded-lg shadow-lg overflow-hidden" style={{ background: item.color }}>
              <div className="absolute inset-0 z-0 pointer-events-auto mt-10 opacity-90">
                <ResponsiveContainer width="100%" height={120}>
                  {item.key === "co2Emitted" ? (
                    <AreaChart data={filteredData} className="mt-10 w-[100]">
                      <defs>
                        <linearGradient id="colorCO2" x1="1" y1="0" x2="10" y2="10">
                          <stop offset="95%" stopColor="black" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" hide />
                      <YAxis hide />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-gray-800 p-2 rounded shadow-lg opacity-80">
                                <p className="text-sm">{`Date: ${label}`}</p>
                                <p className="text-sm">{`${item.title}: ${payload[0].value}`}</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Area type="monotone" dataKey="co2Emitted" stroke="white" fill="url(#colorCO2)" strokeWidth={2} />
                    </AreaChart>
                  ) : (
                    <LineChart data={filteredData}>
                      <XAxis dataKey="date" hide />
                      <YAxis hide />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-gray-800 text-white p-2 rounded shadow-lg">
                                <p className="text-sm">{`Date: ${label}`}</p>
                                <p className="text-sm">{`${item.title}: ${payload[0].value}`}</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Line type="monotone" dataKey={item.key} stroke="white" strokeWidth={2} />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </div>
              <div className="relative z-10">
                <Statistic
                  title={<span style={{ fontSize: "24px", color: "black" }}>{item.title}</span>}
                  value={item.value}
                  valueStyle={{ fontSize: "36px", color: "black", fontWeight: "bold" }}
                  className="font-semibold"
                />
              </div>
            </Card>
          ))}
        </div>

        <Flex className="w-full p-5 flex flex-col lg:flex-row gap-10 mt-10">
          <div className="w-full lg:w-1/2">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Daily Goods Produced vs CO₂ Emitted</h3>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="goodsProduced" fill="#72b2f2" name="Goods Produced" />
                  <Bar dataKey="co2Emitted" name="CO₂ Emitted" fill="#f87171">
                    {filteredData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="#f87171" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Cumulative Goods Produced & CO₂ Emissions</h3>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={cumulativeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="cumulativeGoods" stroke="#72b2f2" name="Cumulative Goods" strokeWidth={3.5} />
                  <Line type="monotone" dataKey="cumulativeCO2" stroke="#f87171" name="Cumulative CO₂" strokeWidth={3.5} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Flex>
      </Content>
    </Layout>
  );
}