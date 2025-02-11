"use client";

import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import { Button } from "@heroui/button";
import Chooseactivities from "./Chooseactivities";
import { useScopeOne } from "../Context/ScopeOneContext";
import Parameters from "./Parameters";
import { dummyData } from "../dummyData/Dummydata";
import ParametersAndUnits from "./ParametersAndUnits";

export default function ScopeOneFactors({ pageChange }) {

    const { checkedValuesScopeOne, setCheckedValuesScopeOne } = useScopeOne();

    console.log("Form ScopeOneFactors",checkedValuesScopeOne)

  return (
    <>
      {pageChange === 0 && (
    <div className="flex flex-col justify-center items-center bg-[#effbf7] w-full md:w-[768px] lg:w-[1152px] md:mx-auto mt-10 md:mt-16 lg:mt-10 p-4 md:p-6 rounded-xl shadow-lg flex-grow min-h-[515px]">
          <div className="w-full md:w-[500px] max-w-2xl rounded-lg p-4 md:p-6 lg:mr-96">
            <h1 className="text-[20px] md:text-[22px] lg:text-[23px] font-black">Scope Factors</h1>

            <Checkbox.Group onChange={(e)=>setCheckedValuesScopeOne(e)} value={checkedValuesScopeOne}>
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
        <Chooseactivities />
      )}
      {pageChange === 2 && <Parameters/>}

      {pageChange === 3 && (<ParametersAndUnits></ParametersAndUnits>)}

    </>
  );
}
