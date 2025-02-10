"use client";

import { useState } from "react";
import HeaderForScopes from "@/Componants/HeaderForScopes";
// import ScopeOneFactors from "./Activities/ScopeOneFactors";
import ScopeTwoSelection from "../Scopetwo/ScopeTwoSelectionPage";
import FooterForScopes from "@/Componants/FooterForScopes";
import ScopeThreeSelection from "../Scopethree/ScopeThreeSelection";
import ScopeOneSelection from "./ScopeOneSelectionPage";


export default function ScopeOneSelectionpage() {
  const [pageChange, setPageChange] = useState(0);

  //data for scope One

  //data for scope Two

  const [changeShope,setChangeShope] = useState(0)

 

  const onChange = (newCheckedValues) => {
    setCheckedValue(newCheckedValues);
  };

  return (
    <>
      {/* <HeaderPage /> */}
      <HeaderForScopes changeShope={changeShope}></HeaderForScopes>

      
      {/* {changeShope === 0 && (<ScopeOneFactors
        checkedValues={checkedValues}
        selectedValues={selectedValues}
        setSelectedValues={setSelectedValues}
        pageChange={pageChange}
        onChange={onChange} 
      />)} */}

      {changeShope ===0 && (<ScopeOneSelection pageChange={pageChange}></ScopeOneSelection>)}

      {changeShope === 1 && (<ScopeTwoSelection pageChange={pageChange}></ScopeTwoSelection>)}

      {changeShope === 2 && (<ScopeThreeSelection pageChange={pageChange}></ScopeThreeSelection>)}
      

      <FooterForScopes pageChange={pageChange} setPageChange={setPageChange} changeShope={changeShope} setChangeShope={setChangeShope}></FooterForScopes>

      

   
    </>
  );
}
