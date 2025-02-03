import React from "react";
import { Disclosure } from "@headlessui/react";
import { Checkbox } from "antd";
import { ChevronDown } from "lucide-react";
import { DummydataForActives } from "./dummyData/Dummydata";

export default function ChooseActivities({ checkedValues, setSelectedValues, selectedValues }) {
  // Handle Checkbox Change
  const handleCheckboxChange = (category, item) => {
    setSelectedValues((prev) => {
      const updatedCategoryValues = prev[category] ? [...prev[category]] : [];

      if (updatedCategoryValues.includes(item)) {
        updatedCategoryValues.splice(updatedCategoryValues.indexOf(item), 1);
      } else {
        updatedCategoryValues.push(item);
      }

      return { ...prev, [category]: updatedCategoryValues };
    });
  };

  return (
    <div className="flex flex-col justify-center items-center bg-[#effbf7] w-full md:w-[768px] lg:w-[1152px] md:mx-auto h-auto md:h-[450px] lg:h-[512px] mt-10 md:mt-16 lg:mt-10 p-4 md:p-6 rounded-xl shadow-lg">
      {/* Title */}
      <div className="w-full mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Activities</h1>
      </div>

      {/* Disclosure Section */}
      <div className="w-full min-h-[250px] flex-grow text-[22px]">
        {Object.keys(DummydataForActives).map((key) => {
          if (!checkedValues.includes(key)) return null;

          return (
            <Disclosure key={key}>
              {({ open }) => (
                <div className="bg-[#BFF1DF] w-full mt-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <Disclosure.Button className="flex justify-between items-center w-full px-4 py-3 text-lg font-medium text-gray-700 focus:outline-none transition duration-700">
                    <span>{key}</span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        open ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </Disclosure.Button>

                  <Disclosure.Panel
                    className={`p-4 w-full bg-[#effbf7] rounded-b-lg overflow-hidden transition-all duration-300 ease-in-out ${
                      open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="flex flex-wrap gap-4">
                      {DummydataForActives[key].map((item, idx) => (
                        <div key={idx} className="flex items-center">
                          <Checkbox
                            checked={selectedValues[key]?.includes(item) || false}
                            onChange={() => handleCheckboxChange(key, item)}
                            className="text-gray-700"
                          >
                            <span className="text-gray-700">{item}</span>
                          </Checkbox>
                        </div>
                      ))}
                    </div>
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          );
        })}
      </div>
    </div>
  );
}
