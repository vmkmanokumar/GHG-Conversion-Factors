"use client";

import { useState } from "react";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "@heroui/button";
import HeaderPage from "../HeaderPage";
import HeaderForScopes from "@/Componants/HeaderForScopes";
import ScopeOneFactors from "./Activities/ScopeOneFactors";
import { useRouter } from "next/navigation";
import ScopeTwoSelection from "../Scopetwo/ScopeTwoSelection";
import FooterForScopes from "@/Componants/FooterForScopes";


export default function ScopeOneSelection() {
  const [pageChange, setPageChange] = useState(0);

  //data for scope One
  const [checkedValues, setCheckedValue] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});

  //data for scope Two


  
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
      {/* <HeaderPage /> */}
      <HeaderForScopes changeShope={changeShope}></HeaderForScopes>

      
      {changeShope === 1 && (<ScopeOneFactors
        checkedValues={checkedValues}
        selectedValues={selectedValues}
        setSelectedValues={setSelectedValues}
        pageChange={pageChange}
        onChange={onChange} // ✅ Pass the onChange function
      />)}

      {changeShope === 2 && (<ScopeTwoSelection
      
      
      
      ></ScopeTwoSelection>)}
      

      <FooterForScopes pageChange={pageChange} setPageChange={setPageChange} changeShope={changeShope} setChangeShope={setChangeShope}></FooterForScopes>

      

   
    </>
  );
}
