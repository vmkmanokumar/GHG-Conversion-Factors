"use client";

import { useState } from "react";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "@heroui/button";
import HeaderPage from "../HeaderPage";
import ScopeOneFactors from "./ScopeOneFactors";
import { useRouter } from "next/navigation";
// import ScopeTwoSelection from "../Scopetwo/ScopeTwoSelection";


export default function ScopeOneSelection() {
  const [pageChange, setPageChange] = useState(0);
  const [checkedValues, setCheckedValue] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});
  const [changeShope,setChangeShope] = useState(1)

  const Router = useRouter();

  console.log("Selected Values:", selectedValues);
  console.log("Checked Values:", checkedValues);
  console.log("Page Change:", pageChange);

  const onChange = (newCheckedValues) => {
    setCheckedValue(newCheckedValues);
  };

  return (
    <>
      <HeaderPage />

      
      {changeShope === 1 && (<ScopeOneFactors
        checkedValues={checkedValues}
        selectedValues={selectedValues}
        setSelectedValues={setSelectedValues}
        pageChange={pageChange}
        onChange={onChange} // ✅ Pass the onChange function
      />)}

      {/* {changeShope === 2 && (<ScopeTwoSelection></ScopeTwoSelection>)} */}
      
      {/* <ScopeTwoSelection></ScopeTwoSelection>  */}

      

      <div className="flex justify-center gap-4 mt-6">
        {pageChange > 0 && (
          <Button
            onPress={() => setPageChange(pageChange - 1)}
            className="bg-transparent text-green-500 border border-green-500 px-6 py-3 rounded-lg text-lg font-semibold flex items-center
            hover:border-green-500 focus:border-green-500 focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={pageChange <= 0}
          >
            <ArrowLeftOutlined className="text-green-500" />
          </Button>
        )}

        {pageChange < 3 && ( <Button
          onPress={() => setPageChange(pageChange + 1)}
          className="bg-[#27a376] text-white border border-green-500 px-6 py-3 rounded-lg text-lg font-semibold flex items-center
          hover:border-green-500 focus:border-green-500 focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={pageChange >= 6}
        >
          <ArrowRightOutlined />
        </Button>)}

        {pageChange === 3 && (<Button onPress={()=>Router.replace('/Scopetwo')}  className="bg-[#27a376] gap-4 text-white border border-green-500 px-6 py-3 rounded-lg text-lg font-semibold flex items-center
          hover:border-green-500 focus:border-green-500 focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed"> Move to Scope 2 <ArrowRightOutlined></ArrowRightOutlined></Button>)}
       
      </div>
    </>
  );
}
