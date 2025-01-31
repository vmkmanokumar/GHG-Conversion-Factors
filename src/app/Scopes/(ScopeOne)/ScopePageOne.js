"use client";
import { Row, Col, Flex } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

export default function ScopePageOne() {
  return (
    <>
      {/* Header Section */}
      <div
        className="flex justify-center mt-20"
        // style={{ height: "100vh" }} // Full viewport height
      >
        <div style={{ width: "100%", maxWidth: "1200px", padding: "0 20px", textAlign: "center" }}>
          <Row justify="center">
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Flex align="center" gap={10} justify="center">
                <ArrowLeftOutlined
                  style={{ fontSize: "24px", fontWeight: "bold" }}
                  className="cursor-pointer"
                />
                <h1 className="text-2xl sm:text-3xl font-semibold">
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
        className="sm:mt-[100px] md:mt-[150px] text-[18px] sm:text-[24px]"
        gap={20}
        style={{ padding: "0 20px" }}
      >
        <Row gutter={[16, 16]} justify="center" style={{ width: "100%", maxWidth: "1200px" }}>
          <Col xs={24} sm={8} md={8} lg={8} xl={8}>
            <div style={{ textAlign: "center" }}>
              <h1>Scope 1</h1>
            </div>
          </Col>
          <Col xs={24} sm={8} md={8} lg={8} xl={8}>
            <div style={{ textAlign: "center" }}>
              <h1>Scope 2</h1>
            </div>
          </Col>
          <Col xs={24} sm={8} md={8} lg={8} xl={8}>
            <div style={{ textAlign: "center" }}>
              <h1>Scope 3</h1>
            </div>
          </Col>
        </Row>
      </Flex>
    </>
  );
}