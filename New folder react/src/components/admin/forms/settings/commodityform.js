import React, { useEffect } from 'react';
import { ALPHABETICAL_INPUTS } from './../../../../utils/constants';
import { Form, Button, Input, Select, InputNumber } from 'antd';
import { countryActiveEntity } from '../../../../service/common_services';
import { loadEntity, loadEntities } from 'actions/data';
import { dispatch } from 'store';
const { Option } = Select;
const CommodityForm = (props) => {
  const [form] = Form.useForm();

  const { entities } = props;

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
    labelAlign: 'left',
    name: 'branch-form',
    form: form,
  };

  useEffect(() => {
    dispatch(loadEntity(countryActiveEntity));
    const values = props.editItem;
    form.resetFields();
    values &&
      form.setFieldsValue({
        ...values,
        country: (values.country || {}).id,
      });
  }, [props.editItem, form]);

  const handleSubmit = (e) => {
    form
      .validateFields()
      .then((values) => {
        const { country, ...otherValues } = values;
        props.onSubmit({
          country: { id: country },
          ...otherValues,
        });
        form.resetFields();
      })
      .catch((info) => {
        // console.log('Validate Failed:', info)
      });
  };

  const countryOptions = ((entities && entities.active_countries) || []).map(
    (r) => (
      <Option key={r.id} value={r.id}>
        {r.name}
      </Option>
    )
  );

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
              message: 'Please input Name',
            },
          ]}
        >
          <Input maxLength={256} />
        </Form.Item>
        <Form.Item
          name="className"
          label="Class Name"
          rules={[
            {
              required: true,
              pattern: ALPHABETICAL_INPUTS,
              message: 'Please input Class Name',
            },
          ]}
        >
          <Input maxLength={256} />
        </Form.Item>
        <Form.Item
          name="rate"
          label="Rate"
          rules={[
            {
              required: true,
              message: 'Please input Rate',
            },
          ]}
        >
          <InputNumber maxLength={8} min={0} />
        </Form.Item>
        <Form.Item
          name="country"
          name="country"
          label="Country"
          rules={[
            {
              required: true,
              message: 'Please input Country',
            },
          ]}
        >
          <Select
            showSearch
            mode="single"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {countryOptions}
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

export default CommodityForm;
