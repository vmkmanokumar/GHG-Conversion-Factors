"use client";

import { Checkbox } from "antd";
import Chooseactivities from "./Chooseactivities";
import { useScopeOne } from "../Context/ScopeOneContext";
import Parameters from "./Parameters";
import { useEffect, useState } from "react";
import ParametersAndUnits from "./ParametersAndUnits";
import "./Styles/ScopeOneFactors.css";

export default function ScopeOneFactors({ pageChange }) {
  const {
    checkedValuesScopeOne,
    setCheckedValuesScopeOne,
    activities,
    setActivities,
  } = useScopeOne();
  
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("username");
      if (storedUserId) setUserId(storedUserId);
    }
  }, []);

  const fetchFactors = async () => {
    try {
      const response = await fetch(
        "https://ghg-conversion-factors-backend.vercel.app/scope_factors"
      );
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      console.log("Fetched activities:", data);

      // Ensure `data` is an array
      setActivities(Array.isArray(data) ? data.map((item) => ({ name: item, value: item })) : []);
    } catch (error) {
      console.error("Error fetching scope factors:", error);
      setActivities([]); // Set an empty array on failure
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const fetchSavedScopeOne = async () => {
    if (!userId) return;
    try {
      const response = await fetch(
        `https://ghg-conversion-factors-backend.vercel.app/get_scope_one/${userId}`
      );
      if (!response.ok) throw new Error("Failed to fetch saved data");

      const data = await response.json();
      setCheckedValuesScopeOne(data.selected_activities || []);
    } catch (error) {
      console.error("Error loading saved scope factors:", error);
    }
  };

  const saveScopeOne = async (updatedValues) => {
    if (!userId) {
      console.error("User ID is missing! Cannot save.");
      return;
    }
    try {
      const response = await fetch(
        "https://ghg-conversion-factors-backend.vercel.app/save_scope_one",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userId, selected_activities: updatedValues }),
        }
      );
      if (!response.ok)
        throw new Error(`HTTP Error! Status: ${response.status}`);
    } catch (error) {
      console.error("Error saving scope factors:", error);
    }
  };

  const handleCheckboxChange = (updatedValues) => {
    setCheckedValuesScopeOne(updatedValues);
    saveScopeOne(updatedValues);
  };

  useEffect(() => {
    fetchFactors();
  }, []);

  useEffect(() => {
    if (userId) fetchSavedScopeOne();
  }, [userId]);

  return (
    <>
      {pageChange === 0 && (
        <div className="flex flex-col justify-center items-center bg-[#effbf7] border-[black] w-full md:w-[768px] lg:w-[1152px] md:mx-auto mt-10 md:mt-16 lg:mt-10 p-4 md:p-6 rounded-xl shadow-lg flex-grow min-h-[515px]">
          <div className="w-full md:w-[500px] max-w-2xl rounded-lg p-4 md:p-6">
            <h1 className="text-[20px] md:text-[22px] lg:text-[23px] font-black">
              Scope Factors
            </h1>

            {/* Show loading state */}
            {loading ? (
              <p>Loading...</p>
            ) : activities.length > 0 ? (
              <Checkbox.Group onChange={handleCheckboxChange} value={checkedValuesScopeOne}>
                <div className="flex flex-col gap-4 md:gap-5 lg:gap-6 mt-4 md:mt-6 lg:mt-8">
                  {activities.map((item) => (
                    <Checkbox key={item.value} value={item.value} className="text-[22px]">
                      {item.name}
                    </Checkbox>
                  ))}
                </div>
              </Checkbox.Group>
            ) : (
              <p>No activities found</p>
            )}
          </div>
        </div>
      )}
      {pageChange === 1 && <Chooseactivities />}
      {pageChange === 2 && <Parameters />}
      {pageChange === 3 && <ParametersAndUnits />}
    </>
  );
}
