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

const { Header } = Layout;
const { Title } = Typography;

export default function NavBar() {
  const { setEditTemplate } = useScopeOne();
  const router = useRouter();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [openEditTemplate, setOpenEditTemplate] = useState(false);
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userName = localStorage.getItem("username");
      if (userName) {
        setUserId(userName);
        setUser(userName.charAt(0).toUpperCase()); // Ensure safe access
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
      <p className="mb-2 font-semibold">{userId}</p>
      <Button type="primary" danger size="small" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );

  return (
    <>
      {/* Header */}
      <Header className="drop-shadow-md m-10 flex items-center px-4 sm:px-6 h-[100px] bg-white text-black">
        <Button
          icon={<MenuOutlined />}
          type="text"
          onClick={() => setDrawerVisible(true)}
          className="text-xl mr-4 mt-1 text-gray-800"
        />
        <Title level={3} className="ml-10 flex-1 mt-4 text-lg sm:text-xl">
          Dashboard
        </Title>
        <Popover content={popoverContent} trigger="hover" className="mt-4 mr-5">
          <span className="mr-4 text-sm sm:text-base shadow-xl rounded-full size-10 cursor-pointer">
            <Avatar
              style={{
                backgroundColor: "blue",
                verticalAlign: "middle",
                cursor: "pointer",
              }}
              size="large"
              className="size-10"
            >
              {user}
            </Avatar>
          </span>
        </Popover>
      </Header>

      {/* Left Drawer (Menu) */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        className="bg-white"
      >
        <Menu>
          <Menu.Item icon={<FormOutlined />}>
            <a onClick={handleCreateTemplate}>Create Template</a>
          </Menu.Item>
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
      <Drawer title="Edit Template" placement="right" closable={false} onClose={onClose} open={openEditTemplate}>
        <TemplateSelector />
      </Drawer>
    </>
  );
}
