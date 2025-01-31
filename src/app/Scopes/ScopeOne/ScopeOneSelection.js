import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons"

import { Checkbox, message } from "antd";
import "./ScopeOneSelection.css";
import { Button } from "@heroui/button";
import { useState } from "react";
import Chooseactivities from "./Chooseactivities";
import { dummyData } from "./dummyData/Dummydata";


export default function ScopeOneSelection() {


  const [pageChange, setPageChange] = useState(1);
  const [checkedValues, setCheckedValue] = useState([])



  const onChange = (checkedValues) => {
    setCheckedValue(checkedValues)

  };


  console.log("value:", checkedValues);


  console.log(pageChange)

  return (
    <>

      {pageChange === 1 && (<div className="flex justify-center items-center bg-[#effbf7] w-full md:w-[768px] lg:w-[1152px] md:mx-auto h-auto md:h-[450px] lg:h-[512px] mt-10 md:mt-16 lg:mt-24 p-4 md:p-6 rounded-xl">
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

      {pageChange === 2 && (<Chooseactivities checkedValues={checkedValues}></Chooseactivities>)}


      <div className="flex justify-center gap-4 mt-6">
        {/* Transparent Button with Green Border & Arrow */}
        <Button onPress={() => setPageChange(pageChange - 1)}
          className="bg-transparent text-green-500 border border-green-500 px-6 py-3 rounded-lg text-lg font-semibold flex items-center
          hover:border-green-500 focus:border-green-500 focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={pageChange <= 1}

        >
          <ArrowLeftOutlined className="text-green-500" />
        </Button>

        {/* White Background Button with Green Border & Arrow */}
        <Button onPress={() => setPageChange(pageChange + 1)}
          className="bg-[#27a376] text-green-500 border border-green-500 px-6 py-3 rounded-lg text-lg font-semibold flex items-center
          hover:border-green-500 focus:border-green-500 focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={pageChange >= 6}
        >
          <ArrowRightOutlined className="text-white bg-[]" />
        </Button>
      </div>
    </>
  );
}
