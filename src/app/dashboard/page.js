"use client";
import { useState, useEffect } from "react";
import { Button, Drawer, Avatar, Layout, Typography } from "antd";
import { UserOutlined, LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

export default function Dashboard() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [roles,setRoles] = useState("")

  console.log(roles)

  useEffect(() => {
    // Fetch username from localStorage when component mounts
    const storedUsername = localStorage.getItem("username");
    const role = localStorage.getItem("roles")
    setRoles(role)
    setUsername(storedUsername || "Guest");
  }, []);

  const showUserDrawer = () => {
    setOpen(true);
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear user token
    localStorage.removeItem("username");
    router.push("/"); // Redirect to login
  };

  return (
    <Layout className="h-screen bg-gray-100">
      {/* Header */}
      <Header className="bg-[#27A376] flex justify-between items-center px-6 shadow-md">
        <div className="flex items-center gap-3">
          {/* <MenuOutlined className="text-white text-xl" /> */}
          <Title level={3} className="text-white"><p className="mt-5 text-white">Dashboard</p></Title>
        </div>
        <div className="flex items-center gap-4">
          <Avatar size="large" icon={<UserOutlined />} className="cursor-pointer" onClick={showUserDrawer} />
          <Button
            type="text"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            className="text-white hover:text-red-500"
          >
            Logout
          </Button>
        </div>
      </Header>

      {/* Main Content */}
      <Content className="p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          <Title level={2} className="text-gray-700">Welcome, {username}!</Title>
          <Text className="text-gray-500">Manage your activities here.</Text>
        </div>
      </Content>

      {/* User Drawer */}
      <Drawer
        closable
        title="User Info"
        placement="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        {loading ? <p>Loading...</p> : <p><b>Username:</b> {username}</p>}
        {loading ? <p>loading....</p>: <p><b>Role</b> {roles}  </p>}
      </Drawer>
    </Layout>
  );
}
