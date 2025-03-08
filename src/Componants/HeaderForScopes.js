"use client";

import { useState } from "react";
import { Row, Col, Flex, Popover, Steps, ConfigProvider } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

export default function HeaderForScopes({ changeShope }) {
  const router = useRouter();
  const [activeScope, setActiveScope] = useState(0); // Track active scope

  console.log(activeScope);

  // Custom popover dot for steps
  const customDot = (dot, { status, index }) => (
    <Popover content={<span>Scope {index + 1} - {status}</span>}>
      <div
        style={{
          width: "18px", // Increased size
          height: "18px", // Increased size
          borderRadius: "50%", // Circular shape
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          top: "-5px", // Moves dot slightly up
        }}
      >
        {dot}
      </div>
    </Popover>
  );

  const handleScopeClick = (index) => {
    setActiveScope(index);
  };

  return (
    <>
      {/* Header Section */}
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
                  onClick={() => router.push('/dashboard')}
                  style={{
                    fontSize: "28px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                />
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
                  Choose Scope Factors and Activities
                </h1>
              </Flex>
            </Col>
          </Row>
        </div>
      </div>

      {/* Scope Selection */}
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
          {["Scope 1", "Scope 2", "Scope 3"].map((scope, index) => (
            <Col key={index} xs={8} sm={8} md={8} lg={8} xl={8}>
              <div style={{ textAlign: "center" }}>
                <h1
                  className="text-lg sm:text-xl"
                  style={{ color: activeScope === index ? "#008D87" : "black" }}
                  onClick={() => handleScopeClick(index)}
                >
                  {scope}
                </h1>
              </div>
            </Col>
          ))}
        </Row>
      </Flex>

      {/* Steps Indicator with Popover */}
      <div className="w-full md:w-[1000px] lg:w-[1000px] ml-auto mr-auto mt-10 sm:block hidden">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#27A376", // Green color
            },
          }}
        >
          <Steps
            current={changeShope}
            items={[{}, {}, {}]}
            className="w-full md:w-[1000px] lg:w-[1000px] ml-auto mr-auto mt-10"
            progressDot={customDot} // Popover dots
          />
        </ConfigProvider>
      </div>
    </>
  );
}


