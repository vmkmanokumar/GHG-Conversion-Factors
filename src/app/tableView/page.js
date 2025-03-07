"use client";

import { useState, useEffect } from "react";
import { Table, Button} from "antd"; // ✅ Import Ant Design Table
import { useRouter } from "next/navigation";

const TableView = () => {
  const [allEntries, setAllEntries] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const router = useRouter();
  const [userId,setUserId] = useState("")

  console.log("userid",userId)

  // ✅ Load selected template from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTemplate = localStorage.getItem("selectedTemplate");
      const userName = localStorage.getItem("username")
      if (storedTemplate) {
        setSelectedTemplate(storedTemplate);
      }
      if(userName){
        setUserId(userName)
      }
    }
  }, []);

  // ✅ Fetch all entries when the component mounts
  useEffect(() => {
    if (!userId) return;  // Prevent API call if userId is missing
  
    const fetchAllEntries = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/getAllEntries?username=${userId}`);
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log("Fetched Data:", data);
        setAllEntries(data.entries || []);
      } catch (error) {
        console.error("Error fetching all entries:", error);
      }
    };
  
    fetchAllEntries();
  }, [userId]);  // Re-run when userId changes
  

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
    
    
  // ✅ Define Ant Design Table Columns
  const columns = [
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Template Name", dataIndex: "templatecontent", key: "templatecontent" },
    { title: "Created By", dataIndex: "createdBy", key: "createdBy" },
    { title: "Shift", dataIndex: "shift", key: "shift" },
    { title: "created_date", dataIndex: "created_date", key: "created_date" },
    { title: "modified_date", dataIndex: "modified_date", key: "modified_date" },
    {
        title: "Actions",
        key: "actions",
        render: (text, record) => (
          <div className="flex space-x-2">
            <Button type="primary" onClick={() => handleEditValue(record)}>
              Edit Value
            </Button>
            <Button type="default" onClick={() => handleEdit(record)}>
              Edit
            </Button>
            <Button type="danger" onClick={() => handleDelete(record)}>
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
        rowKey="email"
        pagination={{ pageSize: 5 }}
        className="w-full"
      />
    </div>
  );
};

export default TableView;
