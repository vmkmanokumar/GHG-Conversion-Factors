"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { Input, Select, Button ,message,notification} from "antd";
import { motion } from "framer-motion";
import { useScopeOne } from "../../Context/ScopeOneContext";

const { Option } = Select;

export default function ParametersAndUnits({setScopeOneTotal,scopeOneTotal}) {
  const { selectedFuels, setSelectedFuels } = useScopeOne();
  const [biogas, setBiogas] = useState([]);
  // const [messageApi, contextHolder] = message.useMessage();
  const [api, contextHolder] = notification.useNotification();
  

  console.log("Selected Fuels:", selectedFuels);


  const DataEnteryScope1 = async () => {
    // ✅ Extracting only parameter, maxValue, and selectedValue
    const payload = [];
  
    Object.keys(selectedFuels).forEach((category) => {
      Object.keys(selectedFuels[category]).forEach((item) => {
        Object.keys(selectedFuels[category][item]).forEach((parameter) => {
          const paramData = selectedFuels[category][item][parameter];
  
          if (paramData.checked) {
            payload.push({
              parameter: parameter,                          // Parameter name
              maxValue: paramData.maxValue || "",            // Max value
              selectedValue: paramData.selectedValue || ""   // Selected unit
            });
          }
        });
      });
    });
  
    console.log("Payload to be sent:", payload); // Check the transformed payload
  
    try {
      const response = await fetch("https://ghg-conversion-factors-backend.vercel.app/DataEntery/Scope1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",   // ✅ Fixed header format
        },
        body: JSON.stringify(payload),          // ✅ Sending only the relevant fields
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Data successfully sent:", data);
        setScopeOneTotal(data.ScopeOneTotal)
        api.success({
          message: "Success",
          description: data.message,
          placement:"topLeft"
        });
        

       
      } else {
        console.error("Failed to send data:", response.status);
      }
    } catch (error) {
      console.error("Error in POST request:", error);
    }
  };
  








  useEffect(() => {
    const fetchBiogasData = async () => {
      try {
        const response = await fetch(
          "https://ghg-conversion-factors-backend.vercel.app/biogasData"
        );
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        setBiogas(data);
        console.log("Biogas Data:", data);
      } catch (error) {
        console.error("Error fetching biogas data:", error);
      }
    };

    fetchBiogasData();
  }, []);

  useEffect(() => {
    const templateSave = localStorage.getItem("templateSaves");
    if (templateSave) {
      setSelectedFuels(JSON.parse(templateSave)[0]);
    }
  }, []);






  const handleChange = (category, item, parameter, field, value) => {
    setSelectedFuels((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [item]: {
          ...prev[category]?.[item],
          [parameter]: {
            ...(prev[category]?.[item]?.[parameter] || {}),
            [field]: value,
          },
        },
      },
    }));
  };

  return (
    <>
    {contextHolder}
    <div className="flex flex-col  justify-between items-center bg-[#effbf7]  md:w-[768px] lg:w-[650px] md:mx-auto mt-10 md:mt-20 lg:mt-10 p-4 md:p-6 rounded-xl shadow-lg flex-grow min-h-[515px]">
      {/* Title */}
      <div className="w-full mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Parameters Maximum Value</h1>
      </div>

      {/* Content Wrapper */}
      <div className="w-full flex-grow min-h-[250px] text-[22px] overflow-auto">
        {Object.keys(selectedFuels).map((category) => (
          <Disclosure key={category}>
            {({ open }) => (
              <div className="bg-[#BFF1DF] w-full mt-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                {/* Category Dropdown */}
                <Disclosure.Button className="flex justify-between items-center w-full px-4 py-3 text-lg font-medium text-gray-700 focus:outline-none">
                  <span>{category}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
                  />
                </Disclosure.Button>

                {/* Smooth Transition Panel */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <Disclosure.Panel className="p-4 w-full bg-[#effbf7] rounded-b-lg">
                    {Object.keys(selectedFuels[category]).map((item, idx) => (
                      <Disclosure key={idx}>
                        {({ open }) => (
                          <div className="w-full mt-2">
                            {/* Item Dropdown */}
                            <Disclosure.Button className="flex justify-between items-center w-full px-3 py-2 text-gray-600 bg-[#BFF1DF] rounded-md focus:outline-none transition-all duration-300">
                              <span className="text-base">{item}</span>
                              <ChevronDown
                                className={`w-4 h-4 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
                              />
                            </Disclosure.Button>

                            {/* Smooth Transition for Item Panel */}
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <Disclosure.Panel className="p-2 bg-[#effbf7] rounded-md mt-1 text-gray-500">
                                {Object.keys(selectedFuels[category][item])
                                  .filter((parameter) => selectedFuels[category][item][parameter]?.checked)
                                  .map((parameter) => {
                                    const fuelData = biogas.find((b) => b.name === parameter);

                                    return (
                                      <div key={parameter} className="p-0 shadow-md">
                                        <Disclosure>
                                          {({ open }) => (
                                            <div>
                                              {/* Parameter Dropdown */}
                                              <Disclosure.Button className="flex justify-between items-center w-full mt-2 px-3 py-2 bg-[#CBF4E5] text-gray-700 rounded-md">
                                                <span className="text-sm">{parameter}</span>
                                    
                                              </Disclosure.Button>

                                              {/* Parameter Panel */}
                                              <div className="p-2 bg-white rounded-lg mt-1">
                                                <div className="flex items-center gap-4">
                                                  {/* Max Value Input */}
                                                  <Input
                                                    placeholder="Enter max value"
                                                    className="w-[344px] border-emerald-400"
                                                    value={selectedFuels[category]?.[item]?.[parameter]?.maxValue || ""}
                                                    onChange={(e) =>
                                                      handleChange(category, item, parameter, "maxValue", e.target.value)
                                                    }
                                                  />

                                                  {/* Unit Selection */}
                                                  <Select
                                                    className="w-[410px] border-black"
                                                    placeholder="Select unit"
                                                    value={selectedFuels[category]?.[item]?.[parameter]?.selectedValue || undefined}
                                                    onChange={(unit) =>
                                                      handleChange(category, item, parameter, "selectedValue", unit)
                                                    }
                                                  >
                                                    {fuelData?.values?.map((unit) => (
                                                      <Option key={unit} value={unit}>
                                                        {unit}
                                                      </Option>
                                                    ))}
                                                  </Select>
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                        </Disclosure>
                                      </div>
                                    );
                                  })}
                              </Disclosure.Panel>
                            </motion.div>
                          </div>
                        )}
                      </Disclosure>
                    ))}
                  </Disclosure.Panel>
                </motion.div>
              </div>
            )}
          </Disclosure>
        ))}
      </div>

      {/* Save Changes Button */}
      <div className="w-full flex justify-center mt-auto pt-6">
        <Button
          onClick={DataEnteryScope1}
          className="bg-[#91e6c7] text-black hover:!bg-[#91e6c9]"
        >
          EnterData
        </Button>
      </div>
    </div>
    </>
  );
}