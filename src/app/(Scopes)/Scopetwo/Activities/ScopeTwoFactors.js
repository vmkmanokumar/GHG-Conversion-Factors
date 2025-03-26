"use client";

import { useState, useEffect } from "react";
import { Checkbox } from "antd";
import ChooesactivitiesScopeTwo from "./ChooesactiviesScopeTwo";
import ParametersForScopeTwo from "./ParametersForScopeTwo";
import ParameterUnitForScopeTwo from "./ParametersUnitForScopeTwo";
import { useScopeTwo } from "../Context/ScopeTwoContext"; 

export default function ScopeTwoFactors({ pageChange }) {
  const { checkedValuesScopeTwo, setCheckedValuesScopeTwo } = useScopeTwo();
  const [scopeFactor, setScopeFactor] = useState(null); // Store single database value

  console.log("Checked Scope Factor:", checkedValuesScopeTwo);

  // Fetch single Scope 2 Factor from the backend
  const fetchScopeFactor = async () => {
    try {
      const response = await fetch(
        "https://ghg-conversion-factors-backend.vercel.app/scope_factors",
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      console.log("Fetched Scope 2 Factors:", data);

      // ✅ Filter to get only "UK Electricity"
      const ukElectricityFactor = data.find((item) => item === "UK Electricity");
      console.log("UK Electricity Factor:", ukElectricityFactor);

      if (ukElectricityFactor) {
        setScopeFactor(ukElectricityFactor); // ✅ Store only "UK Electricity"
      } else {
        setScopeFactor(null); // If "UK Electricity" is not found
      }
    } catch (error) {
      console.error("Error fetching scope factor:", error);
      setScopeFactor(null);
    }
  };

  useEffect(() => {
    fetchScopeFactor(); // Fetch data when the component mounts
  }, []);

  const handleCheckboxChange = (checkedValues) => {
    console.log("Updated Checked Values:", checkedValues);
    setCheckedValuesScopeTwo(checkedValues);
  };

  return (
    <>
      {pageChange === 0 && (
        <div className="flex flex-col justify-center items-center bg-[#effbf7] w-full md:w-[768px] lg:w-[1152px] md:mx-auto mt-10 md:mt-16 lg:mt-10 p-4 md:p-6 rounded-xl shadow-lg flex-grow min-h-[515px]">
          <div className="w-full md:w-[500px] max-w-2xl rounded-lg p-4 md:p-6 lg:mr-96">
            <h1 className="text-[20px] md:text-[22px] lg:text-[23px] font-black">Scope Factors</h1>

            {scopeFactor ? (
              <Checkbox.Group onChange={handleCheckboxChange} value={checkedValuesScopeTwo}>
                <div className="flex flex-col gap-4 md:gap-5 lg:gap-6 mt-4 md:mt-6 lg:mt-8">
                  <Checkbox key={scopeFactor} value={scopeFactor} className="text-[22px]">
                    {scopeFactor}
                  </Checkbox>
                </div>
              </Checkbox.Group>
            ) : (
              <p className="text-gray-500 mt-4">Loading scope factor...</p>
            )}
          </div>
        </div>
      )}
      {pageChange === 1 && <ChooesactivitiesScopeTwo />}
      {pageChange === 2 && <ParametersForScopeTwo />}
      {pageChange === 3 && <ParameterUnitForScopeTwo />}
    </>
  );
}
