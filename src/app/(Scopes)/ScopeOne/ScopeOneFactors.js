"use client";

import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import { Button } from "@heroui/button";
import Chooseactivities from "./Chooseactivities";
import Parameters from "./Parameters";
import { dummyData } from "./dummyData/Dummydata";
import ParametersAndUnits from "./ParametersAndUnits";

export default function ScopeOneFactors({ checkedValues, selectedValues, setSelectedValues, pageChange, onChange }) {
  return (
    <>
      {pageChange === 0 && (
        <div className="flex justify-center items-center bg-[#effbf7] w-full md:w-[768px] lg:w-[1152px] md:mx-auto h-auto md:h-[450px] lg:h-[512px] mt-10 md:mt-16 lg:mt-10 p-4 md:p-6 rounded-xl">
          <div className="w-full md:w-[500px] max-w-2xl rounded-lg p-4 md:p-6 lg:mr-96">
            <h1 className="text-[20px] md:text-[22px] lg:text-[23px] font-black">Scope Factors</h1>

            <Checkbox.Group onChange={onChange} value={checkedValues}>
              <div className="flex flex-col gap-4 md:gap-5 lg:gap-6 mt-4 md:mt-6 lg:mt-8">
                {dummyData.map((item) => (
                  <Checkbox key={item.value} value={item.value} className="text-[22px]">
                    {item.label}
                  </Checkbox>
                ))}
              </div>
            </Checkbox.Group>
          </div>
        </div>
      )}

      {pageChange === 1 && (
        <Chooseactivities checkedValues={checkedValues} selectedValues={selectedValues} setSelectedValues={setSelectedValues} />
      )}
      {pageChange === 2 && <Parameters selectedValues={selectedValues} />}

      {pageChange === 3 && (<ParametersAndUnits></ParametersAndUnits>)}

    </>
  );
}
