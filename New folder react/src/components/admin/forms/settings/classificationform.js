import React, { useEffect } from 'react';
import { ALPHABETICAL_INPUTS } from './../../../../utils/constants';
import { Form, Button, Input, Select } from 'antd';
const { Option } = Select;
const ClassificationForm = (props) => {
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
    labelAlign: 'left',
    name: 'branch-form',
    form: form,
  };

  useEffect(() => {
    const values = props.editItem;
    form.resetFields();
    values &&
      form.setFieldsValue({
        ...values,
      });
  }, [props.editItem, form]);

  const handleSubmit = (e) => {
    form
      .validateFields()
      .then((values) => {
        const { period = 'unlimited', ...otherValues } = values;
        props.onSubmit({
          period,
          ...otherValues,
        });
        form.resetFields();
      })
      .catch((info) => {
        // console.log('Validate Failed:', info)
      });
  };

  return (
    <div>
      <Form {...formItemLayout}>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              pattern: ALPHABETICAL_INPUTS,
              message: 'Please enter classification name',
            },
          ]}
        >
          <Input maxLength={256} />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: 'Please enter classification description',
            },
          ]}
        >
          <Input maxLength={2048} />
        </Form.Item>
        <Form.Item name="period" label="Period">
          <Select mode="single" defaultValue="unlimited">
            <Option value="unlimited">unlimited</Option>
            <Option value="premium7d">premium7d</Option>
            <Option value="premium1m">premium1m</Option>
            <Option value="premium3m">premium3m</Option>
            <Option value="premium6m">premium6m</Option>
            <Option value="premium1yr">premium1yr</Option>
          </Select>
        </Form.Item>
      </Form>
      <div
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
        }}
      >
        <Button style={{ marginRight: 8 }} onClick={props.onCancel}>
          Cancel
        </Button>
        <Button
          type="primary"
          key="submit"
          htmlType="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ClassificationForm;
