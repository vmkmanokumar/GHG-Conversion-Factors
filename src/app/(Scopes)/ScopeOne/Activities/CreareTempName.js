"use client";
import React, { useEffect } from "react";
import { useScopeOne } from "../Context/ScopeOneContext";
// import { aw } from "framer-motion/dist/types.d-6pKw1mTI";

export default function CreateTempName() {
  const {
    templatecontent,
    settemplatecontent,
    selectedShift,
    setSelectedShift,
    userId,
    editTemplate, setEditTemplate
  } = useScopeOne();


  console.log("edit temp",editTemplate)

  
  useEffect(() => {
    if (editTemplate === "Edit") {
      const storedData = localStorage.getItem("templatecontent");

      if (storedData) {
        const parsedData = JSON.parse(storedData); // Convert to array
        settemplatecontent(parsedData); // Store full array in state
      }
    }
  }, [editTemplate])

  

  return (
    <div className="flex flex-col justify-center items-center bg-[#effbf7] w-full max-w-4xl mx-auto mt-6 p-10 rounded-4xl shadow-lg min-h-[550px]">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Enter Template Name
      </h1>

      {/* Template Name Input */}
      <input
        type="text"
        placeholder="Template Name"
        className="w-full px-3 py-3 border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
        value={templatecontent}
        onChange={(e) => settemplatecontent(e.target.value)}
      />

      {/* Shift Selection Dropdown */}
      <select
        className="w-full px-3 py-3 border rounded-md text-lg mt-6 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
        value={selectedShift}
        onChange={(e) => setSelectedShift(e.target.value)}
      >
        <option value="" disabled>Select Shift</option>
        <option value="1">Shift 1</option>
        <option value="2">Shift 2</option>
      </select>
    </div>
  );
}
