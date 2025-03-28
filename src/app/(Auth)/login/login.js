"use client";

import { Col, Row, Input, Button, Checkbox, Form, Typography, message } from "antd";
import { useRouter } from "next/navigation";
import loginLogo from "@/assets/images/loginLogo.png";
import { useState } from "react";

const { Title, Text } = Typography;

export default function Login() {
  const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 10000);
  };
 const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  

  const onFinish = async (values) => {
    const email = values.email;
    const password = values.password;
  
    try {
      const response = await fetch("https://ghg-conversion-factors-backend.vercel.app/get_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json" // ✅ Fixed header
        },
        body: JSON.stringify({ email, password })
      });
  
      const data = await response.json();

      console.log("datafromdashboard",data)
  
      if (response.ok) {
        const token = data.token; // ✅ Fetch JWT token from response
        const email = data.user.email
        const username = data.user.username
        const roles = data.user.roles
        const SupervisiorName = data.user.ownername
        messageApi.success("Login successful!");
        console.log("username",username)
  
        if (token) {
          localStorage.setItem("token", token); // ✅ Store token
          localStorage.setItem("email",email)
          localStorage.setItem("username",username)
          localStorage.setItem("firstLogin", "true");
          localStorage.setItem("roles",roles)
          localStorage.setItem("SupervisiorName",SupervisiorName)
        
          router.push("/dashboard"); // ✅ Redirect user
        } else {
          alert("Login failed: No token received!");
        }
      } else {
        alert(data.error || "Login failed!");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong!");
    }
  };
  
  

  return (
    <>
    {contextHolder}
    <div className="h-screen w-screen bg-white flex items-center justify-center p-4">
      <Row className="w-full h-auto rounded-lg flex flex-col md:flex-row items-center md:items-start  lg:ml-28">
        {/* Left Section: Logo (Hidden on Mobile) */}
        <Col
          md={12}
          xs={0}
          className="hidden md:flex justify-center items-center"
        >
          <img
            src={loginLogo.src}
            alt="Login Logo"
            className="h-[400px] w-[300px] md:h-[641px] md:w-[602px]"
          />
        </Col>

        {/* Right Section: Form */}
        <Col
          xs={24}
          sm={24}
          md={9}
          className="p-6 sm:p-10 w-full  flex flex-col justify-center "
        >
          <Title level={2} className="text-gray-800 text-center md:text-left">
            Welcome back!
          </Title>
          <Text className="text-lg text-gray-500 text-center md:text-left">
            Sign in
          </Text>

          <Form
            layout="vertical"
            onFinish={onFinish}
            className="mt-6 flex flex-col gap-5 w-full max-w-[400px] mx-auto md:mx-0"
          >
            {/* Username Field */}
            <Form.Item
              label={<Text className="text-gray-500">Email</Text>}
              name="email"
              rules={[{ required: true, message: "Please enter your username!" }]}
            >
              <Input placeholder="Enter a username" />
            </Form.Item>

            {/* Password Field */}
            <Form.Item
              label={<Text className="text-gray-500">Password</Text>}
              name="password"
              rules={[{ required: true, message: "Please enter your password!" }]}
            >
              <Input.Password placeholder="Enter the password" />
            </Form.Item>

            {/* Remember Me and Forgot Password */}
            <Form.Item>
              <div className="flex justify-between items-center">
                <Checkbox>
                  <Text className="text-gray-500">Remember me</Text>
                </Checkbox>
                <Text className="text-green-500 cursor-pointer">Forgot password?</Text>
              </div>
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
  <Button
    type="primary"
    htmlType="submit"
    className="bg-[#27A376] text-white w-full hover:bg-[#27A376]"
    loading={loadings[0]}  // ✅ Loading state based on the first index
    onClick={() => enterLoading(0)} // ✅ Trigger loading animation
  >
    Login
  </Button>
</Form.Item>

          </Form>
        </Col>
      </Row>
    </div>
    </>
  );
 
}
