"use client";

import { useState } from "react";
import HeaderForScopes from "@/Componants/HeaderForScopes";
import ScopeOneFactors from "./Activities/ScopeOneFactors";
import ScopeTwoSelection from "../Scopetwo/ScopeTwoSelectionPage";
import FooterForScopes from "@/Componants/FooterForScopes";


export default function ScopeOneSelection() {
  const [pageChange, setPageChange] = useState(0);

  //data for scope One
  const [checkedValues, setCheckedValue] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});

  //data for scope Two

  const [changeShope,setChangeShope] = useState(0)

 

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

      
      {changeShope === 0 && (<ScopeOneFactors
        checkedValues={checkedValues}
        selectedValues={selectedValues}
        setSelectedValues={setSelectedValues}
        pageChange={pageChange}
        onChange={onChange} // ✅ Pass the onChange function
      />)}

      {changeShope === 1 && (<ScopeTwoSelection pageChange={pageChange}


                              ></ScopeTwoSelection>)}
      

      <FooterForScopes pageChange={pageChange} setPageChange={setPageChange} changeShope={changeShope} setChangeShope={setChangeShope}></FooterForScopes>

      

   
    </>
  );
}
