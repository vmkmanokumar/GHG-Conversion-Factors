"use client";
import ScopeTwoFactors from "./Activities/ScopeTwoFactors";
import { useScopeTwo } from "./Context/ScopeTwoContext";

export default function ScopeTwoSelection({ pageChange, onChange }) {
  return (
    <ScopeTwoFactors
      pageChange={pageChange}
      onChange={onChange}
    />
  );
}