"use client";

import { useState, useEffect } from "react";
import { Table, Button, Space, Skeleton ,Drawer} from "antd"; // ✅ Import Skeleton
import { useRouter } from "next/navigation";
import NavBar from "@/Componants/NavBar";
import ParametersAndUnits from "../(Scopes)/ScopeOne/Activities/parameterAndUnit/page";
import { useScopeOne } from "../(Scopes)/ScopeOne/Context/ScopeOneContext";

const TableView = () => {

  const { editTemplate, setEditTemplate} = useScopeOne();

  

  const [allEntries, setAllEntries] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  
  const [loading, setLoading] = useState(true); // ✅ Loading state
  const router = useRouter();
  const [userId, setUserId] = useState("");


  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();

  const onClose = () => {
    setOpen(false);
  };

  console.log("Id number",allEntries.map((err)=>err.id))
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTemplate = localStorage.getItem("selectedTemplate");
      const userName = localStorage.getItem("username");
      if (storedTemplate) setSelectedTemplate(storedTemplate);
      if (userName) setUserId(userName);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;
    const fetchAllEntries = async () => {
      try {
        setLoading(true); // ✅ Start loading
        const response = await fetch(
          `https://ghg-conversion-factors-backend.vercel.app/getAllEntries?username=${userId}&templatecontent=${selectedTemplate}`
        );

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setAllEntries(data.entries || []);
      } catch (error) {
        console.error("Error fetching all entries:", error);
      } finally {
        setLoading(false); // ✅ Stop loading
      }
    };
    fetchAllEntries();
  }, [userId]);

  const showLargeDrawer = () => {
    localStorage.setItem("templateSaves", JSON.stringify(allEntries.map(entry => entry.templatesave)));
    setSize('large');
    setOpen(true);
    // router.push("/ScopeOne/Activities/parameterAndUnit");
  };

  const goToUpdateParameter = () => {
    setEditTemplate("Edit");
  
    const updatingTemp = JSON.stringify(allEntries.map(entry => entry.templatesave));
    const templateContent = JSON.stringify(allEntries.map(entry => entry.templatecontent));
    const selectedShift = JSON.stringify(allEntries.map(entry => entry.shift)); // Store shift value
    const templateID = JSON.stringify(allEntries.map(entry => entry.id));
  
    localStorage.setItem("UpdatingTemp", updatingTemp);
    localStorage.setItem("templateContent", templateContent);
    localStorage.setItem("selectedShift", selectedShift);
    localStorage.setItem("templateID", templateID);
  
    router.push("/ScopeOne");
  };
  
  const columns = [
    { title: "User ID", dataIndex: "username", key: "username" },
    { title: "Template Name", dataIndex: "templatecontent", key: "templatecontent" },
    { title: "Created By", dataIndex: "createdBy", key: "createdBy" },
    { title: "Shift", dataIndex: "shift", key: "shift" },
    { title: "Created Date", dataIndex: "created_date", key: "created_date" },
    { title: "Modified Date", dataIndex: "modified_date", key: "modified_date" },
    { title: "Modified By", dataIndex: "modifiedBy", key: "modifiedBy" },
    { title: "Total CO₂ (kg)", dataIndex: "total_kg_co2", key: "total_kg_co2" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space direction="horizontal" size="small">
          <Button type="primary" block onClick={() => showLargeDrawer()}>
            Go to Parameter and Unit
          </Button>
          <Button type="primary" block onClick={()=>goToUpdateParameter()
                 
          }>
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
    <NavBar></NavBar>
    <div className="flex flex-col items-center mt-6 w-full px-4 sm:px-10">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center">
        Viewing Entries for: <strong>{selectedTemplate || "No Template Selected"}</strong>
      </h2>

      {/* ✅ Show Skeleton while loading */}
      {loading ? (
        <Skeleton active paragraph={{ rows: 8 }} className="w-full" />
      ) : (
        <Table
          dataSource={allEntries}
          columns={columns}
          rowKey="username"
          pagination={{ pageSize: 5 }}
          scroll={{ x: "max-content" }} // Enables horizontal scroll on small screens
          className="w-full"
        />
      )}
    </div>

    <Drawer
        title={`${size} Drawer`}
        placement="right"
        size={size}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <ParametersAndUnits></ParametersAndUnits>
      </Drawer>
    </>
  );
};

export default TableView;
