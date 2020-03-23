import { Form, Icon, Input, Typography } from "antd";
import Link from "next/link";
import React from "react";
import rules from "../services/validations/rules";

const { Title } = Typography;

const ForgotPassword = ({ form: { getFieldDecorator, validateFields } }) => {
  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      console.log(err, values);
    });
  };

  return (
    <div className="container p-forgot__container d-flex row flex-sm-column flex-lg-row">
      <div className="col-lg-6 p-forgot__left-col"></div>
      <div
        className="col-lg-6 m-auto"
        style={{
          border: "2px solid #ddd",
          borderRadius: "5px",
          padding: "20px"
        }}
      >
        <Title level={2}>Forgot Password?</Title>
        <div className="mb-2">
          Enter your email to get a password reset link
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Item>
            {getFieldDecorator("email", {
              rules: [rules.required(), rules.email()]
            })(
              <Input
                prefix={
                  <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Email"
              />
            )}
          </Form.Item>
          <div className="text-right mb-2">
            <Link href="/login">
              <a>Remember Your Password?</a>
            </Link>
          </div>
          <Form.Item>
            <div className="text-center d-block">
              <button className="btn btn-success btn-block" type="submit">
                Reset Password
              </button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Form.create({
  name: "forgot-password"
})(ForgotPassword);
