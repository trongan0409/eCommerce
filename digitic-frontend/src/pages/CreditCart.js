import React from "react";
import Cards from "react-credit-cards-2";
import { Checkbox, Col, Form, Input, Row } from "antd";
import {
    formatCVC,
    formatCreditCardNumber,
    formatExpirationDate,
} from "./ultil_ccv";
import "react-credit-cards-2/dist/es/styles-compiled.css";

const CreditCart = ({ onPlaceOrder, form }) => {
    const [name, setName] = React.useState("");
    const [number, setNumber] = React.useState("");
    const [expiry, setExpiry] = React.useState("");
    const [cvc, setCVC] = React.useState("");
    const [focus, SetFocus] = React.useState("");
    const onChangeCardNumber = (evt) => {
        const { value } = evt.target;
        setNumber(value);
        form.setFieldsValue({
            cardNumber: formatCreditCardNumber(value),
        });
    };
    const onChangeExpirationDate = (evt) => {
        const { value } = evt.target;
        setExpiry(value);
        form.setFieldsValue({
            expirationDate: formatExpirationDate(value),
        });
    };
    const onChangeCVC = (evt) => {
        const { value } = evt.target;
        setCVC(value);
        form.setFieldsValue({
            CVC: formatCVC(value),
        });
    };

    const handleInputFocus = ({ target }) => {
        SetFocus(target.name);
    };

    const onChangeCheckBox = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const onSubmit = (values) => {
        onPlaceOrder("creditCard", values);
    };
    return (
        <>
            <Cards
                name={name}
                number={number}
                expiry={expiry}
                cvc={cvc}
                focused={focus}
            />
            <Form
                form={form}
                onFinish={onSubmit}
                layout='vertical'
                autoComplete='off'
                style={{
                    marginTop: 20,
                }}
            >
                {/* <Row gutter={[12, 12]}>
                    <Col span={16}>
                        <Form.Item name='name' label='Name' rules={[{ required: true }]}>
                            <Input
                                onFocus={handleInputFocus}
                                type='text'
                                name='name'
                                placeholder='Name'
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item name='cardNumber' label='Card Number' rules={[{ required: true }]}>
                            <Input
                                onFocus={handleInputFocus}
                                type='tel'
                                name='number'
                                pattern='[\d| ]{16,22}'
                                placeholder='Card Number'
                                onChange={onChangeCardNumber}
                            />
                        </Form.Item>
                        <Row gutter={[12, 12]}>
                            <Col span={16}>
                                <Form.Item name='expirationDate' label='Expiration Date' rules={[{ required: true }]}>
                                    <Input
                                        onFocus={handleInputFocus}
                                        type='tel'
                                        name='expiry'
                                        pattern='\d\d/\d\d'
                                        placeholder='Expiration Date'
                                        onChange={onChangeExpirationDate}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name='CVC' label='CVC' rules={[{ required: true }]}>
                                    <Input
                                        onFocus={handleInputFocus}
                                        type='tel'
                                        name='cvc'
                                        pattern='\d{3,4}'
                                        placeholder='CVC'
                                        onChange={onChangeCVC}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row> */}
            </Form>
        </>
    );
};

export default CreditCart;
