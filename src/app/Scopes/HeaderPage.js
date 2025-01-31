"use client";
import { Row, Col, Flex } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useState } from "react";
import ScopeOneSelection from "./ScopeOne/ScopeOneSelection";
import ScopeTwoSelection from "./Scopetwo/ScopeTwoSelection";
import ScopeThreeSelection from "./Scopethree/ScopeTwoSelection";

export default function HeaderPage() {
  const [activeScope, setActiveScope] = useState(1); // State to track the active scope

  console.log(activeScope)

  const handleScopeClick = (index) => {
    setActiveScope(index); // Set the clicked index
  };

  return (
    <>
      <div
        className="flex justify-center mt-10 sm:mt-20"
        style={{ width: "100%" }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1200px",
            padding: "0 20px",
            textAlign: "center",
          }}
        >
          <Row justify="center">
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Flex align="center" gap={20} justify="center">
                <ArrowLeftOutlined
                  style={{
                    fontSize: "28px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                />
                <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">
                  Choose Scope Factors and Activities
                </h1>
              </Flex>
            </Col>
          </Row>
        </div>
      </div>

      {/* Scope Section */}
      <Flex
        justify="center"
        className="sm:mt-24 text-base sm:text-lg md:text-xl mt-10 cursor-pointer"
        gap={16}
      >
        <Row
          gutter={[16, 16]}
          justify="center"
          style={{ width: "100%", maxWidth: "1200px" }}
        >
          <Col xs={8} sm={8} md={8} lg={8} xl={8}>
            <div style={{ textAlign: "center" }}>
              <h1
                className="text-lg sm:text-xl"
                style={{ color: activeScope === 1 ? "#008D87" : "black" }} // Green if Scope 1 is active
                onClick={() => handleScopeClick(1)}
              >
                Scope 1
              </h1>
            </div>
          </Col>
          <Col xs={8} sm={8} md={8} lg={8} xl={8}>
            <div style={{ textAlign: "center" }}>
              <h1
                className="text-lg sm:text-xl"
                style={{ color: activeScope === 2 ? "#008D87" : "black" }} // Green if Scope 2 is active
                onClick={() => handleScopeClick(2)}
              >
                Scope 2
              </h1>
            </div>
          </Col>
          <Col xs={8} sm={8} md={8} lg={8} xl={8}>
            <div style={{ textAlign: "center" }}>
              <h1
                className="text-lg sm:text-xl"
                style={{ color: activeScope === 3 ? "#008D87" : "black" }} // Green if Scope 3 is active
                onClick={() => handleScopeClick(3)}
              >
                Scope 3
              </h1>
            </div>
          </Col>
        </Row>
      </Flex>
        
      {activeScope === 1 && <ScopeOneSelection></ScopeOneSelection>}
      {activeScope === 2 && <ScopeTwoSelection></ScopeTwoSelection>}
      {activeScope === 3 && <ScopeThreeSelection></ScopeThreeSelection>}
    </>
  );
}
