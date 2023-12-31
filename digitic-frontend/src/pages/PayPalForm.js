import { Col, Form, Input, Row, Select } from "antd";
import React from "react";

const Option = [
    { value: "vn", label: "Viet Nam" },
    { value: "us", label: "US" },
];

const PayPalForm = ({ form, onPlaceOrder }) => {
    const onFinish = (values) => {
        onPlaceOrder("informationCustomer", values);
    };
    return (
        <Form onFinish={onFinish}>
            <Form.Item rules={[{ required: true }]} name='country'>
                <Select defaultValue='vn' style={{ width: "100%" }} options={Option} />
            </Form.Item>
            <Row gutter={[12, 12]}>
                <Col span={12}>
                    <Form.Item rules={[{ required: true }]} name='firstName'>
                        <Input placeholder='First Name' />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item rules={[{ required: true }]} name='lastName'>
                        <Input placeholder='Last Name' />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item rules={[{ required: true }]} name='address'>
                <Input placeholder='Address' />
            </Form.Item>
            <Form.Item rules={[{ required: true }]} name='addressDetail'>
                <Input placeholder='Apartment, suite, etc.' />
            </Form.Item>
            <Row gutter={[12, 12]}>
                {/* <Col span={12}>
     <Form.Item rules={[{ required: true }]} name='city'>
      <Input placeholder='City' />
     </Form.Item>
    </Col> */}
                <Col span={3}>
                    <Form.Item rules={[{ required: true }]} name='zipCode'>
                        <Input placeholder='ZIP Code' />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default PayPalForm;
