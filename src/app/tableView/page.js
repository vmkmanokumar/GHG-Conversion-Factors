"use client";

import { useState, useEffect } from "react";
import { Table, Button } from "antd"; // ✅ Import Ant Design Table
import { useRouter } from "next/navigation";
import Link from "next/link";

const TableView = () => {
  const [allEntries, setAllEntries] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [userId, setUserId] = useState("");
  const router = useRouter();

  const templateSaves = allEntries.map(entry => entry.templatesave);
  console.log(templateSaves)  /// templated is there

  const goToParameterAndUnit = () => {
    localStorage.setItem("templateSaves", JSON.stringify(templateSaves)); // Store in localStorage
    router.push("/ScopeOne/Activities/parameterAndUnit");
  };

  // ✅ Load selected template from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTemplate = localStorage.getItem("selectedTemplate");
      const userName = localStorage.getItem("username");
      if (storedTemplate) {
        setSelectedTemplate(storedTemplate);
      }
      if (userName) {
        setUserId(userName);
      }
    }
  }, []);


  // ✅ Fetch all entries when the component mounts
  useEffect(() => {
    if (!userId) return; // Prevent API call if userId is missing

    const fetchAllEntries = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/getAllEntries?username=${userId}&templatecontent=${selectedTemplate}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Data:", data.entries);

        // ✅ Update state with fetched data
        setAllEntries(data.entries || []);
      } catch (error) {
        console.error("Error fetching all entries:", error);
      }
    };

    fetchAllEntries();
  }, [userId]); // Re-run when userId changes

  // ✅ Handle Edit Value
  const handleEditValue = (record) => {
    console.log("Edit Value:", record);
    // Implement logic to edit specific values
  };

  // ✅ Handle Edit
  const handleEdit = (record) => {
    console.log("Edit:", record);
    // Implement logic to edit the whole row
  };

  // ✅ Handle Delete
  const handleDelete = (record) => {
    console.log("Delete:", record);
    // Implement logic to delete the entry
  };

  // ✅ Define Ant Design Table Columns (Fixing Field Names)
  const columns = [
    { title: "User ID", dataIndex: "username", key: "username" }, // Change "email" to "username"
    { title: "Template Name", dataIndex: "templatecontent", key: "templatecontent" },
    { title: "Created By", dataIndex: "createdBy", key: "createdBy" },
    { title: "Shift", dataIndex: "shift", key: "shift" },
    { title: "Created Date", dataIndex: "created_date", key: "created_date" },
    { title: "Modified Date", dataIndex: "modified_date", key: "modified_date" },
    { title: "modifiedBy", dataIndex: "modifiedBy", key: "modifiedBy" },
    { title: "Total CO2 (kg)", dataIndex: "total_kg_co2", key: "total_kg_co2" },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex space-x-2">
          <Button type="primary" onClick={() => goToParameterAndUnit(record)}>
           
                Go to Parameter and Unit
          
          </Button>
          <Button type="default" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button danger onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center mt-10 w-full px-10">
      <h2 className="text-lg font-semibold mb-4">
        Viewing Entries for: <strong>{selectedTemplate || "No Template Selected"}</strong>
      </h2>

      {/* ✅ Table Component */}
      <Table
        dataSource={allEntries}
        columns={columns}
        rowKey="username" // Ensure unique row key
        pagination={{ pageSize: 5 }}
        className="w-full"
      />
    </div>
  );
};

export default TableView;
