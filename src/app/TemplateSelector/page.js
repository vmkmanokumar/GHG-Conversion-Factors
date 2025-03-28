"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Skeleton, message, Checkbox,Modal } from "antd";
import { useScopeOne } from "../(Scopes)/ScopeOne/Context/ScopeOneContext";

const TemplateSelector = () => {
  const {userId, setUserId} = useScopeOne()
  const [templates, setTemplates] = useState([]);
  const [selected, setSelected] = useState(null);
  // const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  // Load user ID from localStorage

  console.log("template selection",userId)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("email");
      const SupervisiorName = localStorage.getItem("SupervisiorName")
      if (SupervisiorName !== "N/A" ) {
        setUserId(SupervisiorName);
      }else{
        setUserId(storedUserId)
      }
    }
  }, []);

  console.log("userId",userId)

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'This is an error message',
    });
  };

  // Fetch templates after userId is set
  useEffect(() => {
    if (!userId) return;

    const fetchTemplates = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://ghg-conversion-factors-backend.vercel.app/getTemplates?username=${userId}`,
          { method: "GET" }
        );

        const data = await response.json();
        console.log("Fetched Data:", data);
        setTemplates(data.templates || []);
      } catch (error) {
        console.error("Error fetching templates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, [userId]);

  // ✅ Handle checkbox selection
  const handleCheckboxChange = (template) => {
    setSelectedTemplates((prev) =>
      prev.includes(template)
        ? prev.filter((t) => t !== template)
        : [...prev, template]
    );
  };

  const handleDelete = () => {
    Modal.confirm({
      title: "Are you sure you want to delete the selected templates?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      cancelText: "Cancel",
      okType: "danger",
      onOk() {
        console.log("Templates deleted");
        // Your delete logic here
      },
      onCancel() {
        console.log("Delete canceled");
      },
    });
  };

  // ✅ Handle Delete multiple templates
  const handleDeleteTemplates = async () => {
    if (selectedTemplates.length === 0) {
      error();
      return;
    }

    if (handleDelete()) return;

    try {
      const response = await fetch("https://ghg-conversion-factors-backend.vercel.app/deleteTemplates", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: userId, templates: selectedTemplates }), // ✅ Ensure correct format
      });

      const data = await response.json();

      if (response.ok) {
        message.success("Templates deleted successfully!");
        setTemplates(templates.filter((t) => !selectedTemplates.includes(t)));
        setSelectedTemplates([]); // Clear selection
      } else {
        message.error("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error deleting templates:", error);
      message.error("An error occurred while deleting the templates.");
    }   
  };


  // ✅ Handle Next button click
  const handleNext = () => {
    if (selected) {
      
      localStorage.setItem("selectedTemplate", selected);
    
       // ✅ This is enough for navigation
      // setTimeout(() => {
      //   window.location.reload();
        
      // },500) 
      router.push("/tableView");
    } else {
      message.error("Please select a template before proceeding!");
    
    }
  };
  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-lg font-semibold mb-4">Choose a saved template</h2>
      <div className="w-80">
        {loading ? (
          <Skeleton active paragraph={{ rows: 8 }} className="w-full" />
        ) : (
          templates.map((temp) => (
            <div
              key={temp}
              className={`flex justify-between items-center w-full mb-2 border-2 rounded-lg p-3 transition-all ${selected === temp
                  ? "border-green-500 bg-green-100 shadow-md"
                  : "border-gray-300 bg-white"
                }`}
              onClick={() => setSelected(temp)} // ✅ Clicking the whole div selects it
            >
              <button
                className="flex-1 text-left px-2 bg-transparent focus:outline-none"
              >
                {temp}
              </button>


              {showCheckboxes && (
                <Checkbox
                  checked={selectedTemplates.includes(temp)}
                  onChange={() => handleCheckboxChange(temp)}
                />
              )}
            </div>
          ))
        )}
      </div>


      {/* ✅ Show Delete button at the bottom */}
      <div className="flex gap-2 mt-4">
        <Button
          onClick={() => setShowCheckboxes(!showCheckboxes)}
          type="default"
          size="large"
        >
          {showCheckboxes ? "Cancel" : "Delete"}
        </Button>

        {showCheckboxes && (
          <Button onClick={handleDeleteTemplates} danger size="large">
            Confirm Delete
          </Button>
        )}

        <Button onClick={handleNext} type="primary" size="large">
          Next
        </Button>
      </div>
    </div>
  );
};

export default TemplateSelector;
