/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { ALPHABETICAL_INPUTS } from './../../../../utils/constants';
import { countryActiveEntity } from '../../../../service/common_services';
import { Form, Button, Input, Select, InputNumber } from 'antd';
import { loadEntity, loadEntities } from 'actions/data';
import { dispatch } from 'store';
const { Option } = Select;
const GLChartOfAccountsForm = (props) => {
  const [form] = Form.useForm();

  const { entities } = props;

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
    labelAlign: 'left',
    name: 'chartofaccounts-form',
    form: form,
  };

  useEffect(() => {
    dispatch(loadEntity(countryActiveEntity));
    const values = props.editItem;
    form.resetFields();
    if (values) {
      const { country = [], serviceTypes = [], ...otherValues } = values;

      form.setFieldsValue({
        country: (values.country || []).map((c) => c.id),
        serviceTypes: (values.serviceTypes || []).map((s) => s.id),
        ...otherValues,
      });
    }
  }, [props.editItem, form]);

  const handleSubmit = (e) => {
    form
      .validateFields()
      .then((values) => {
        const { country = [], serviceTypes = [], ...otherValues } = values;
        props.onSubmit({
          country: country.map((cId) => ({ id: cId })),
          serviceTypes: serviceTypes.map((sId) => ({ id: sId })),
          ...otherValues,
        });
        form.resetFields();
      })
      .catch((info) => {});
  };

  const countryOptions = ((entities && entities.active_countries) || []).map(
    (r) => (
      <Option key={r.id} value={r.id}>
        {r.name}
      </Option>
    )
  );

  const serviceTypesOptions = ((entities && entities.servicetype) || []).map(
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
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: 'Please enter description',
            },
          ]}
        >
          <Input maxLength={4096} />
        </Form.Item>
        <Form.Item
          name="ofgroup"
          label="Group"
          rules={[
            {
              required: true,
              pattern: ALPHABETICAL_INPUTS,
              message: 'Please enter valid group name',
            },
          ]}
        >
          <Input maxLength={16} />
        </Form.Item>
        <Form.Item
          name="country"
          label="Countries"
          rules={[
            {
              required: true,
              message: 'Please enter valid country name',
            },
          ]}
        >
          <Select
            showSearch
            mode="multiple"
            // optionFilterProp="children"
            // value={selectedItems}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {countryOptions}
          </Select>
        </Form.Item>

        <Form.Item
          name="serviceTypes"
          label="Applicable"
          rules={[
            {
              required: true,
              message: 'Please enter Applicables',
            },
          ]}
        >
          <Select
            mode="multiple"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {serviceTypesOptions}
          </Select>
        </Form.Item>

        <Form.Item name="value" label="Value">
          <Input maxLength={16} />
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

export default GLChartOfAccountsForm;
