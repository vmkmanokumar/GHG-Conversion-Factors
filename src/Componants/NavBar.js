"use client"
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { Layout, Button, Typography, Drawer, DatePicker, Card, Statistic, Menu, Flex,Avatar ,Popover} from "antd";
import { MenuOutlined, FormOutlined, EditOutlined, TableOutlined, FileDoneOutlined, CheckCircleOutlined } from "@ant-design/icons";
const { Header, Content } = Layout;
import TemplateSelector from "@/app/TemplateSelector/page";
import Link from "next/link";
const { Title } = Typography;
export default function NavBar(){

      const router = useRouter();
      const [drawerVisible, setDrawerVisible] = useState(false);
      const [openEditTemplate, setOpenEditTemplate] = useState(false);
    //   const [dateRange, setDateRange] = useState([dayjs().startOf("month"), dayjs().endOf("month")]);
      const [userId, setUserId] = useState("");
      // console.log("user IF",userId[0])
      const [user, setUser] = useState("");


      useEffect(() => {
        if (typeof window !== "undefined") {
          const userName = localStorage.getItem("username");
          if (userName) setUserId(userName);
          setUser(userName[0])
        }
      }, []);


    const onClose = () => {
        setOpenEditTemplate(false);
      };

      const handleLogout = () => {
        console.log("User logged out");
        localStorage.removeItem("username")
        router.replace("/")
      };
      
    
      const popoverContent = (
        <div className="p-2 text-center">
          <p className="mb-2 font-semibold">{userId}</p>
          <Button type="primary" danger size="small" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      );


    return(

        <>
        
        <Header className="drop-shadow-md flex items-center px-4 sm:px-6 h-[80px] bg-white text-black">
        <Button icon={<MenuOutlined />} type="text" onClick={() => setDrawerVisible(true)} className="text-xl mr-4 text-gray-800" />
        <Title level={3} className="m-0 flex-1 mt-3 text-lg sm:text-xl">Dashboard</Title>
        <Popover content={popoverContent} trigger="hover">
      <span className="mr-4 text-sm sm:text-base shadow-xl rounded-full size-10 cursor-pointer">
        <Avatar
          style={{ backgroundColor: "blue", verticalAlign: "middle", cursor: "pointer" }}
          size="large"
          className="size-10"
        >
          {user.toUpperCase()}
        </Avatar>
      </span>
    </Popover>
      </Header>

      <Drawer title="Menu" placement="left" onClose={() => setDrawerVisible(false)} open={drawerVisible} className="bg-white">
        <Menu>
          <Menu.Item icon={<FormOutlined />}><Link href="/ScopeOne">Create Template</Link></Menu.Item>
          <Menu.Item icon={<EditOutlined />} onClick={()=>setOpenEditTemplate(true)}>Edit Template</Menu.Item>
          <Menu.Item icon={<TableOutlined />}><Link href="/ScopeOne">Enter Actual Data</Link></Menu.Item>
          <Menu.Item icon={<FileDoneOutlined />}><Link href="/ScopeOne">Enter Target Data</Link></Menu.Item>
          <Menu.Item icon={<CheckCircleOutlined />}><Link href="/ScopeOne">Validate Actual Data</Link></Menu.Item>
          <Menu.Item icon={<CheckCircleOutlined />}><Link href="/ScopeOne">Validate Target Data</Link></Menu.Item>
        </Menu>
      </Drawer>



      <Drawer
        title="Edit Template"
        placement={"right"}
        closable={false}
        onClose={onClose}
        open={openEditTemplate}
      >
        <TemplateSelector/>
        </Drawer>
        
        </>

       


    )



} 