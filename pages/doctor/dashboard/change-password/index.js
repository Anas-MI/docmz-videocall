import { Form, Input, Typography } from "antd";
import React from "react";
import withDashboardLayout from "../../../../components/layouts/dashboard-layout/withDashboardLayout";
import rules from "../../../../services/validations/rules";

const { Title } = Typography;

const ChangePassword = ({
  form: { getFieldDecorator, validateFields, getFieldValue }
}) => {
  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      console.log(err, values);
    });
  };

  return (
    <div className="container pt-5">
      <Title level={2}>Change Password</Title>
      <Form
        onSubmit={handleSubmit}
        hideRequiredMark
        style={{
          backgroundColor: "#fff",
          padding: "20px"
        }}
      >
        <Form.Item
          label="Old Password"
          colon={false}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 8 }}
        >
          {getFieldDecorator("oldPassword", {
            rules: [rules.required("Please enter your Old Password!")]
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item
          label="New Password"
          colon={false}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 8 }}
        >
          {getFieldDecorator("newPassword", {
            rules: [rules.required("Please enter your New Password!")]
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          colon={false}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 8 }}
        >
          {getFieldDecorator("confirmPassword", {
            rules: [
              rules.required("Please enter your Password again!"),
              {
                validator: (rule, value) => {
                  if (value !== getFieldValue("newPassword"))
                    return Promise.reject("Passwords don't match");
                  return Promise.resolve();
                }
              }
            ]
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 4 }}>
          <div className="text-center d-block">
            <button className="btn btn-success btn-block" type="submit">
              Save Changes
            </button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

const changePasswordForm = Form.create({
  name: "change-password"
})(ChangePassword);

export default withDashboardLayout(changePasswordForm);
