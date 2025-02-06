"use client";
import React from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Checkbox } from "antd";
import { ChevronDown } from "lucide-react";
import { DummydataForScope2Actives } from "../dummyDataForScopeTwo/DummyData";

export default function ChooesactivitiesScopeTwo({ checkedValuesScopeTwo, setCheckedValuesScopeTwo,selectedValuesScopeTwo ,setSelectedValuesScopeTwo}) { // ✅ Use passed props
  // const [selectedValuesScopeTwo, setSelectedValuesScopeTwo] = React.useState({});

  console.log(selectedValuesScopeTwo)

  // Handle Checkbox Change
  const handleCheckboxChange = (category, item) => {
    setSelectedValuesScopeTwo((prev) => {
      const updatedCategoryValues = prev[category] ? [...prev[category]] : [];

      // If item is already selected, remove it. Otherwise, add it.
      if (updatedCategoryValues.includes(item)) {
        updatedCategoryValues.splice(updatedCategoryValues.indexOf(item), 1);
      } else {
        updatedCategoryValues.push(item);
      }

      return { ...prev, [category]: updatedCategoryValues };
    });
  };

  return (
    <div className="flex flex-col justify-center items-center bg-[#effbf7] w-full md:w-[768px] lg:w-[1152px] md:mx-auto mt-10 md:mt-16 lg:mt-10 p-4 md:p-6 rounded-xl shadow-lg flex-grow min-h-[515px]">
      {/* Title */}
      <div className="w-full mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Activities</h1>
      </div>

      {/* Disclosure Section */}
      <div className="w-full min-h-[250px] flex-grow text-[22px]">
        {Object.keys(DummydataForScope2Actives).map((key) => {
          if (!checkedValuesScopeTwo.includes(key) || !DummydataForScope2Actives[key]) return null;

          return (
            <Disclosure key={key}>
              {({ open }) => (
                <div className="bg-[#BFF1DF] w-full mt-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <DisclosureButton className="flex justify-between items-center w-full px-4 py-3 text-lg font-medium text-gray-700 focus:outline-none transition duration-700">
                    <span>{key}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${open ? "rotate-180" : "rotate-0"}`} />
                  </DisclosureButton>

                  <DisclosurePanel
                    className={`p-4 w-full bg-[#effbf7] rounded-b-lg overflow-hidden transition-all duration-300 ease-in-out ${
                      open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="flex flex-wrap gap-4">
                      {DummydataForScope2Actives[key]?.map((item, idx) => (
                        <div key={idx} className="flex items-center">
                          <Checkbox
                            checked={selectedValuesScopeTwo[key]?.includes(item) || false}
                            onChange={() => handleCheckboxChange(key, item)}
                            className="text-gray-700"
                          >
                            <span className="text-gray-700">{item}</span>
                          </Checkbox>
                        </div>
                      ))}
                    </div>
                  </DisclosurePanel>
                </div>
              )}
            </Disclosure>
          );
        })}
      </div>
    </div>
  );
}
