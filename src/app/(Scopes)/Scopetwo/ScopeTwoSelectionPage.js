"use client";
import { useState } from "react";
import ScopeTwoFactors from "./Activities/ScopeTwoFactors";

export default function ScopeTwoSelection({ pageChange, onChange }) {
  const [checkedValuesScopeTwo, setCheckedValuesScopeTwo] = useState([]);
   const [selectedValuesScopeTwo, setSelectedValuesScopeTwo] = useState({}); // ✅ Manage state here

  return (
    <ScopeTwoFactors
      checkedValuesScopeTwo={checkedValuesScopeTwo} // ✅ Pass the state
      setCheckedValuesScopeTwo={setCheckedValuesScopeTwo} // ✅ Pass the setter function
      pageChange={pageChange}
      onChange={onChange}
      selectedValuesScopeTwo={selectedValuesScopeTwo}
      setSelectedValuesScopeTwo={setSelectedValuesScopeTwo}
    />
  );
}