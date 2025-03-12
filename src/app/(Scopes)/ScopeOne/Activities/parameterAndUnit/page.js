"use client";
import React, { useEffect, useState } from "react";
import { Input, Button } from "antd";
import { useScopeOne } from "../../Context/ScopeOneContext";

export default function ParametersAndUnits() {
  const { selectedFuels, setSelectedFuels } = useScopeOne();

  console.log("Selected Fuels:", selectedFuels);

  useEffect(() => {
    const templateSave = localStorage.getItem("templateSaves");
    if (templateSave) {
      setSelectedFuels(JSON.parse(templateSave)[0]);
    }
  }, []);

  const saveDraftData = async () => {
    try {
      const response = await fetch(
        `https://ghg-conversion-factors-backend.vercel.app/saveParameter/vmkmano13@gmail.com`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedFuels),
        }
      );

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      console.log("Draft saved successfully:", data);
    } catch (error) {
      console.error("Error saving draft:", error);
    }
  };

  const handleChange = (fuel, value) => {
    setSelectedFuels((prev) => ({
      ...prev,
      [fuel]: { ...(prev[fuel] || {}), maxValue: value },
    }));
  };

  return (
    <div className="flex flex-col items-center bg-[#effbf7] w-full md:w-[768px] lg:w-[652px] md:mx-auto mt-10 p-4 md:p-6 rounded-xl shadow-lg min-h-[515px]">
      {/* Title */}
      <div className="w-full mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Parameters Maximum Value</h1>
      </div>

      {/* Fuel List */}
      <div className="w-full flex-grow min-h-[250px] text-[22px] overflow-auto">
        {Object.keys(selectedFuels).map((fuel) => (
          <div key={fuel} className="bg-[#BFF1DF] w-full p-4 mt-2 rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-700">{fuel}</span>
              <Input
                placeholder="Enter max value"
                className="w-[200px] border-emerald-400"
                value={selectedFuels[fuel]?.maxValue || ""}
                onChange={(e) => handleChange(fuel, e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Save Changes Button */}
      <div className="w-full flex justify-center mt-auto">
        <button
          onClick={saveDraftData}
          className="px-6 py-3 text-lg font-medium text-white bg-green-500 rounded-md shadow-md hover:bg-green-600 transition-all duration-300"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
