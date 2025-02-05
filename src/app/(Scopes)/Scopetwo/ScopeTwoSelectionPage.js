import { useState } from "react";
import ScopeTwoFactors from "./Activities/ScopeTwoFactors";

export default function ScopeTwoSelection({ pageChange, onChange }) {
  const [checkedValuesScopeTwo, setCheckedValuesScopeTwo] = useState([]);
  const [selectedValuesScopeTwo, setSelectedValuesScopeTwo] = useState({});
  

  console.log("shopFactors",checkedValuesScopeTwo)

  console.log("selectShop",selectedValuesScopeTwo)

  return (
    <>
      <ScopeTwoFactors
        checkedValuesScopeTwo={checkedValuesScopeTwo}
        setCheckedValuesScopeTwo={setCheckedValuesScopeTwo}
        selectedValuesScopeTwo={selectedValuesScopeTwo}
        setSelectedValuesScopeTwo={setSelectedValuesScopeTwo}
        pageChange={pageChange}
        onChange={onChange}
      />
    </>
  );
}
