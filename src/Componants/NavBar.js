"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Layout,
  Button,
  Typography,
  Drawer,
  Menu,
  Avatar,
  Popover,
  message
} from "antd";
import {
  MenuOutlined,
  FormOutlined,
  EditOutlined,
  TableOutlined,
  FileDoneOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import TemplateSelector from "@/app/TemplateSelector/page";
import { useScopeOne } from "@/app/(Scopes)/ScopeOne/Context/ScopeOneContext";
import "../Componants/css/MenuStyles.css";

const { Header } = Layout;
const { Title } = Typography;

export default function NavBar() {
  const { setEditTemplate,userId } = useScopeOne();
  const router = useRouter();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [openEditTemplate, setOpenEditTemplate] = useState(false);
  const [user_Id, setUser_Id] = useState("");
  const [user, setUser] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [roles,setRoles] = useState("")

  console.log("userIdfromNav",userId)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userName = localStorage.getItem("username");
      const roles = localStorage.getItem("roles")
      
      if (userName) {
        setUser_Id(userName);
        setUser(userName.charAt(0).toUpperCase());

        // ✅ Check for first login flag
        const firstLogin = localStorage.getItem("firstLogin");

        if (firstLogin === "true") {
          messageApi.success(`Welcome, ${userName}!`);
          localStorage.removeItem("firstLogin");  // ✅ Remove flag after displaying
        }
      }

      if(roles){
        setRoles(localStorage.getItem("roles"))
      }
    }
  }, []);

  const onClose = () => {
    setOpenEditTemplate(false);
  };

  const handleLogout = () => {
    console.log("User logged out");
    localStorage.removeItem("username");
    router.replace("/");
  };

  const handleCreateTemplate = () => {
    setEditTemplate("Create");
    router.push("/ScopeOne");
  };

  const popoverContent = (
    <div className="p-2 text-center">
      <p className="mb-2 font-semibold text-gray-700">{user_Id}</p>
      <p className="mb-2 font-semibold text-gray-700">{roles}</p>
      <Button type="primary" danger size="small" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );

  return (
    <>
      {contextHolder}
      <Header className="shadow-lg flex items-center justify-between px-6 h-20 bg-white">
        <div className="flex items-center">
          <Button
            icon={<MenuOutlined />}
            type="text"
            onClick={() => setDrawerVisible(true)}
            className="text-xl text-gray-800 hover:bg-gray-100 rounded-full p-2"
          />
          <Title level={3} className="mt-2 text-xl font-bold text-gray-800">
            <Link href="/dashboard">
              <span className="text-black">Dashboard</span>
            </Link>
          </Title>
        </div>
        <Popover content={popoverContent} trigger="hover">
          <Avatar
            style={{
              backgroundColor: "#3b82f6",
              verticalAlign: "middle",
              cursor: "pointer",
            }}
            size="large"
            className="text-white font-semibold hover:bg-blue-600 transition-colors"
          >
            {user}
          </Avatar>
        </Popover>
      </Header>

      {/* Left Drawer (Menu) */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        className="bg-white"
        width={250}
      >
        <Menu mode="inline" className="custom-menu">

          {roles === "Supervisor" ?
          (<Menu.Item icon={<FormOutlined />}>
            <a onClick={handleCreateTemplate}>Create Template</a>
          </Menu.Item>) : "" }
          
          <Menu.Item icon={<EditOutlined />} onClick={() => setOpenEditTemplate(true)}>
            Edit Template
          </Menu.Item>
          <Menu.Item icon={<TableOutlined />}>
            <Link href="/ScopeOne">Enter Actual Data</Link>
          </Menu.Item>
          <Menu.Item icon={<FileDoneOutlined />}>
            <Link href="/ScopeOne">Enter Target Data</Link>
          </Menu.Item>
          <Menu.Item icon={<CheckCircleOutlined />}>
            <Link href="/ScopeOne">Validate Actual Data</Link>
          </Menu.Item>
          <Menu.Item icon={<CheckCircleOutlined />}>
            <Link href="/ScopeOne">Validate Target Data</Link>
          </Menu.Item>
        </Menu>
      </Drawer>

      {/* Right Drawer (Edit Template) */}
      <Drawer
        title="Edit Template"
        placement="right"
        closable={false}
        onClose={onClose}
        open={openEditTemplate}
        width={350}
      >
        <TemplateSelector />
      </Drawer>
    </>
  );
}
