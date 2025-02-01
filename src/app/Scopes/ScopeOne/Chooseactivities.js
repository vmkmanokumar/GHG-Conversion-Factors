import React, { useState } from "react";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Checkbox } from "antd";
import { DummydataForActives } from "./dummyData/Dummydata";

export default function ChooseActivities({ checkedValues, setSelectedValues ,selectedValues}) {

  // const [selectedValues, setSelectedValues] = useState({});  

  
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

  const filteredCategories = Object.keys(DummydataForActives).filter((key) =>
    checkedValues.includes(key)
  );

  return (
    <div className="flex flex-col justify-center items-center bg-[#effbf7] w-full md:w-[768px] lg:w-[1152px] md:mx-auto h-auto md:h-[450px] lg:h-[512px] mt-10 md:mt-16 lg:mt-10 p-4 md:p-6 rounded-xl shadow-lg">
      {/* Title with Reduced Margin */}
      <div className="w-full mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Activities</h1>
      </div>

      {/* Accordion Wrapper */}
      <div className="w-full min-h-[250px] flex-grow text-[22px] ">
        <Accordion variant="shadow">
          {filteredCategories.map((key) => (
            <AccordionItem
              variant="splitted"
              key={key}
              textValue={key}
              title={
                <span className="text-lg font-medium p-2 text-gray-700">{key}</span>
              }
              className="bg-[#BFF1DF] w-full mt-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Accordion Content */}
              <div className="p-4 w-full bg-[#effbf7] mt-3 rounded-b-lg overflow-hidden">
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
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
