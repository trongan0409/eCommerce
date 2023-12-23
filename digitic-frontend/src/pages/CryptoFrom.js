import { Form, Input, Select } from "antd";
import React from "react";
const Option = [
 { value: "vn", label: "Viet Nam" },
 { value: "us", label: "US" },
];
const CryptoFrom = ({ form, onPlaceOrder }) => {
 const onFinish = (values) => {
  onPlaceOrder("crypto", values);
 };
 return (
  <Form form={form} onFinish={onFinish}>
   <Form.Item label='Deposit currency' name='depositCurrency'>
    <Select defaultValue='vn' style={{ width: "100%" }} options={Option} />
   </Form.Item>
   <Form.Item label='Deposit amount' name='depositAmount'>
    <Input />
   </Form.Item>
  </Form>
 );
};

export default CryptoFrom;
