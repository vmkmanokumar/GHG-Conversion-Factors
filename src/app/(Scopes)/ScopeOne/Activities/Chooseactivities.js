"use client";

import React, { useState, useEffect } from "react";
import { Disclosure } from "@headlessui/react"; // Corrected import here
import { Checkbox } from "antd";
import { ChevronDown } from "lucide-react";
import { useScopeOne } from "../Context/ScopeOneContext";

export default function ChooseActivities() {
  const { checkedValuesScopeOne, selectedValuesScopeOne, setSelectedValuesScopeOne ,activities, setActivities} = useScopeOne();
  // const [activities, setActivities] = useState({});

  console.log("From Activities Page - Checked Values:", activities);

  // Function to fetch activities based on checked scope factors
  const FetchActivities = async () => {
    try {
      if (!checkedValuesScopeOne || checkedValuesScopeOne.length === 0) return;
  
      // Convert array to a properly encoded string
      const checkedValuesStr = checkedValuesScopeOne.map(encodeURIComponent).join(",");
  
      console.log("Fetching activities for:", checkedValuesStr); // Debugging log
  
      const response = await fetch(
        `https://ghg-conversion-factors-backend.vercel.app/scope_activities/${checkedValuesStr}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Fetched Activities:", data);
  
      setActivities(data); // Store structured data
    } catch (error) {
      console.error("Error fetching scope activities:", error);
    }
  };
  
  

  // Fetch activities whenever checkedValuesScopeOne changes
  useEffect(() => {
    FetchActivities();
  }, [checkedValuesScopeOne]);

  // console.log("Activities Data:", activities);

  // Handle Checkbox Change
  const handleCheckboxChange = (category, item) => {
    setSelectedValuesScopeOne((prev) => {
      const updatedCategoryValues = prev[category] ? [...prev[category]] : [];

      if (updatedCategoryValues.includes(item)) {
        updatedCategoryValues.splice(updatedCategoryValues.indexOf(item), 1); // Remove item if already selected
      } else {
        updatedCategoryValues.push(item); // Add item if not selected
      }

      return { ...prev, [category]: updatedCategoryValues };
    });
  };

  return (
    <div className="flex flex-col justify-center items-center bg-[#effbf7] w-full md:w-[768px] lg:w-[1152px] md:mx-auto mt-10 md:mt-16 lg:mt-10 p-4 md:p-6 rounded-xl shadow-lg flex-grow min-h-[515px]">
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
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
                    />
                  </Disclosure.Button>

                  {/* Disclosure Panel for the Category */}
                  <Disclosure.Panel
                    className={`p-4 w-full bg-[#effbf7] rounded-b-lg overflow-hidden transition-all duration-300 ease-in-out ${
                      open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="flex flex-wrap gap-4">
                      {activities[key].map((item, idx) => (
                        <div key={idx} className="flex items-center">
                          <Checkbox
                            checked={selectedValuesScopeOne[key]?.includes(item) || false}
                            onChange={() => handleCheckboxChange(key, item)}
                            className="text-gray-700"
                          >
                            <span className="text-gray-700">{item}</span>
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
