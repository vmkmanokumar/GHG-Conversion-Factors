import React, { useState, useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { Checkbox, Radio } from "antd";
import { useScopeOne } from "../Context/ScopeOneContext";

export default function Parameters() {
  const {
    selectedValuesScopeOne,
    selectedFuels,
    setSelectedFuels,
    fetchedParameters,
    setFetchedParameters,
  } = useScopeOne();

  const [ activities,setActivities] = useState([])  

  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("username");
      if (storedUserId) {
        setUserId(storedUserId);
      }
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchData();
      loadScopeOneDraft();
    }
  }, [userId]);

  // Fetch parameters from API
  const fetchData = async () => {
    try {
      const scopeFactors = encodeURIComponent(Object.keys(selectedValuesScopeOne));
      const activitie = encodeURIComponent(Object.values(selectedValuesScopeOne).flat());

      const response = await fetch(
        `https://ghg-conversion-factors-backend.vercel.app/parameters?scope=${scopeFactors}&params=${activitie}`,
        { method: "GET" }
      );

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      setFetchedParameters(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Load saved draft
  const loadScopeOneDraft = async () => {
    try {
      const response = await fetch(`https://ghg-conversion-factors-backend.vercel.app/get_scope_one_draft2/${userId}`);

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();

      if (data && data.activities) {
        setActivities(data.activities);
      }
      if (data && data.parameters) {
        setSelectedFuels(data.parameters);
      }
    } catch (error) {
      console.error("Error loading draft:", error);
    }
  };

  // Save draft
  const saveScopeOneDraft = async (updatedFuels) => {
    try {
      const payload = {
        user_id: userId,
        activities: activities,
        parameters: updatedFuels, // Send only selected values
      };

      const response = await fetch(
        "https://ghg-conversion-factors-backend.vercel.app/save_scope_one_draft2",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      console.log("Draft Save Response:", data);
    } catch (error) {
      console.error("Error saving draft:", error);
    }
  };

  // Handle Checkbox/Radio Click - Stores Only Selected Values
  const handleClick = (type, parameter, item, category, selectedValue = null) => {
    setSelectedFuels((prev) => {
      let updatedFuels = { ...prev };

      if (type === "checkbox") {
        const isChecked = !prev[category]?.[item]?.[parameter]?.checked;

        if (isChecked) {
          // Add to selectedFuels if checked
          updatedFuels = {
            ...prev,
            [category]: {
              ...prev[category],
              [item]: {
                ...prev[category]?.[item],
                [parameter]: {
                  checked: true,
                  selectedValue: prev[category]?.[item]?.[parameter]?.selectedValue || "",
                },
              },
            },
          };
        } else {
          // Remove from selectedFuels if unchecked
          const updatedCategory = { ...prev[category] };
          delete updatedCategory[item]?.[parameter];

          // Remove empty nested objects
          if (Object.keys(updatedCategory[item] || {}).length === 0) {
            delete updatedCategory[item];
          }
          if (Object.keys(updatedCategory).length === 0) {
            delete updatedFuels[category];
          } else {
            updatedFuels[category] = updatedCategory;
          }
        }
      } else if (type === "radio") {
        if (prev[category]?.[item]?.[parameter]?.checked) {
          updatedFuels[category][item][parameter].selectedValue = selectedValue;
        }
      }

      saveScopeOneDraft(updatedFuels);
      return updatedFuels;
    });
  };

  useEffect(() => {
    fetchData();
    loadScopeOneDraft();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center bg-[#effbf7] w-full md:w-[768px] lg:w-[1152px] md:mx-auto mt-10 md:mt-16 lg:mt-10 p-4 md:p-6 rounded-xl shadow-lg flex-grow min-h-[515px]">
      <div className="w-full mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Parameters</h1>
      </div>

      <div className="w-full min-h-[250px] flex-grow text-[22px]">
        {Object.keys(fetchedParameters).map((category) => (
          <Disclosure key={category}>
            {({ open }) => (
              <div className="bg-[#BFF1DF] w-full mt-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <Disclosure.Button className="flex justify-between items-center w-full px-4 py-3 text-lg font-medium text-gray-700 focus:outline-none">
                  <span>{category}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${open ? "rotate-180" : "rotate-0"}`} />
                </Disclosure.Button>

                <Disclosure.Panel className="p-4 w-full bg-[#effbf7] rounded-b-lg overflow-hidden">
                  {Object.keys(fetchedParameters[category])?.map((item, idx) => (
                    <Disclosure key={idx}>
                      {({ open }) => (
                        <div className="w-full mt-2">
                          <Disclosure.Button className="flex justify-between items-center w-full px-3 py-2 text-gray-600 bg-[#BFF1DF] rounded-md focus:outline-none transition-all duration-300">
                            <span className="text-base">{item}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : "rotate-0"}`} />
                          </Disclosure.Button>

                          <Disclosure.Panel className="p-2 bg-[#effbf7] rounded-md mt-1 text-gray-500">
                            {Object.keys(fetchedParameters[category][item])?.map((parameter, idx) => (
                              <div key={`${parameter}-${idx}`} className="flex flex-col p-2 rounded-lg">
                                <Checkbox
                                  checked={selectedFuels[category]?.[item]?.[parameter]?.checked || false}
                                  onChange={() => handleClick("checkbox", parameter, item, category)}
                                  className="font-semibold text-gray-700"
                                >
                                  {parameter}
                                </Checkbox>

                                {selectedFuels[category]?.[item]?.[parameter]?.checked && (
                                  <Radio.Group
                                    className="ml-10 mt-2"
                                    value={selectedFuels[category]?.[item]?.[parameter]?.selectedValue}
                                    onChange={(e) => handleClick("radio", parameter, item, category, e.target.value)}
                                  >
                                    {fetchedParameters[category][item][parameter]?.units.map((unit, radioIdx) => (
                                      <Radio key={`${parameter}-${unit}-${radioIdx}`} value={unit}>
                                        {unit}
                                      </Radio>
                                    ))}
                                  </Radio.Group>
                                )}
                              </div>
                            ))}
                          </Disclosure.Panel>
                        </div>
                      )}
                    </Disclosure>
                  ))}
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
}
