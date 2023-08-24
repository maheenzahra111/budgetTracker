import React, { useState, useEffect } from 'react';
import { Button, Table, Input, DatePicker, Menu, Modal, Form, Dropdown, Row } from 'antd';
import { EditOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import '../styles/Dashboard.css';
import dayjs from 'dayjs';
// import customParseFormat from 'dayjs/plugin/customParseFormat';
// import advancedFormat from 'dayjs/plugin/advancedFormat';
// import localizedFormat from 'dayjs/plugin/localizedFormat';

import 'dayjs/locale/zh-cn'; // Import the desired locale
// dayjs.extend(customParseFormat);
// dayjs.extend(advancedFormat);
// dayjs.extend(localizedFormat);


const Dashboard = () => {
    const [dataSource, setDataSource] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingData, setEditingData] = useState(null);
    const [form] = Form.useForm();
    const [filterDate, setFilterDate] = useState(null);

    const [value, setValue] = useState('')

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        // Simulate fetching data
        const data = [
            // Sample data
            { key: 1, name: 'Item 1', price: 100, date: '2023-08-24' },
            { key: 2, name: 'Item 2', price: 200, date: '2023-08-25' },
            // ... (other data entries)
        ];
        setDataSource(data);
    };

    const handleEdit = (record) => {
        setIsModalVisible(true);
        setEditingData(record);
        form.setFieldsValue(record);
    };

    const handleDelete = (recordKey) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this record?',
            okText: 'Yes',
            okType: 'danger',
            onOk: () => {
                setDataSource((prev) => prev.filter((item) => item.key !== recordKey));
            },
        });
    };

    const handleModalOk = () => {
        form.validateFields()
            .then((values) => {
                const newData = [...dataSource];
                if (editingData) {
                    const index = newData.findIndex((item) => item.key === editingData.key);
                    if (index > -1) {
                        newData[index] = {
                            ...editingData,
                            ...values,
                            date: dayjs(values.date).format('YYYY-MM-DD'), // Format the date properly
                        };
                    }
                } else {
                    newData.push({
                        ...values,
                        date: dayjs(values.date).format('YYYY-MM-DD'), // Format the date properly
                        key: newData.length + 1,
                    });
                }
                setDataSource(newData);
                form.resetFields();
                setIsModalVisible(false);
                setEditingData(null);
            })
            .catch((errorInfo) => {
                console.log('Validation Failed:', errorInfo);
            });
    };


    const handleFilter = () => {
        if (filterDate) {
            const filtered = dataSource.filter((data) => {
                return dayjs(data.date).isSame(filterDate, 'day');
            });
            setDataSource(filtered);
        }
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
            render: (date) => {
                const formattedDate = dayjs(date).format('YYYY-MM-DD');
                return <span>{formattedDate}</span>;
            },
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
            <Menu.Item style={{ color: 'red' }} key="2" icon={<DeleteOutlined />} onClick={() => handleDelete(record.key)}>
                Delete
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <Row className="button-row">
                    <div>
                        <DatePicker onChange={(date) => setFilterDate(date)} />
                        <Button className="filter-button" type="primary" onClick={handleFilter}>
                            Filter Records
                        </Button>
                    </div>
                    <div>
                        <Button className="add-button" type="primary" onClick={() => setIsModalVisible(true)}>
                            Add Budget
                        </Button>
                    </div>
                </Row>
            </div>
            <Table columns={columns} dataSource={dataSource} pagination={false} />
            {/* Add/Edit Budget Modal */}
            <Modal
                title={editingData ? 'Edit Budget' : 'Add Budget'}
                visible={isModalVisible}
                onOk={handleModalOk}
                onCancel={() => {
                    setIsModalVisible(false);
                    setEditingData(null);
                    form.resetFields();
                }}
            >
                <Form form={form}>
                    {editingData && (
                        <Form.Item name="key" hidden>
                            <Input />
                        </Form.Item>
                    )}
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
                        <DatePicker  />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Dashboard;
