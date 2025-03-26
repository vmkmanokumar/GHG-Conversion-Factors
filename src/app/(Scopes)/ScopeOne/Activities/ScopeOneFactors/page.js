"use client";

import { Checkbox } from "antd";
import Chooseactivities from "../Chooseactivities";
import { useScopeOne } from "../../Context/ScopeOneContext";
import Parameters from "../Parameters";
import { useEffect, useState, useRef } from "react";
import CreateTempName from "../CreareTempName";

export default function ScopeOneFactors({ pageChange }) {
  const {
    checkedValuesScopeOne,
    setCheckedValuesScopeOne,
    activities,
    setActivities,
    allEntries,
    userId,
    setUserId,
    editTemplate,
    setEditTemplate,
    fetchedCheckedValues,
    setFetchedCheckedValues
  } = useScopeOne();

  console.log("fetchedCheckedValues from scopeOnefactor", fetchedCheckedValues);

  const Id = allEntries.map((entry) => entry.id).join(",");
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  // Fetch Scope Factors
  const fetchFactors = async () => {
    try {
      const response = await fetch(
        "https://ghg-conversion-factors-backend.vercel.app/scope_factors"
      );
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
      const data = await response.json();
      console.log("Fetched activities before filtering:", data); // 🔍 Debug log
  
      // 🔴 Remove "UK Electricity" from the activities list
      const filteredActivities = data.filter(item => item !== "UK Electricity");
  
      console.log("Filtered Scope 1 activities:", filteredActivities); // Debug log
  
      setActivities(
        filteredActivities.map((item) => ({ name: item, value: item }))
      );
    } catch (error) {
      console.error("Error fetching scope factors:", error);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };
  

  // Fetch Saved Scope One
  const fetchSavedScopeOne = async () => {
    if (!userId || !Id) {
      console.error("Missing userId or Id");
      return;
    }

    try {
      const response = await fetch(
        `https://ghg-conversion-factors-backend.vercel.app/get_scope_one?userId=${encodeURIComponent(userId)}&Id=${encodeURIComponent(Id)}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Full API Response:", data);

      if (data?.templatesave && typeof data.templatesave === "object") {
        const extractedKeys = Object.keys(data.templatesave);
        console.log("Extracted Keys:", extractedKeys);
        
        // setFetchedCheckedValues(extractedKeys); // ✅ Store fetched values in state
        setCheckedValuesScopeOne(extractedKeys); // ✅ Update the checked values state
      } else {
        console.log("No saved templates found or invalid format.");
      }
    } catch (error) {
      console.error("Error loading saved scope factors:", error);
    }
  };

  // ✅ Handle Checkbox Changes (Editable in Edit Mode)
  const handleCheckboxChange = (updatedValues) => {
    if (editTemplate === "Edit") {
      setFetchedCheckedValues(updatedValues); // ✅ Allow editing in Edit Mode
    }
    setCheckedValuesScopeOne(updatedValues);
    console.log("Updated values:", updatedValues);
  };

  // ✅ Initial Fetch
  useEffect(() => {
    fetchFactors();
  }, []);

  // ✅ Fetch saved scope one when `editTemplate === "Edit"`
  useEffect(() => {
    if (editTemplate === "Edit" && userId && Id && !hasFetched.current) {
      fetchSavedScopeOne();
      hasFetched.current = true;
    }
  }, [editTemplate, userId, Id]);

  // ✅ Get userId from localStorage on first render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("username");
      if (storedUserId) setUserId(storedUserId);
    }
  }, []);

  return (
    <>
      {pageChange === -1 && <CreateTempName />}

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
              <Checkbox.Group
                onChange={handleCheckboxChange}
                value={checkedValuesScopeOne} // ✅ Keeps selections persistent
              >
                <div className="flex flex-col gap-4 md:gap-5 lg:gap-6 mt-4 md:mt-6 lg:mt-8 font-sherif">
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
    </>
  );
}
