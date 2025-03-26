"use client";

import React, { useState, useEffect } from "react";
import { Layout, Card, Statistic, Menu, Flex, DatePicker ,Select} from "antd";

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, AreaChart, Area, } from "recharts";
import dayjs from "dayjs";
import NavBar from "@/Componants/NavBar";

import { useScopeOne } from "../(Scopes)/ScopeOne/Context/ScopeOneContext";

const { Content } = Layout;
const { RangePicker } = DatePicker;
const { Option } = Select;

const dummyData = [
  { date: "2025-03-01", goodsProduced: 100, co2Emitted: 200, scope1: 120, scope2: 80, shift: 1 },
  { date: "2025-03-01", goodsProduced: 150, co2Emitted: 250, scope1: 140, scope2: 110, shift: 2 },
  { date: "2025-03-03", goodsProduced: 130, co2Emitted: 230, scope1: 135, scope2: 105, shift: 2 },
  { date: "2025-03-03", goodsProduced: 180, co2Emitted: 280, scope1: 160, scope2: 130, shift: 2 },
  { date: "2025-03-05", goodsProduced: 170, co2Emitted: 260, scope1: 150, scope2: 120, shift: 1 },
  { date: "2025-03-06", goodsProduced: 200, co2Emitted: 300, scope1: 180, scope2: 150, shift: 1 },
  { date: "2025-03-07", goodsProduced: 190, co2Emitted: 290, scope1: 175, scope2: 145, shift: 1 },
  { date: "2025-03-08", goodsProduced: 210, co2Emitted: 320, scope1: 190, scope2: 160, shift: 1 },
  { date: "2025-03-09", goodsProduced: 250, co2Emitted: 350, scope1: 220, scope2: 180, shift: 1 },
  { date: "2025-03-10", goodsProduced: 230, co2Emitted: 330, scope1: 210, scope2: 170, shift: 1 },
  { date: "2025-03-10", goodsProduced: 260, co2Emitted: 370, scope1: 230, scope2: 190, shift: 1 },
  { date: "2025-03-12", goodsProduced: 240, co2Emitted: 350, scope1: 220, scope2: 180, shift: 1 },
  { date: "2025-03-13", goodsProduced: 280, co2Emitted: 390, scope1: 250, scope2: 210, shift: 1 },
  { date: "2025-03-14", goodsProduced: 260, co2Emitted: 370, scope1: 240, scope2: 200, shift: 1 },
  { date: "2025-03-15", goodsProduced: 290, co2Emitted: 400, scope1: 260, scope2: 220, shift: 1 },
  { date: "2025-03-16", goodsProduced: 270, co2Emitted: 380, scope1: 250, scope2: 210, shift: 1 },
  { date: "2025-03-17", goodsProduced: 310, co2Emitted: 420, scope1: 280, scope2: 240, shift: 1 },
  { date: "2025-03-18", goodsProduced: 290, co2Emitted: 400, scope1: 270, scope2: 230, shift: 1 },
  { date: "2025-03-19", goodsProduced: 320, co2Emitted: 440, scope1: 290, scope2: 250, shift: 1 },
  { date: "2025-03-20", goodsProduced: 300, co2Emitted: 420, scope1: 280, scope2: 240, shift: 1 },
  { date: "2025-03-21", goodsProduced: 340, co2Emitted: 460, scope1: 310, scope2: 270, shift: 1 },
  { date: "2025-03-22", goodsProduced: 320, co2Emitted: 440, scope1: 300, scope2: 260, shift: 1 },
  { date: "2025-03-23", goodsProduced: 360, co2Emitted: 480, scope1: 330, scope2: 290, shift: 1 },
  { date: "2025-03-24", goodsProduced: 340, co2Emitted: 460, scope1: 320, scope2: 280, shift: 1 },
  { date: "2025-03-25", goodsProduced: 380, co2Emitted: 500, scope1: 350, scope2: 310, shift: 1 },
  { date: "2025-03-26", goodsProduced: 360, co2Emitted: 480, scope1: 340, scope2: 300, shift: 1 },
  { date: "2025-03-27", goodsProduced: 400, co2Emitted: 520, scope1: 370, scope2: 330, shift: 1 },
  { date: "2025-03-28", goodsProduced: 380, co2Emitted: 500, scope1: 360, scope2: 320, shift: 1 },
  { date: "2025-03-29", goodsProduced: 420, co2Emitted: 540, scope1: 390, scope2: 350, shift: 1 },
  { date: "2025-03-30", goodsProduced: 400, co2Emitted: 520, scope1: 380, scope2: 340, shift: 1 },
];



