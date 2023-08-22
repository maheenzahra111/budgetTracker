// src/components/SignIn.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { signIn } from '../api/auth.js';
import { Form, Input, Button, Card, Col, Row } from 'antd';
import Meta from 'antd/es/card/Meta';


const SignIn = () => {
    const history = useNavigate();

    const { mutateAsync: signInMutation } = useMutation(signIn);

    const handleSubmit = async (values) => {
        try {
            const { email, password } = values;
            await signInMutation(email, password);
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
                            <Meta title={"Sign In"} />
                            <p>
                                <span>
                                    <Link to="/signup" > Don't have an account? </Link>
                                </span>
                            </p>
                            <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                                <Input placeholder="Email*" />
                            </Form.Item>
                            <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                                <Input.Password placeholder="Password*" />
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

export default SignIn;
