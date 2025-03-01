"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  Layout,
  Typography,
  Spin,
  Card,
  Progress,
  Input,
  Tooltip,
  Switch,
} from "antd";
import {
  ArrowLeftOutlined,
  DownloadOutlined,
  SearchOutlined,
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Papa from "papaparse";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://ghg-conversion-factors-backend.vercel.app/getmasterData", {
          method: "GET",
        });

        if (!response.ok) {
          console.error("Failed to fetch data");
          return;
        }

        const res = await response.json();  
        console.log("data",res);

        // Transform and set the data
        const transformedData = {};
        res.forEach((item) => {
          if (!transformedData[item.scopes]) {
            transformedData[item.scopes] = {};
          }
          if (!transformedData[item.scopes][item.scope_factors]) {
            transformedData[item.scopes][item.scope_factors] = [];
          }

          transformedData[item.scopes][item.scope_factors].push({
            name: item.parameters,
            value: Number(item.maxvalues),
            unit: item.units,
          });
        });

        console.log(transformedData)

        setData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const downloadCSV = () => {
    if (!data) return;

    let csvData = [];
    Object.entries(data["Scope 1"]).forEach(([category, items]) => {
      items.forEach((item) => {
        csvData.push({
          Category: category,
          Fuel: item.name,
          Value: item.value,
          Unit: item.unit,
        });
      });
    });

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "fuel_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout className={`h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      {/* Header */}
      <Header className={`shadow-md flex items-center px-6 h-[80px] ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <Button
          icon={<ArrowLeftOutlined />}
          type="text"
          onClick={() => router.back()}
          className={`text-xl mr-4 ${darkMode ? "text-white" : "text-gray-800"}`}
        />
        <Title level={3} className={`m-0 ${darkMode ? "text-white" : "text-gray-800"}`}>Dashboard</Title>
        <Switch
          checked={darkMode}
          onChange={toggleDarkMode}
          checkedChildren={<SunOutlined />}
          unCheckedChildren={<MoonOutlined />}
          className="ml-auto"
        />
      </Header>

      {/* Main Content */}
      <Content className="p-6">
        <div className={`p-6 rounded-lg ${darkMode ? "bg-gray-800" : "bg-green-50"}`}>
          {/* Header Actions */}
          <div className="flex justify-between items-center mb-4">
            <Title level={3} className="text-center">Dashboard Data</Title>
            <div className="flex items-center gap-3">
              <Input
                placeholder="Search..."
                prefix={<SearchOutlined />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-60"
              />
              <Button type="primary" icon={<DownloadOutlined />} onClick={downloadCSV}>
                Download CSV
              </Button>
            </div>
          </div>

          {/* Display Data */}
          {loading ? (
            <div className="flex justify-center items-center">
              <Spin size="large" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(data["Scope 1"])
                .filter(([category]) => category.toLowerCase().includes(search.toLowerCase()))
                .map(([category, items]) => (
                  <Card key={category} title={category} className={`shadow-md ${darkMode ? "bg-gray-700 text-white" : ""}`}>
                    {items.map((item) => (
                      <div key={item.name} className="mb-3">
                        <Text strong>{item.name} ({item.unit})</Text>
                        <div className="w-full bg-gray-200 rounded-full h-3 relative">
  <div
    className="bg-green-500 h-3 rounded-full"
    style={{ width: `${(item.value / 100) * 100}%` }}
  ></div>
</div>
<Text type="secondary" className="text-sm">{`Value: ${item.value} ${item.unit}`}</Text>

                      </div>
                    ))}
                  </Card>
                ))}
            </div>
          )}
        </div>
      </Content>
    </Layout>
  );
}
