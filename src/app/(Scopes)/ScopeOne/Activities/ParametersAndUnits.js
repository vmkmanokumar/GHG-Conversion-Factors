import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { Input, Select } from "antd";
import { DummydataForParameters } from "../dummyData/Dummydata";
import { useScopeOne } from "../Context/ScopeOneContext";
import { biogasDummyData } from "../dummyData/Dummydata";

const { Option } = Select;

export default function ParametersAndUnits() {
  const { selectedValuesScopeOne, selectedFuels, setSelectedFuels } = useScopeOne();

  // Debugging logs
  console.log("Parameter Page - Selected Fuels:", selectedFuels);

  const selectedValues = selectedValuesScopeOne || {};

  // Combined handleChange function
  const handleChange = (fuelItem, field, value, item) => {
    setSelectedFuels((prev) => ({
      ...prev,
      [item]: {
        ...prev[item], // Preserve existing properties for the current item
        [fuelItem]: {
          ...(prev[item]?.[fuelItem] || {}), // Preserve existing properties for the current fuelItem
          ...(field === "selectedValue" ? { selectedValue: value } : { [field]: value }), // Replace selectedUnit if field is selectedValue
        },
      },
    }));
  };

  return (
    <div className="flex flex-col justify-center items-center bg-[#effbf7] w-full md:w-[768px] lg:w-[1152px] md:mx-auto mt-10 md:mt-16 lg:mt-10 p-4 md:p-6 rounded-xl shadow-lg flex-grow min-h-[515px]">
      <div className="w-full mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Parameters Maximum Value</h1>
      </div>

      <div className="w-full min-h-[250px] flex-grow text-[22px]">
        {Object.keys(selectedValues).map((category) => (
          <Disclosure key={category}>
            {({ open }) => (
              <div className="bg-[#BFF1DF] w-full mt-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <Disclosure.Button className="flex justify-between items-center w-full px-4 py-3 text-lg font-medium text-gray-700 focus:outline-none">
                  <span>{category}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${open ? "rotate-180" : "rotate-0"}`} />
                </Disclosure.Button>

                <Disclosure.Panel className="p-4 w-full bg-[#effbf7] rounded-b-lg overflow-hidden">
                  {selectedValues[category]?.map((item, idx) => (
                    <Disclosure key={idx}>
                      {({ open }) => (
                        <div className="mt-2">
                          <Disclosure.Button className="flex justify-between items-center w-full px-3 py-2 text-gray-600 bg-[#BFF1DF] rounded-md focus:outline-none transition-all duration-300">
                            <span className="text-base">{item}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : "rotate-0"}`} />
                          </Disclosure.Button>

                          <Disclosure.Panel className="p-2 bg-[#effbf7] rounded-md mt-1 text-gray-500">
                            {Object.keys(DummydataForParameters).map((key) => {
                              if (key === item) {
                                return (
                                  <div key={key} className="flex flex-col gap-4 mt-2">
                                    {DummydataForParameters[key]?.map((fuelItem) => {
                                      const fuelData = biogasDummyData.find((b) => b.name === fuelItem);

                                      return (
                                        selectedFuels[item]?.[fuelItem] && ( // Ensure only selected fuels are displayed
                                          <div key={fuelItem} className="p-0 shadow-md">
                                            <Disclosure>
                                              {({ open }) => (
                                                <div>
                                                  <Disclosure.Button className="flex justify-between items-center w-full px-3 py-2 bg-[#CBF4E5] text-gray-700 rounded-md focus:outline-none">
                                                    <span className="text-sm">{fuelItem}</span>
                                                    <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : "rotate-0"}`} />
                                                  </Disclosure.Button>

                                                  <Disclosure.Panel className="p-2 bg-white rounded-lg mt-1">
                                                    <div className="flex items-center gap-4">
                                                      {/* Input field to save the max value */}
                                                      <Input
                                                        placeholder="Enter the max value"
                                                        className="w-[344px] border-emerald-400"
                                                        value={selectedFuels[item]?.[fuelItem]?.maxValue || ""}
                                                        onChange={(e) => handleChange(fuelItem, "maxValue", e.target.value, item)}
                                                      />

                                                      {/* Select dropdown for unit selection */}
                                                      <Select
                                                        className="w-[410px] border-black"
                                                        placeholder="Select unit"
                                                        value={selectedFuels[item]?.[fuelItem]?.selectedValue || undefined}
                                                        onChange={(unit) => handleChange(fuelItem, "selectedValue", unit, item)}
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
                                        )
                                      );
                                    })}
                                  </div>
                                );
                              }
                              return null;
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
  );
}