"use client";

import React, { useState, useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import { Checkbox } from "antd";
import { ChevronDown } from "lucide-react";
import { useScopeOne } from "../Context/ScopeOneContext";



export default function ChooseActivities() {
  const { checkedValuesScopeOne, selectedValuesScopeOne, setSelectedValuesScopeOne,activities,setActivities} = useScopeOne();
  

 
  console.log("From Activities Page - Checked Values:", activities);

  // Fetch available activities based on checked scope factors
  const FetchActivities = async () => {
    try {
      if (!checkedValuesScopeOne || checkedValuesScopeOne.length === 0) return;

      const checkedValuesStr = checkedValuesScopeOne.map(encodeURIComponent).join(",");
      console.log("Fetching activities for:", checkedValuesStr);

      const response = await fetch(
        `https://ghg-conversion-factors-backend.vercel.app/scope_activities/${checkedValuesStr}`,
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      console.log("Fetched Activities:", data);

      setActivities(data);
    } catch (error) {
      console.error("Error fetching scope activities:", error);
    }
  };

  // Save selected activities to PostgreSQL
  const saveActivitiesToDraft = async (updatedData) => {
    try {
      const response = await fetch("https://ghg-conversion-factors-backend.vercel.app/save_scope_one_draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          activities: updatedData,
        }),
      });

      if (!response.ok) throw new Error("Failed to save data");

      console.log("Activities saved successfully!");
    } catch (error) {
      console.error("Error saving activities:", error);
    }
  };

  // Handle Checkbox Change (Save Immediately)
  const handleCheckboxChange = (category, item) => {
    setSelectedValuesScopeOne((prev) => {
      const updatedCategoryValues = prev[category] ? [...prev[category]] : [];

      if (updatedCategoryValues.includes(item)) {
        updatedCategoryValues.splice(updatedCategoryValues.indexOf(item), 1);
      } else {
        updatedCategoryValues.push(item);
      }

      const updatedData = { ...prev, [category]: updatedCategoryValues };

      // Save to the database immediately
      saveActivitiesToDraft(updatedData);

      return updatedData;
    });
  };

  // Fetch saved activities from PostgreSQL when page loads
  const fetchSavedActivities = async () => {
    try {
      const userId = localStorage.getItem("username")
      const response = await fetch(`https://ghg-conversion-factors-backend.vercel.app/get_scope_one_draft/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch saved data");

      const data = await response.json();
      setSelectedValuesScopeOne(data.activities || {});
    } catch (error) {
      console.error("Error loading saved activities:", error);
    }
  };

  useEffect(() => {
    
    fetchSavedActivities();

  }, []);

  useEffect(() => {
    FetchActivities();
  }, [checkedValuesScopeOne]);

  return (
    <div className="flex flex-col justify-center border-[#31CE95] items-center bg-[#effbf7] w-full md:w-[768px] lg:w-[1152px] md:mx-auto mt-10 md:mt-16 lg:mt-10 p-4 md:p-6 rounded-xl shadow-lg flex-grow min-h-[515px]">
      {/* Title */}
      <div className="w-full mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Activities</h1>
      </div>

      {/* Disclosure Section */}
      <div className="w-full min-h-[250px] flex-grow text-[22px]">
        {Object.keys(activities).map((key) => {
          if (!checkedValuesScopeOne.includes(key)) return null; // Only display if category is checked

          return (
            <Disclosure key={key}>
              {({ open }) => (
                <div className="bg-[#BFF1DF] w-full mt-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  {/* Main Disclosure Button */}
                  <Disclosure.Button className="flex justify-between items-center w-full px-4 py-3 text-lg font-medium text-gray-700 focus:outline-none transition duration-700">
                    <span>{key}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${open ? "rotate-180" : "rotate-0"}`} />
                  </Disclosure.Button>

                  {/* Disclosure Panel for the Category */}
                  <Disclosure.Panel className="p-4 w-full bg-[#effbf7] rounded-b-lg overflow-hidden">
                    <div className="flex flex-wrap gap-4">
                      {activities[key].map((item, idx) => (
                        <div key={idx} className="flex items-center">
                          <Checkbox
                            checked={selectedValuesScopeOne[key]?.includes(item) || false}
                            onChange={() => handleCheckboxChange(key, item)}
                          >
                            <span>{item}</span>
                          </Checkbox>
                        </div>
                      ))}
                    </div>
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          );
        })}
      </div>
    </div>
  );
}
