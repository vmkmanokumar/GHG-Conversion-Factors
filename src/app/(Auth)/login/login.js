"use client";

import { Col, Row, Input, Button, Checkbox, Form, Typography } from "antd";
import { useRouter } from "next/navigation";
import loginLogo from "@/assets/images/loginLogo.png";

const { Title, Text } = Typography;

export default function Login() {
  const router = useRouter();

  const onFinish = (values) => {
    console.log(values);
    router.push("/ScopeOne"); // Redirect after login
  };

  return (
    <div className="h-screen w-screen bg-white flex items-center justify-center p-4">
      <Row className="text-white w-full h-auto rounded-lg ml-28 sm:mr-9 flex flex-col md:flex-row items-center md:items-start">
        {/* Left Section: Logo (Hidden on Mobile) */}
        <Col md={12} className="hidden md:flex justify-center items-center">
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
          md={12}
          className="p-6 sm:p-10 w-full flex flex-col justify-center"
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
              label={<Text className="text-gray-500">Username</Text>}
              name="username"
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
                className="bg-green-500 text-white w-full"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
