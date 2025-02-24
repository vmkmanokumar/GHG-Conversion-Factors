"use client";

import { useState } from "react";
import HeaderForScopes from "@/Componants/HeaderForScopes";
// import ScopeOneFactors from "./Activities/ScopeOneFactors";
import { Row, Col } from "antd"; // ✅ Correct
import ScopeTwoSelection from "../Scopetwo/ScopeTwoSelectionPage";
import FooterForScopes from "@/Componants/FooterForScopes";
import ScopeThreeSelection from "../Scopethree/ScopeThreeSelection";
import ScopeOneSelection from "./ScopeOneSelectionPage";


export default function ScopeOneSelectionpage() {
  const [pageChange, setPageChange] = useState(0);


  const [changeShope, setChangeShope] = useState(0)


  return (
    <>
      <Row justify="center" align="middle" style={{ minHeight: "100vh", textAlign: "center" }}>
  <Col span={24}>
    <HeaderForScopes changeShope={changeShope} />
  </Col>

  <Col span={24}>
    {changeShope === 0 && <ScopeOneSelection pageChange={pageChange} />}
    {changeShope === 1 && <ScopeTwoSelection pageChange={pageChange} />}
    {changeShope === 2 && <ScopeThreeSelection pageChange={pageChange} />}
  </Col>

  <Col span={24}>
    <FooterForScopes pageChange={pageChange} setPageChange={setPageChange} changeShope={changeShope} setChangeShope={setChangeShope} />
  </Col>
</Row>
    </>
  );
}
