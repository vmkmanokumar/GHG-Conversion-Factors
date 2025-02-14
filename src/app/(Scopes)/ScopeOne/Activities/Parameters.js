import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { Checkbox, Radio } from "antd";
import { DummydataForParameters } from "../dummyData/Dummydata";
import { biogasDummyData } from "../dummyData/Dummydata";
import { useScopeOne } from "../Context/ScopeOneContext";

export default function Parameters() {
  const { selectedValuesScopeOne, selectedFuels, setSelectedFuels } = useScopeOne();

  const selectedValues = selectedValuesScopeOne || {};

  console.log(selectedFuels)

  const handleClick = (type, fuel, item, selectedValue = null) => {
    setSelectedFuels((prev) => {
      if (type === "checkbox") {
        return {
          ...prev,
          [item]: {
            ...prev[item],
            [fuel]: {
              checked: !prev[item]?.[fuel]?.checked,
              selectedValue: prev[item]?.[fuel]?.selectedValue,
            },
          },
        };
      } else if (type === "radio") {
        return {
          ...prev,
          [item]: {
            ...prev[item],
            [fuel]: {
              checked: prev[item]?.[fuel]?.checked,
              selectedValue: selectedValue,
            },
          },
        };
      }
      return prev; // Default return to avoid state mutation issues
    });
  };

  return (
    <div className="flex flex-col justify-center items-center bg-[#effbf7] w-full md:w-[768px] lg:w-[1152px] md:mx-auto mt-10 md:mt-16 lg:mt-10 p-4 md:p-6 rounded-xl shadow-lg flex-grow min-h-[515px]">
      <div className="w-full mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Parameters</h1>
      </div>

      <div className="w-full min-h-[250px] flex-grow text-[22px]">
        {Object.keys(selectedValues).map((category) => (
          <Disclosure key={category}>
            {({ open }) => (
              <div className="bg-[#BFF1DF] w-full mt-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <Disclosure.Button className="flex justify-between items-center w-full px-4 py-3 text-lg font-medium text-gray-700 focus:outline-none">
                  <span>{category}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
                  />
                </Disclosure.Button>

                <Disclosure.Panel className="p-4 w-full bg-[#effbf7] rounded-b-lg overflow-hidden">
                  {selectedValues[category]?.map((item, idx) => {
                    // console.log("Item:", item); // Debugging: Log the item
                    // console.log("DummydataForParameters Keys:", Object.keys(DummydataForParameters)); // Debugging: Log the keys

                    return (
                      <Disclosure key={idx}>
                        {({ open }) => (
                          <div className="w-full mt-2">
                            <Disclosure.Button className="flex justify-between items-center w-full px-3 py-2 text-gray-600 bg-[#BFF1DF] rounded-md focus:outline-none transition-all duration-300">
                              <span className="text-base">{item}</span>
                              <ChevronDown
                                className={`w-4 h-4 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
                              />
                            </Disclosure.Button>

                            <Disclosure.Panel className="p-2 bg-[#effbf7] rounded-md mt-1 text-gray-500">
                              {Object.keys(DummydataForParameters).map((key) => {
                                // console.log("Key:", key); // Debugging: Log the key
                                if (key === item) {
                                  return (
                                    <div key={key} className="flex flex-wrap flex-col gap-4 mt-2">
                                      {DummydataForParameters[key]?.map((fuelItem) => {
                                        const fuelData = biogasDummyData.find((fuel) => fuel.name === fuelItem);

                                        return (
                                          <div key={fuelItem} className="flex flex-col p-2 border rounded-lg">
                                            <Checkbox
                                              checked={selectedFuels[item]?.[fuelItem]?.checked || false}
                                              onChange={() => handleClick("checkbox", fuelItem, item)}
                                              className="font-semibold text-gray-700"
                                            >
                                              {fuelItem}
                                            </Checkbox>

                                            {fuelData && selectedFuels[item]?.[fuelItem]?.checked && (
                                              <Radio.Group
                                                className="ml-10 mt-2"
                                                value={selectedFuels[item]?.[fuelItem]?.selectedValue}
                                                onChange={(e) => handleClick("radio", fuelItem, item, e.target.value)}
                                              >
                                                {fuelData.values.map((unit) => (
                                                  <Radio key={unit} value={unit}>
                                                    {unit}
                                                  </Radio>
                                                ))}
                                              </Radio.Group>
                                            )}
                                          </div>
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
                    );
                  })}
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
}