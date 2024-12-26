import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, message } from 'antd';
import { useMutation } from '@apollo/client';
import { ADD_PRODUCT } from './gql/mutation';
import { useNavigate } from 'react-router';

type FieldType = {
  name?: string;
  price?: number;
  description?: string;
  category?: string;
  stock?: number;
};

const App: React.FC = () => {
  const [addProduct] = useMutation(ADD_PRODUCT)
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate()

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    await addProduct({ variables: { ...values } })
    messageApi.success("Success Create Product")
    setTimeout(() => {
      navigate('/')
    }, 500)
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      {contextHolder}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Please input price!' }]}
        >
          <Input type='number' />
        </Form.Item>
        <Form.Item<FieldType>
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please input description!' }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item<FieldType>
          label="Category"
          name="category"
          rules={[{ required: true, message: 'Please input category!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Stock"
          name="stock"
          rules={[{ required: true, message: 'Please input stock!' }]}
        >
          <Input type='number' />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
};

export default App;