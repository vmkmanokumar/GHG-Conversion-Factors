"use client";
import React, { useState, useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { Radio, Checkbox, Button } from "antd";
import { useScopeTwo } from "../Context/ScopeTwoContext";
import { useRouter } from "next/navigation";

export default function ParametersForScopeTwo() {
  const router = useRouter();
  const { selectedValuesScopeTwo } = useScopeTwo();
  const [parameters, setParameters] = useState(null);
  const [selectedFuels, setSelectedFuels] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch parameters from the backend
  useEffect(() => {
    const fetchParameters = async () => {
      try {
        const response = await fetch(
          "https://ghg-conversion-factors-backend.vercel.app/scope_factors",
          { method: "GET", headers: { "Content-Type": "application/json" } }
        );

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        console.log("Fetched Parameters:", data);

        // Transform the data to match our needs
        // Based on DB: CO2 Emission with unit kWh
        const transformedData = {
          "Electricity generated": {
            parameters: ["CO2 Emission"],
            units: {
              "CO2 Emission": ["kWh"]
            }
          }
        };

        setParameters(transformedData);
      } catch (error) {
        console.error("Error fetching parameters:", error);
        setParameters(null);
      } finally {
        setLoading(false);
      }
    };

    fetchParameters();
  }, []);

  // Ensure selectedValuesScopeTwo is always an object
  const selectedValues = selectedValuesScopeTwo || {};

  // Handle checkbox toggle
  const handleCheckboxChange = (parameter) => {
    setSelectedFuels((prev) => ({
      ...prev,
      [parameter]: !prev[parameter],
    }));
  };

  // Handle form submission and navigate to dashboard
  const handleSubmit = () => {
    // Here you would typically save the data to your backend
    console.log("Saving selected parameters:", {
      selectedValues,
      selectedFuels
    });
    
    // Navigate to dashboard
    router.push("/dashboard");
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center bg-[#effbf7] w-full md:w-[768px] lg:w-[1152px] md:mx-auto mt-10 md:mt-16 lg:mt-10 p-4 md:p-6 rounded-xl shadow-lg flex-grow min-h-[515px]">
        <div className="animate-pulse flex flex-col w-full items-center">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="h-32 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-32 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center bg-[#effbf7] w-full md:w-[768px] lg:w-[1152px] md:mx-auto mt-10 md:mt-16 lg:mt-10 p-4 md:p-6 rounded-xl shadow-lg flex-grow min-h-[515px]">
      <div className="w-full mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Parameters</h1>
      </div>

      {/* Main content with relative positioning to allow absolute positioning of the button */}
      <div className="w-full min-h-[250px] flex-grow text-[22px] relative pb-16">
        {Object.keys(selectedValues).length > 0 ? (
          Object.keys(selectedValues).map((category) => (
            <Disclosure key={category} defaultOpen={true}>
              {({ open }) => (
                <div className="bg-[#BFF1DF] w-full mt-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <Disclosure.Button className="flex justify-between items-center w-full px-4 py-3 text-lg font-medium text-gray-700 focus:outline-none hover:bg-[#a7e4cc] transition-colors duration-200">
                    <span>{category}</span>
                    <ChevronDown 
                      className={`w-5 h-5 transition-transform duration-300 ease-in-out ${open ? "rotate-180" : "rotate-0"}`} 
                    />
                  </Disclosure.Button>

                  <Disclosure.Panel 
                    className="p-4 w-full bg-[#effbf7] rounded-b-lg overflow-hidden"
                    style={{
                      maxHeight: open ? '1000px' : '0',
                      transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out',
                      opacity: open ? 1 : 0
                    }}
                  >
                    {selectedValues[category]?.map((item, idx) => (
                      <Disclosure key={idx} defaultOpen={true}>
                        {({ open }) => (
                          <div className="w-full mt-2">
                            <Disclosure.Button className="flex justify-between items-center w-full px-3 py-2 text-gray-600 bg-[#BFF1DF] rounded-md focus:outline-none transition-all duration-200 hover:bg-[#a7e4cc]">
                              <span className="text-base">{item}</span>
                              <ChevronDown 
                                className={`w-4 h-4 transition-transform duration-300 ease-in-out ${open ? "rotate-180" : "rotate-0"}`} 
                              />
                            </Disclosure.Button>

                            <Disclosure.Panel 
                              className="p-2 bg-[#effbf7] rounded-md mt-1 text-gray-500"
                              style={{
                                maxHeight: open ? '1000px' : '0',
                                transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out',
                                opacity: open ? 1 : 0,
                                overflow: 'hidden'
                              }}
                            >
                              {parameters && parameters[item]?.parameters ? (
                                <div className="flex flex-wrap flex-col gap-4 mt-2">
                                  {parameters[item].parameters.map((parameter) => (
                                    <div 
                                      key={parameter} 
                                      className="flex flex-col p-2 border rounded-lg transition-all duration-200 hover:border-[#1890ff]"
                                    >
                                      <Checkbox
                                        checked={selectedFuels[parameter] || false}
                                        onChange={() => handleCheckboxChange(parameter)}
                                        className="font-semibold text-gray-700"
                                      >
                                        {parameter}
                                      </Checkbox>

                                      {selectedFuels[parameter] && parameters[item].units[parameter] && (
                                        <div 
                                          className="ml-10 mt-2 p-2 bg-white rounded-md shadow-sm"
                                          style={{
                                            animation: 'fadeIn 0.3s ease-out forwards'
                                          }}
                                        >
                                          <Radio.Group className="space-y-1">
                                            {parameters[item].units[parameter].map((unit) => (
                                              <Radio key={unit} value={unit} className="block">
                                                {unit}
                                              </Radio>
                                            ))}
                                          </Radio.Group>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-red-500">No data available for {item}</p>
                              )}
                            </Disclosure.Panel>
                          </div>
                        )}
                      </Disclosure>
                    ))}
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          ))
        ) : (
          <div className="bg-white p-4 rounded-lg text-center shadow-inner">
            <p className="text-red-500">No selected values available</p>
          </div>
        )}
        
        {/* Save Template button positioned at the end of container */}
        <div className="w-full flex justify-center absolute bottom-0 left-0 right-0">
          <Button 
            onClick={handleSubmit} 
            className="bg-[#91e6c7] text-black font-semibold text-lg py-2 px-6 rounded-lg shadow-md hover:bg-green-600 hover:text-white transition-all duration-300"
          >
            Save Template
          </Button>
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}