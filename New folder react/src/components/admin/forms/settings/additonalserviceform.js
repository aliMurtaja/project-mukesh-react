import React, { useEffect } from 'react';
import { Form, Button, Input, InputNumber, DatePicker, Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import {
  SWIFTPAC_DATETIME_FORMAT,
  ALPHABETICAL_INPUTS,
} from './../../../../utils/constants';
import moment from 'moment';

const AdditonalServiceForm = (props) => {
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
    labelAlign: 'left',
    name: 'additional-service-form',
    form: form,
  };

  useEffect(() => {
    const values = props.editItem;
    form.resetFields();
    if (values) {
      let { active, startDate, endDate, ...otherValues } = values;
      active = active === 'true' ? true : false;
      startDate = { startDate: getValidDate(startDate) };
      endDate = { endDate: getValidDate(endDate) };
      form.setFieldsValue({
        active,
        ...otherValues,
      });
      form.setFieldsValue(startDate);
      form.setFieldsValue(endDate);
    }
  }, [props.editItem, form]);

  const getValidDate = (date) => {
    return moment(date, SWIFTPAC_DATETIME_FORMAT);
  };

  const handleSubmit = (e) => {
    form
      .validateFields()
      .then((values) => {
        let { active, startDate, endDate, ...otherValues } = values;
        active = active ? 1 : 0;
        startDate = startDate.format(SWIFTPAC_DATETIME_FORMAT);
        endDate = endDate.format(SWIFTPAC_DATETIME_FORMAT);
        props.onSubmit({ active, startDate, endDate, ...otherValues });
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
              message: 'Please input Service Type name',
            },
          ]}
        >
          <Input maxLength={256} minLength={2} />
        </Form.Item>
        <Form.Item
          name="basicCost"
          label="Basic Cost"
          rules={[
            {
              required: true,
              message: 'Please enter basic cost',
            },
          ]}
        >
          <InputNumber maxLength={8} min={0} />
        </Form.Item>
        <Form.Item
          name="markUp"
          label="Mark Up"
          rules={[
            {
              required: true,
              message: 'Please enter mark up',
            },
          ]}
        >
          <InputNumber maxLength={8} min={0} />
        </Form.Item>
        <Form.Item
          name="markUpBy"
          label="Mark Up By"
          rules={[
            {
              required: true,
              message: 'Please enter mark up by',
            },
          ]}
        >
          <InputNumber maxLength={8} min={0} />
        </Form.Item>
        <Form.Item
          name="startDate"
          label="Start Date"
          rules={[
            {
              type: 'object',
              required: true,
              message: 'Please enter start date',
            },
          ]}
        >
          <DatePicker format={SWIFTPAC_DATETIME_FORMAT} showTime />
        </Form.Item>
        <Form.Item
          name="endDate"
          label="End Date"
          rules={[
            {
              type: 'object',
              required: true,
              message: 'Please enter end date',
            },
          ]}
        >
          <DatePicker format={SWIFTPAC_DATETIME_FORMAT} showTime />
        </Form.Item>
        <Form.Item name="active" label="Active" valuePropName="checked">
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={false}
          />
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

export default AdditonalServiceForm;
