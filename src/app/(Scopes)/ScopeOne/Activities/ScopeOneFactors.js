"use client";

import { Checkbox } from "antd";
import Chooseactivities from "./Chooseactivities";
import { useScopeOne } from "../Context/ScopeOneContext";
import Parameters from "./Parameters";
import { useEffect, useState } from "react";
import ParametersAndUnits from "./ParametersAndUnits";
import "./Styles/ScopeOneFactors.css";

const userId = localStorage.getItem("username")

export default function ScopeOneFactors({ pageChange }) {
  const { checkedValuesScopeOne, setCheckedValuesScopeOne } = useScopeOne();
  const [activities, setActivities] = useState([]);

  

  console.log("ScopeFactor", checkedValuesScopeOne);
  console.log("Activities", activities);

  // Fetch available activities
  const fetchFactors = async () => {
    try {
      const response = await fetch("https://ghg-conversion-factors-backend.vercel.app/scope_factors", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();

      const formattedData = data.map((item) => ({
        name: item,
        value: item,
      }));

      setActivities(formattedData);

    } catch (error) {
      console.error("Error fetching scope factors:", error);
    }
  };

  // Fetch saved checkboxes
  const fetchSavedScopeOne = async () => {
    try {
      const response = await fetch(`https://ghg-conversion-factors-backend.vercel.app/get_scope_one/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch saved data");

      const data = await response.json();
      setCheckedValuesScopeOne(data.selected_activities);
    } catch (error) {
      console.error("Error loading saved scope factors:", error);
    }
  };

  // Save selected checkboxes **immediately after clicking**
  const saveScopeOne = async (updatedValues) => {
    try {
      await fetch("https://ghg-conversion-factors-backend.vercel.app/save_scope_one", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          selected_activities: updatedValues,
        }),
      });
    } catch (error) {
      console.error("Error saving scope factors:", error);
    }
  };

  // Handle checkbox change & auto-save
  const handleCheckboxChange = (updatedValues) => {
    setCheckedValuesScopeOne(updatedValues);
    saveScopeOne(updatedValues); // Auto-save when checkbox is clicked
  };

  useEffect(() => {
    fetchFactors();
    fetchSavedScopeOne();
  }, []); // Runs only once

  return (
    <>
      {pageChange === 0 && (
        <div className="flex flex-col justify-center items-center bg-[#effbf7] border-[black] w-full md:w-[768px] lg:w-[1152px] md:mx-auto mt-10 md:mt-16 lg:mt-10 p-4 md:p-6 rounded-xl shadow-lg flex-grow min-h-[515px]">
          <div className="w-full md:w-[500px] max-w-2xl rounded-lg p-4 md:p-6 lg:mr-[600] lg:mb-[80]">
            <h1 className="text-[20px] md:text-[22px] lg:text-[23px] font-black mr-[600] w-[200] text-base">
              Scope Factors
            </h1>

            <Checkbox.Group onChange={handleCheckboxChange} value={checkedValuesScopeOne}>
              <div className="flex flex-col gap-4 md:gap-5 lg:gap-6 mt-4 md:mt-6 lg:mt-8">
                {activities.map((item) => (
                  <Checkbox key={item.value} value={item.value} className="text-[22px]">
                    {item.name}
                  </Checkbox>
                ))}
              </div>
            </Checkbox.Group>
          </div>
        </div>
      )}

      {pageChange === 1 && <Chooseactivities />}
      {pageChange === 2 && <Parameters />}
      {pageChange === 3 && <ParametersAndUnits />}
    </>
  );
}
