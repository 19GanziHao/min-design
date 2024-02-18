import React, { useRef } from "react";
import { Meta } from "@storybook/react";
import { Form, FormRef } from "./form";
import { FormItem } from "./formItem";
import { Input } from "../Input/input";
import { Button } from "../Button/button";
import { CustomRule } from "./useStore";
const meta: Meta<typeof Form> = {
  title: "custom/Form",
  id: "Form",
  component: Form,
  // parameters: {
  //   layout: "centered",
  // },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "550px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

const confirmRules: CustomRule[] = [
  { required: true, min: 3, max: 6 },
  ({ getFieldValue }) => ({
    asyncValidator(rule, value) {
      console.log("the value", getFieldValue("password"));
      console.log(value);
      if (value !== getFieldValue("password")) {
        return Promise.reject("两次输入不一致");
      }
      return Promise.resolve();
    },
  }),
];

export const BasicForm = (args) => {
  const ref = useRef<FormRef>(null);
  const handleClick = () => {
    ref.current?.resetFields()
  }
  return (
    <Form
      initialValues={{ username: "甘梓豪", agree: true }}
      {...args}
      ref={ref}
    >
      <FormItem label="用户名" name="username" rules={[{ required: true }]}>
        <Input />
      </FormItem>
      <FormItem
        label="密码"
        name="password"
        rules={[{ required: true, min: 3, max: 6 }]}
      >
        <Input type="password" />
      </FormItem>
      <FormItem label="确认密码" name="confirmPsw" rules={confirmRules}>
        <Input type="password" />
      </FormItem>
      {/* <FormItem>
        <Input placeholder="no-label" />
      </FormItem> */}

      <div style={{ display: "flex", gap: "10px" }}>
        <FormItem
          name="agree"
          valuePropName="checked"
          getValueFromEvent={(e) => e.target.checked}
        >
          <Input type="checkbox" />
        </FormItem>
        <span>同意协议</span>
      </div>

      <div className="min-form-submit-area">
        <Button type="submit" btnType="primary">
          登录
        </Button>
        <Button type="button" btnType="primary" onClick={handleClick}>
          重置
        </Button>
      </div>
    </Form>
  );
};
