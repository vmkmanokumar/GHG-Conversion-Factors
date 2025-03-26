"use client";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Checkbox } from "antd";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useScopeTwo } from "../Context/ScopeTwoContext";

export default function ChooesactivitiesScopeTwo() {
  const { checkedValuesScopeTwo, selectedValuesScopeTwo, setSelectedValuesScopeTwo } = useScopeTwo();
  const [activities, setActivities] = useState(null);

  // Fetch activities from the backend
  const fetchActivities = async () => {
    try {
      const response = await fetch(
        "https://ghg-conversion-factors-backend.vercel.app/scope_factors",
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      console.log("Fetched Scope 2 Data:", data);

      // Transform the data to match our component's structure
      // We know we have UK Electricity -> Electricity generated
      const transformedData = {
        "UK Electricity": ["Electricity generated"]
      };
      
      setActivities(transformedData);
    } catch (error) {
      console.error("Error fetching activities:", error);
      setActivities(null);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleCheckboxChange = (category, item) => {
    setSelectedValuesScopeTwo((prev) => {
      const updatedCategoryValues = prev[category] ? [...prev[category]] : [];
      if (updatedCategoryValues.includes(item)) {
        updatedCategoryValues.splice(updatedCategoryValues.indexOf(item), 1);
      } else {
        updatedCategoryValues.push(item);
      }
      return { ...prev, [category]: updatedCategoryValues };
    });
  };

  if (!activities) {
    return (
      <div className="flex flex-col justify-center items-center bg-[#effbf7] w-full md:w-[768px] lg:w-[1152px] md:mx-auto mt-10 md:mt-16 lg:mt-10 p-4 md:p-6 rounded-xl shadow-lg flex-grow min-h-[515px]">
        <p className="text-gray-500">Loading activities...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center bg-[#effbf7] w-full md:w-[768px] lg:w-[1152px] md:mx-auto mt-10 md:mt-16 lg:mt-10 p-4 md:p-6 rounded-xl shadow-lg flex-grow min-h-[515px]">
      <h1 className="text-2xl font-bold">Activities</h1>
      <div className="w-full min-h-[250px] flex-grow text-[22px]">
        {Object.keys(activities).map((key) => (
          checkedValuesScopeTwo.includes(key) && (
            <Disclosure key={key}>
              {({ open }) => (
                <div className="bg-[#BFF1DF] w-full mt-4 rounded-lg shadow-sm">
                  <DisclosureButton className="flex justify-between items-center w-full px-4 py-3 text-lg font-medium text-gray-700">
                    <span>{key}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${open ? "rotate-180" : "rotate-0"}`} />
                  </DisclosureButton>
                  <DisclosurePanel className="p-4 w-full bg-[#effbf7] rounded-b-lg">
                    <div className="flex flex-wrap gap-4">
                      {activities[key]?.map((item, idx) => (
                        <Checkbox 
                          key={idx} 
                          checked={selectedValuesScopeTwo[key]?.includes(item) || false} 
                          onChange={() => handleCheckboxChange(key, item)}
                        >
                          {item}
                        </Checkbox>
                      ))}
                    </div>
                  </DisclosurePanel>
                </div>
              )}
            </Disclosure>
          )
        ))}
      </div>
    </div>
  );
}