export default function Dashboard() {
  const [data, setData] = useState([]);
  const [dateRange, setDateRange] = useState([dayjs().startOf("month"), dayjs().endOf("month")]);
  
  // const {data} = useScopeOne()


  console.log("data change", typeof (data))

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

      console.log("dashbord",result)

      if (result.length > 0) { // Ensure there is data before mapping
        const formattedData = result.map((item) => ({
          date: item.date,
          goodsProduced: parseInt(item.goodsProduced, 10) || 0,
          co2Emitted: parseInt(item.co2Emitted, 10) || 0,
          scope1: parseInt(item.scope1, 10) || 0,
          scope2: parseInt(item.scope2, 10) || 0,
          shift:parseInt(item.shift,10) || 0
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


  const [selectedShift, setSelectedShift] = useState("both");

  // ✅ Filter data based on shift selection
  const getFilteredData = () => {
    if (selectedShift === "both") {
      return filteredData;
    }
    return filteredData.filter((item) => item.shift === (selectedShift === "shift1" ? 1 : 2));
  };

  const displayData = getFilteredData();
  const cumulative = getFilteredData();

  return (
    <Layout className="bg-gray-50">
      <NavBar />
      <Content className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">CO₂ Emission Dashboard</h2>

        {/* Date Picker */}
        <div className="flex justify-start mb-8">
          <RangePicker
            className="w-full sm:w-auto p-2 border border-gray-300 rounded-lg shadow-sm hover:border-blue-500 focus:border-blue-600 transition duration-300"
            defaultValue={dateRange}
            onChange={(dates) => setDateRange(dates || [dayjs().startOf("month"), dayjs().endOf("month")])}
            allowClear
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Total Goods Produced",
              key: "goodsProduced",
              value: totalGoods,
              color: "white",
              chartColor: "#7625F5",
            },
            {
              title: "Total CO₂ Emitted (kg)",
              key: "co2Emitted",
              value: totalCO2,
              color: "white",
              chartColor: "#F56B62",
            },
            {
              title: "Scope 1 Emissions",
              key: "scope1",
              value: totalScope1,
              color: "white",
              chartColor: "#F5DB06",
            },
            {
              title: "Scope 2 Emissions",
              key: "scope2",
              value: totalScope2,
              color: "white",
              chartColor: "#F5DB06",
            },
          ].map((item) => (
            <Card
              key={item.key}
              className="rounded-lg shadow-lg border-0 overflow-hidden"
              style={{
                background: item.color,
                borderLeft: `10px solid ${item.chartColor}`  // ✅ Individual left border color
              }}
            >
              <div className="p-4  text-black">
                <h3 className="text-[25px] font-semibold mb-2">{item.title}</h3>
                <Statistic
                  value={item.value}
                  valueStyle={{ fontSize: "40px", fontWeight: "bold", color: "black" }}
                />
              </div>
              <div className="h-20 ml-60">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={filteredData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id={`color${item.key}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={item.chartColor} stopOpacity={0.8} />
                        <stop offset="95%" stopColor={item.chartColor} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" hide />
                    <YAxis hide />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          // const dataPoint = filteredData.find((item) => item.date === label);
                          return (
                            <div className="bg-white p-2 rounded shadow-lg opacity-80 h-[100]">
                              <p className="text-sm">{`Date: ${label}`}</p>
                              <p className="text-sm">{`${item.title}: ${payload[0].value}`}</p>
                              {/* <p className="text-sm">{`Shift: ${dataPoint ? dataPoint.shift : 'N/A'}`}</p>  ✅ Added Shift info */}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey={item.key}
                      stroke={item.chartColor}
                      fill={`url(#color${item.key})`}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>

              </div>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
         {/* <h2 className="text-2xl font-bold text-gray-800 mb-6">CO₂ Emission Dashboard</h2> */}

      {/* ✅ Filter Bar */}
      <div className="flex justify-end mb-4">
        <Select
          className="w-40"
          value={selectedShift}
          onChange={setSelectedShift}
        >
          <Option value="shift1">Shift 1</Option>
          <Option value="shift2">Shift 2</Option>
          <Option value="both">Both</Option>
        </Select>
      </div>

      <Flex className="w-full gap-6">
        <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Daily Goods Produced vs CO₂ Emitted</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={displayData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />

              {/* ✅ Custom Tooltip with Shift */}
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-3 rounded shadow-lg opacity-90">
                        <p className="text-sm font-bold">{`Date: ${label}`}</p>
                        <p className="text-sm">{`Shift: ${payload[0]?.payload?.shift || 'N/A'}`}</p>
                        <p className="text-sm">{`Goods Produced: ${payload[0]?.value}`}</p>
                        <p className="text-sm">{`CO₂ Emitted: ${payload[1]?.value || 0}`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Legend />
              <Bar dataKey="goodsProduced" fill="#7625F5" name="Goods Produced" />
              <Bar dataKey="co2Emitted" fill="#EF4444" name="CO₂ Emitted" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Cumulative Goods Produced & CO₂ Emissions</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={cumulativeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-3 rounded shadow-lg opacity-90">
                        <p className="text-sm font-bold">{`Date: ${label}`}</p>
                        <p className="text-sm">{`Shift: ${payload[0]?.payload?.shift || 'N/A'}`}</p>
                        <p className="text-sm">{`Goods Produced: ${payload[0]?.value}`}</p>
                        <p className="text-sm">{`CO₂ Emitted: ${payload[1]?.value || 0}`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="cumulativeGoods" stroke="#7625F5" name="Cumulative Goods" strokeWidth={3} />
              <Line type="monotone" dataKey="cumulativeCO2" stroke="#EF4444" name="Cumulative CO₂" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Flex>
      </Content>
    </Layout>
  );
}