"use client";

import { useState, useEffect } from "react";
import { Table, Button, Space, Skeleton, Drawer ,Modal} from "antd"; // ✅ Import Skeleton
import { useRouter } from "next/navigation";
import NavBar from "@/Componants/NavBar";
import ParametersAndUnits from "../(Scopes)/ScopeOne/Activities/parameterAndUnit/page";
import { useScopeOne } from "../(Scopes)/ScopeOne/Context/ScopeOneContext";

const TableView = () => {
  const { editTemplate, setEditTemplate,allEntries, setAllEntries } = useScopeOne();
  
  // const [allEntries, setAllEntries] = useState([]);
  console.log("all",allEntries)
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [open, setOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTemplate = localStorage.getItem("selectedTemplate");
      const userName = localStorage.getItem("email");
      if (storedTemplate) setSelectedTemplate(storedTemplate);
      if (userName) setUserId(userName);
      
    }
  }, []);

  useEffect(() => {
    if (!userId || !selectedTemplate) return; // ✅ Prevent unnecessary fetch

    const fetchAllEntries = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://ghg-conversion-factors-backend.vercel.app/getAllEntries?username=${userId}&templatecontent=${selectedTemplate}`
        );

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setAllEntries(data.entries || []);
      } catch (error) {
        console.error("Error fetching all entries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllEntries();
  }, [userId, selectedTemplate]); // ✅ Added selectedTemplate as a dependency

  // ✅ Log only after fetching
  useEffect(() => {
    if (allEntries.length > 0) {
      console.log("Id number", allEntries.map((entry) => entry.id));
    }
  }, [allEntries]);

  const showLargeDrawer = () => {
    localStorage.setItem("templateSaves", JSON.stringify(allEntries.map(entry => entry.templatesave)));
    setOpen(true);
  };

  const goToEnterData =()=>{
    localStorage.setItem("UpdateingTemp", JSON.stringify(allEntries.map(entry => entry.templatesave)));
    localStorage.setItem("templatecontent", JSON.stringify(allEntries.map(entry => entry.templatecontent)));
    localStorage.setItem("templateSaves", JSON.stringify(allEntries.map(entry => entry.templatesave)));
    localStorage.setItem("templatID", JSON.stringify(allEntries.map(entry => entry.id)));
    router.push("/DataEntery")

  }

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
    // setEditTemplate("Create");
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
          {/* <Button type="primary" block onClick={showLargeDrawer}>
            Go to Parameter and Unit
          </Button> */}
          <Button type="primary" block onClick={goToEnterData}>
            EnterData
          </Button>
          <Button type="primary" block onClick={goToUpdateParameter}>
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <NavBar />
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
        {/* <h1>ajhdjk</h1> */}
      <Drawer
        title="Template Details"
        placement="right"
        size="large"
        onClose={() => setOpen(false)}
        open={open}
        extra={
          <Space>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="primary" onClick={() => setOpen(false)}>OK</Button>
          </Space>
        }
      >
        <ParametersAndUnits />
      </Drawer>
    </>
  );
};

export default TableView;
