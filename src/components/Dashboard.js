import React, { useState } from 'react';
import {
  Button,
  Modal,
  Table,
  Form,
  Input,
  DatePicker,
  Space,
  Row,
} from 'antd';
import moment from 'moment';
import '../styles/Dashboard.css';
import '../styles/dateFilter.css';

const Dashboard = () => {
  const [entries, setEntries] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingEntry) {
          const updatedEntry = {
            id: editingEntry.id,
            date: values.date.format('YYYY-MM-DD'),
            transactionName: values.transactionName,
            price: values.price,
          };
          setEntries(
            entries.map((entry) =>
              entry.id === updatedEntry.id ? updatedEntry : entry,
            ),
          );
          setEditingEntry(null);
        } else {
          const newEntry = {
            id: Date.now(),
            date: values.date.format('YYYY-MM-DD'),
            transactionName: values.transactionName,
            price: values.price,
          };
          setEntries([...entries, newEntry]);
        }
        form.resetFields();
        setIsModalVisible(false);
      })
      .catch((errorInfo) => {
        console.log('Validation failed:', errorInfo);
      });
  };
  const handleCancel = () => {
    setEditingEntry(null);
    form.resetFields();
    setIsModalVisible(false);
  };
  const handleEdit = (id) => {
    const entryToEdit = entries.find((entry) => entry.id === id);
    if (entryToEdit) {
      form.setFieldsValue({
        date: moment(entryToEdit.date),
        transactionName: entryToEdit.transactionName,
        price: entryToEdit.price,
      });
      setEditingEntry(entryToEdit);
      showModal();
    }
  };
  const handleDelete = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };
  const columns = [
    {
      title: 'Date/Time',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Transaction Name',
      dataIndex: 'transactionName',
      key: 'transactionName',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <div>
          <Button onClick={() => handleEdit(record.id)}>Edit</Button>
          <Button
            onClick={() => handleDelete(record.id)}
            style={{ marginLeft: '8px' }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div className="dashboard-container">
      <Row className="button-row">
        <Space>
          <DatePicker />
          <Button className="filter-button" type="primary">
            Filter Records
          </Button>
        </Space>
        <Button className="add-button" type="primary" onClick={showModal}>
          Add Budget
        </Button>
      </Row>
      <Modal
        title={editingEntry ? 'Edit Budget Entry' : 'Add New Budget Entry'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="date" label="Date/Time" rules={[{ required: true }]}>
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            name="transactionName"
            label="Transaction Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
      <Table dataSource={entries} columns={columns} />
    </div>
  );
};
export default Dashboard;