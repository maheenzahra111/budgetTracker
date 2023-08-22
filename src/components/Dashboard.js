// src/components/Dashboard.js
import React, { useState } from 'react';
import { Button, Table, Input, DatePicker, Menu, Modal, Form, Dropdown } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, MoreOutlined } from '@ant-design/icons';
import DateFilter from './DateFilter';
import '../styles/Dashboard.css';
import { Card, Col, Row } from 'antd';
import Meta from 'antd/es/card/Meta';


const Dashboard = () => {
    const [dataSource, setDataSource] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const pageSize = 10; // Number of entries to show per page

    const handleFilter = (selectedDate) => {
        // Implement your logic to filter entries based on the selected date
        console.log('Filtering by:', selectedDate);
    };

    const handleSearch = () => {
        // Implement your search logic here
        console.log('Searching for:', searchText);
    };

    const handleEdit = (record) => {
        form.setFieldsValue(record);
        setIsModalVisible(true);
    };

    const handleDelete = (recordKey) => {
        Modal.confirm({
            title: 'Are you sure, you want to delete this record?',
            okText: 'Yes',
            okType: "danger",
            onOk: () => {
                setDataSource(pre => {
                    return pre.filter((item) => item.key !== recordKey);
                })
            }
        })
    };


    const handleModalOk = () => {
        form.validateFields()
            .then((values) => {
                const newData = [...dataSource];

                // Add a new entry
                newData.push({
                    ...values,
                    date: new Date(values.date.format('YYYY-MM-DD')),
                    key: 1,
                });
                console.log(newData);
                setDataSource(newData);
                form.resetFields();
                setIsModalVisible(false);
            })
            .catch((errorInfo) => {
                console.log('Validation Failed:', errorInfo);
            });
    };



    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (date) => <span>{date.toLocaleDateString("en-US")}</span>,
        },

        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Dropdown overlay={menu(record)}>
                    <MoreOutlined />
                </Dropdown>
            ),
        },
    ];

    const menu = (record) => (
        <Menu>
            <Menu.Item key="1" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
                Edit
            </Menu.Item>
            <Menu.Item style={{ color: "red" }} key="2" icon={<DeleteOutlined />} onClick={() => handleDelete(record.key)}>
                Delete
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <Row className="button-row">
                    <Col>
                        <DateFilter onFilter={handleFilter} />
                    </Col>
                    <Col>
                        <Button className="add-button" type="primary" onClick={() => setIsModalVisible(true)}>
                            Add Budget
                        </Button>
                    </Col>
                </Row>
            </div>
            <Table columns={columns} dataSource={dataSource} pagination={false} />
            {/* Add Budget Modal */}
            <Modal
                title="Add Budget"
                visible={isModalVisible}
                onOk={handleModalOk}
                onCancel={() => setIsModalVisible(false)}
            >
                <Form form={form}>
                    <Form.Item name="key" hidden>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Please input the name' }]}
                    >
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[{ required: true, message: 'Please input the price' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        name="date"
                        label="Date"
                        rules={[{ required: true, message: 'Please input the date' }]}
                    >
                        <DatePicker />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Dashboard;
