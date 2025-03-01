"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  Layout,
  Typography,
  Spin,
  Card,
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
import Link from "next/link";

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
        const response = await fetch("https://ghg-conversion-factors-backend.vercel.app/getmasterData");
        if (!response.ok) throw new Error("Failed to fetch data");

        const res = await response.json();
        console.log(res);

        const transformedData = {};
        res.forEach((item) => {
          if (!transformedData[item.scopes]) {
            transformedData[item.scopes] = {};
          }
          if (!transformedData[item.scopes][item.scope_factors]) {
            transformedData[item.scopes][item.scope_factors] = {};
          }

          transformedData[item.scopes][item.scope_factors][item.parameters] = {
            checked: true,
            selectedValue: item.units,
            maxvalue: item.maxvalues,
          };
        });

        setData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const downloadCSV = () => {
    if (!data) return;

    let csvData = [];
    Object.entries(data).forEach(([category, subCategories]) => {
      Object.entries(subCategories).forEach(([subCategory, items]) => {
        Object.entries(items).forEach(([itemName, itemData]) => {
          csvData.push({
            Category: category,
            SubCategory: subCategory,
            Name: itemName,
            Checked: itemData.checked,
            Value: itemData.maxvalue,
            Unit: itemData.selectedValue,
          });
        });
      });
    });

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout
      className={`h-screen transition-all duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
        }`}
    >
      {/* Header */}
      <Header
        className={`shadow-md flex items-center px-6 h-[80px] transition-all duration-300 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
      >
        <Button
          icon={<ArrowLeftOutlined />}
          type="text"
          onClick={() => router.back()}
          className={`text-xl mr-4 ${darkMode ? "text-white" : "text-gray-800"}`}
        />
        <Title level={3} className={`m-0 flex-1 ${darkMode ? "text-white" : ""}`}>
          Dashboard
        </Title>

        <Button type="link" className={darkMode ? "text-white" : ""}>
          <Link href="/TemplateCreation">Create Template</Link>
        </Button>

        {/* Dark Mode Toggle */}
        <Switch
          checked={darkMode}
          onChange={toggleDarkMode}
          checkedChildren={<SunOutlined />}
          unCheckedChildren={<MoonOutlined />}
          className="ml-auto"
        />
      </Header>

      {/* Main Content */}
      <Content
        className={`p-4 sm:p-6 transition-all duration-300 ${darkMode ? "bg-gray-800 text-white" : "bg-green-50 text-black"
          }`}
      >
        <div
          className={`p-6 rounded-lg transition-all duration-300 ${darkMode ? "bg-gray-800 text-white" : "bg-green-50 text-black"
            }`}
        >
          {/* Header Actions */}
          <div className="flex flex-wrap justify-between items-center mb-4">
            <Title level={3} className={`text-center w-full sm:w-auto ${darkMode ? "text-white" : ""}`}>
              Dashboard Data
            </Title>
            <div className="flex flex-wrap gap-3 w-full sm:w-auto">
              <Input
                placeholder="Search..."
                prefix={<SearchOutlined className={darkMode ? "text-white" : "text-black"} />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`w-full sm:w-60 ${darkMode ? "bg-gray-700 text-white" : ""}`}
              />
              <Button type="primary" icon={<DownloadOutlined />} onClick={downloadCSV}>
                Download CSV
              </Button>
            </div>
          </div>

          {/* Display Data */}
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Spin size="large" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(data)
                .filter(([category]) =>
                  category.toLowerCase().includes(search.toLowerCase())
                )
                .map(([category, subCategories]) =>
                  Object.entries(subCategories).map(([subCategory, items]) => (
                    <Card
                      key={subCategory}
                      title={`${category}-${subCategory}`}
                      className={`shadow-md transition-all duration-300 ${darkMode
                          ? "bg-gray-700 text-white border-gray-600"
                          : "bg-[#EFFBF7] text-black"
                        }`}
                    >
                      {Object.entries(items).map(([itemName, itemData]) => (
                        <div key={itemName} className="mb-3">
                          <Text strong className={darkMode ? "text-white" : "text-black"}>
                            {itemName} ({itemData.selectedValue})
                          </Text>
                          <Tooltip
                            title={`Value: ${itemData.maxvalue} ${itemData.selectedValue}`}
                            classNames={{ root: darkMode ? "bg-gray-700 text-white" : "" }}
                          >
                            <div className="w-full bg-gray-200 rounded-full h-[28] mt-2">
                              <div
                                className="bg-green-500 h-[28] rounded-full transition-all duration-300"
                                style={{
                                  width: `${(itemData.maxvalue / 100) * 100}%`,
                                }}
                              ></div>
                            </div>
                          </Tooltip>

                        </div>
                      ))}
                    </Card>
                  ))
                )}
            </div>
          )}
        </div>
      </Content>
    </Layout>
  );
}
