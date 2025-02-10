"use client";
import React, { useState, useEffect } from "react";
import { Button, Drawer, Avatar, Layout, Typography, Spin } from "antd";
import { UserOutlined, LogoutOutlined, MenuOutlined, IdcardOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";

const { Header } = Layout;
const { Title, Text } = Typography;

export default function Dashboard() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [roles, setRoles] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsername = localStorage.getItem("username");
      const role = localStorage.getItem("roles");
      setRoles(role || "N/A");
      setUsername(storedUsername || "Guest");
    }
  }, []);

  const showUserDrawer = () => {
    setOpen(true);
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    router.push("/");
  };

  return (
    <Layout className="h-screen bg-gray-100">
      <Header className="bg-[#27A376] h-[100px] flex justify-between items-center px-6 shadow-md">
        <Title level={3} className="text-white">Dashboard</Title>
        <div className="flex items-center gap-4">
          <Avatar size="large" icon={<UserOutlined />} className="cursor-pointer shadow-md" onClick={showUserDrawer} />
          <Button type="text" icon={<LogoutOutlined />} onClick={handleLogout} className="text-white hover:text-red-500">
            Logout
          </Button>
        </div>
      </Header>

      {/* User Drawer */}
      <Drawer
        title={<Title level={4} className="text-gray-700">User Info</Title>}
        placement="right"
        open={open}
        onClose={() => setOpen(false)}
        closable
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-4 mt-10">
            <Spin size="large" />
            <Text>Loading user details...</Text>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
              <Avatar size={50} icon={<UserOutlined />} />
              <div>
                <Text className="text-gray-600 text-sm">Username</Text>
                <Title level={5} className="m-0">{username}</Title>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
              <IdcardOutlined className="text-xl text-gray-600" />
              <div className="flex items-center w-full">
                <Text className="text-gray-600 text-sm mr-10">Role:</Text>
                <Title level={5} className="m-0 text-gray-700">{roles}</Title>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
              <div className="flex items-center w-full">
                <Link href="/ScopeOne">Create Template</Link>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </Layout>
  );
}
