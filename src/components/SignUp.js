// src/components/SignUp.js
import React, { useState } from 'react';
import '../styles/SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { signUp } from '../api/auth';
import { Form, Input, Button, Card, Col, Row } from 'antd';
import Meta from 'antd/es/card/Meta';

const SignUp = () => {
    const history = useNavigate();

    const { mutateAsync: signUpMutation } = useMutation(signUp);

    const handleSubmit = async (values) => {
        try {
            await signUpMutation(values.name, values.email, values.password, values.budgetLimit);
            history.push('/dashboard');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="box">
            <Card className="formcard">
                <Row className="row">
                    <Col className="yellowRectangle">
                        Start your journey with us!
                    </Col>
                    <Col className='form-container'>
                        <Form className="form" onFinish={handleSubmit} >
                            <Meta title={"Sign Up"} />
                            <p>
                                <span>
                                    <Link to="/signin" > Already have an account? </Link>
                                </span>
                            </p>
                            <Form.Item name="First Name" rules={[{ required: true, message: 'Please input your First Name!' }]}>
                                <Input placeholder="First Name*" />
                            </Form.Item>
                            <Form.Item name="Last Name" rules={[{ required: true, message: 'Please input your Last name!' }]}>
                                <Input placeholder="Last Name*" />
                            </Form.Item>
                            <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                                <Input placeholder="Email*" />
                            </Form.Item>
                            <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                                <Input.Password placeholder="Password*" />
                            </Form.Item>
                            <Form.Item name="Confirm Password" rules={[{ required: true, message: 'Confirm your password!' }]}>
                                <Input.Password placeholder="ConfirmPassword*" />
                            </Form.Item>
                            <Form.Item name="budgetLimit" rules={[{ required: true, message: 'Please input your budget limit!' }]}>
                                <Input placeholder="Budget Limit*" />
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType="submit" className="submitButton" size='large'>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Card >
        </div>
    );
};

export default SignUp;
