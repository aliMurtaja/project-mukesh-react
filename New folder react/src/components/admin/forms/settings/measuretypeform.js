import React, { useEffect } from 'react';
import { Form, Button, Input } from 'antd';
import { ALPHABETICAL_INPUTS } from 'utils/constants';

const MeasureTypeForm = (props) => {
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
    labelAlign: 'left',
    name: 'country-form',
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
        props.onSubmit({ ...values });
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
              message: 'Please input measure type name',
              pattern: ALPHABETICAL_INPUTS,
            },
          ]}
        >
          <Input maxLength={256} />
        </Form.Item>
        <Form.Item
          name="code"
          label="Code"
          rules={[
            {
              required: true,
              message: 'Please input measure type code',
            },
          ]}
        >
          <Input maxLength={6} />
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

export default MeasureTypeForm;
