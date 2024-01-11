import { Form, Input, Select } from "antd";
import React from "react";

const CryptoFrom = ({ form, onPlaceOrder }) => {
    const onFinish = (values) => {
        onPlaceOrder("crypto", values);
    };
    return (
        <Form form={form} onFinish={onFinish}>
            <Form.Item rules={[{ required: true }]} label='Account address' name='accountAddress'>
                <Input />
            </Form.Item>
            <Form.Item rules={[{ required: true }]} label='Secret key' name='accountKey'>
                <Input />
            </Form.Item>
        </Form>
    );
};

export default CryptoFrom;
