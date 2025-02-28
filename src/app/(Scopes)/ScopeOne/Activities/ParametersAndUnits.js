import React, { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { Input, Select } from "antd";
import { DummydataForParameters, biogasDummyData } from "../dummyData/Dummydata";
import { useScopeOne } from "../Context/ScopeOneContext";

const { Option } = Select;

export default function ParametersAndUnits() {
  const { selectedFuels, setSelectedFuels } = useScopeOne();

  const [biogas,setBiogas] = useState({});

  console.log("Selected Fuels:", selectedFuels);

  const updateSelectedValues = async () => {
    try {
      const scopeList = [];

      console.log("scopelIst",scopeList)

      for (const category in selectedFuels) {
        for (const item in selectedFuels[category]) {
          for (const parameter in selectedFuels[category][item]) {
            if (selectedFuels[category][item][parameter].checked) {
              scopeList.push({
                scope: category, 
                param: parameter, 
                item: item, 
                unit: selectedFuels[category][item][parameter].selectedValue, 
              });
            }
          }
        }
      }

      const responseForBiogas = await fetch("http://127.0.0.1:5000/biogasData",{
        method:"GET"
      });

      if(!responseForBiogas.ok){
        throw new Error(`HTTP error! status :${responseForBiogas.status}`)
      }

      const responseForBiogasData = await responseForBiogas.json();
      setBiogas(responseForBiogasData)
      console.log("File datas",responseForBiogasData)

      console.log("Scope List:", scopeList);

      const response = await fetch("http://127.0.0.1:5000/selectedvalues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scopeList),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Update successful:", data);
    } catch (error) {
      console.error("Error updating selected values:", error);
    }
  };

  // ✅ Fix: Ensure API call runs only when `selectedFuels` is updated
  useEffect(() => {
    if (Object.keys(selectedFuels).length > 0) {
      updateSelectedValues();
    }
  }, [selectedFuels]);

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
    <div className="flex flex-col justify-center items-center bg-[#effbf7] w-full md:w-[768px] lg:w-[1152px] md:mx-auto mt-10 p-4 md:p-6 rounded-xl shadow-lg min-h-[515px]">
      <div className="w-full mb-[300]">

      <div className="w-full mb-4">
        <h1 className="text-2xl font-bold text-gray-800 mr-[700]">Parameters Maximum Value</h1>
      </div>

      <div className="w-full text-[22px]">
        {Object.keys(selectedFuels).map((category) => (
          <Disclosure key={category}>
            {({ open }) => (
              <div className="bg-[#BFF1DF] w-full mt-4 rounded-lg shadow-sm">
                <Disclosure.Button className="flex justify-between items-center w-full px-4 py-3 text-lg font-medium text-gray-700">
                  <span>{category}</span>
                  <ChevronDown className={`w-5 h-5 ${open ? "rotate-180" : "rotate-0"}`} />
                </Disclosure.Button>

                <Disclosure.Panel className="p-4 bg-[#effbf7] rounded-b-lg">
                  {Object.keys(selectedFuels[category]).map((item, idx) => (
                    <Disclosure key={idx}>
                      {({ open }) => (
                        <div className="mt-2">
                          <Disclosure.Button className="flex justify-between items-center w-full px-3 py-2 bg-[#BFF1DF] text-gray-600 rounded-md">
                            <span>{item}</span>
                            <ChevronDown className={`w-4 h-4 ${open ? "rotate-180" : "rotate-0"}`} />
                          </Disclosure.Button>

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
                                        <Disclosure.Button className="flex justify-between items-center w-full mt-2 px-3 py-2 bg-[#CBF4E5] text-gray-700 rounded-md">
                                          <span className="text-sm">{parameter}</span>
                                          <ChevronDown className={`w-4 h-4 ${open ? "rotate-180" : "rotate-0"}`} />
                                        </Disclosure.Button>

                                        <Disclosure.Panel className="p-2 bg-white rounded-lg mt-1">
                                          <div className="flex items-center gap-4">
                                            <Input
                                              placeholder="Enter max value"
                                              className="w-[344px] border-emerald-400"
                                              value={selectedFuels[category]?.[item]?.[parameter]?.maxValue || ""}
                                              onChange={(e) => handleChange(category, item, parameter, "maxValue", e.target.value)}
                                            />

                                            <Select
                                              className="w-[410px] border-black"
                                              placeholder="Select unit"
                                              value={selectedFuels[category]?.[item]?.[parameter]?.selectedValue || undefined}
                                              onChange={(unit) => handleChange(category, item, parameter, "selectedValue", unit)}
                                            >
                                              {fuelData?.values?.map((unit) => (
                                                <Option key={unit} value={unit}>
                                                  {unit}
                                                </Option>
                                              ))}
                                            </Select>
                                          </div>
                                        </Disclosure.Panel>
                                      </div>
                                    )}
                                  </Disclosure>
                                </div>
                              );
                            })}
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
      
    </div>
  );
}
