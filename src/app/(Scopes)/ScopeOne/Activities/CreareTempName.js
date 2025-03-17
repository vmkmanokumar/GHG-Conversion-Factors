"use client";
import React, { useEffect, useState } from "react";
import { useScopeOne } from "../Context/ScopeOneContext";

export default function CreateTempName() {
  const {
    templatecontent,
    settemplatecontent,
    selectedShift,
    setSelectedShift,
    editTemplate,
  } = useScopeOne();

  useEffect(() => {
    if (editTemplate === "Edit") {
      const storedTemplate = localStorage.getItem("templateContent");
      const storedShift = localStorage.getItem("selectedShift");

      if (storedTemplate) settemplatecontent(JSON.parse(storedTemplate));
      if (storedShift) setSelectedShift(JSON.parse(storedShift));
    }
  }, [editTemplate]);

  const handleTemplateChange = (e) => {
    settemplatecontent(e.target.value);
    localStorage.setItem("templateContent", JSON.stringify(e.target.value)); // Save input to local storage
  };

  const handleShiftChange = (e) => {
    setSelectedShift(e.target.value);
    localStorage.setItem("selectedShift", JSON.stringify(e.target.value)); // Save shift selection
  };

  return (
    <div className="flex flex-col justify-center items-center bg-[#effbf7] w-full max-w-4xl mx-auto mt-6 p-10 rounded-4xl shadow-lg min-h-[550px]">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Enter Template Name
      </h1>

      <input
        type="text"
        placeholder="Template Name"
        className="w-full px-3 py-3 border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
        value={templatecontent || ""}
        onChange={handleTemplateChange}
      />

      <select
        className="w-full px-3 py-3 border rounded-md text-lg mt-6 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
        value={selectedShift || ""}
        onChange={handleShiftChange}
      >
        <option value="" disabled>Select Shift</option>
        <option value="1">Shift 1</option>
        <option value="2">Shift 2</option>
      </select>
    </div>
  );
}
