import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { Checkbox } from "antd";
import { DummydataForParameters } from "./dummyData/Dummydata";

export default function Parameters({ selectedValues }) {
  console.log("From Parameters Page:", selectedValues);



  return (
    <div className="flex flex-col flex-grow justify-center items-center bg-[#effbf7] w-full md:w-[768px] lg:w-[1152px] md:mx-auto h-auto md:h-[450px] lg:h-[512px] mt-10 md:mt-16 lg:mt-10 p-4 md:p-6 rounded-xl shadow-lg">
      {/* Title Section */}
      <div className="w-full mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Parameters</h1>
      </div>

      {/* Disclosure Section */}
      <div className="w-full min-h-[250px] flex-grow text-[22px]">
        {Object.keys(selectedValues).map((category) => (
          <Disclosure key={category}>
            {({ open }) => (
              <div className="bg-[#BFF1DF] w-full mt-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                {/* Main Disclosure Button */}
                <Disclosure.Button className="flex justify-between items-center w-full px-4 py-3 text-lg font-medium text-gray-700 focus:outline-none">
                  <span>{category}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      open ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </Disclosure.Button>

                {/* Panel for Inner Items */}
                <Disclosure.Panel className="p-4 w-full bg-[#effbf7] rounded-b-lg overflow-hidden">
                  {selectedValues[category].map((item, idx) => (
                    <Disclosure key={idx}>
                      {({ open }) => (
                        <div className="w-full mt-2">
                          {/* Inner Disclosure Button */}
                          <Disclosure.Button className="flex  justify-between items-center w-full px-3 py-2 text-gray-600 bg-[#BFF1DF] rounded-md focus:outline-none transition-all duration-300">
                            <span className="text-base">{item}</span>
                            <ChevronDown
                              className={`w-4 h-4 transition-transform ${
                                open ? "rotate-180" : "rotate-0"
                              }`}
                            />
                          </Disclosure.Button>

                          {/* Inner Panel with checkboxes */}
                          <Disclosure.Panel className="p-2 bg-[#effbf7] rounded-md mt-1 text-gray-500">
                            {/* Dynamically Render Checkboxes if item matches */}
                            {Object.keys(DummydataForParameters).map((key) => {
                              if (key === item) {
                                return (
                                  <div key={key} className="flex flex-wrap mt-2 gap-4">
                                    {DummydataForParameters[key].map((fuelItem) => (
                                      <div key={fuelItem} className="flex items-center">
                                        <Checkbox className="text-gray-700">
                                          <span className="text-gray-700">{fuelItem}</span>
                                        </Checkbox>
                                      </div>
                                    ))}
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
