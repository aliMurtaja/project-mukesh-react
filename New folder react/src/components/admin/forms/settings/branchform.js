import React, { useEffect } from 'react';
import {
  countryActiveEntity,
  currencyAscEntity,
  AdditionalServiceActiveEntity,
} from '../../../../service/common_services';
import { loadEntity, loadEntities } from 'actions/data';
import { Form, Button, Input, Select, InputNumber } from 'antd';
import {
  ALPHABETICAL_INPUTS,
  NUMERIC_INPUTS,
  PHONE_NUMBER,
} from './../../../../utils/constants';
import { dispatch } from 'store';
const { Option } = Select;

const BranchForm = (props) => {
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
    dispatch(loadEntity(currencyAscEntity));
    dispatch(loadEntity(AdditionalServiceActiveEntity));
    const values = props.editItem;
    form.resetFields();
    values &&
      form.setFieldsValue({
        ...values,
        country: (values.country || {}).id,
        currency: (values.currency || {}).id,
        serviceTypes: (values.serviceTypes || []).map((s) => s.id),
        additionalServices: (values.additionalServices || []).map((s) => s.id),
      });
  }, [props.editItem, form]);

  const handleSubmit = (e) => {
    form
      .validateFields()
      .then((values) => {
        const {
          currency,
          country,
          serviceTypes = [],
          additionalServices = [],
          ...otherValues
        } = values;
        props.onSubmit({
          serviceTypes: serviceTypes.map((sId) => ({ id: sId })),
          additionalServices: additionalServices.map((sId) => ({ id: sId })),
          currency: { id: currency },
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
  const currencyOptions = ((entities && entities.asc_currencies) || []).map(
    (r) => (
      <Option key={r.id} value={r.id}>
        {r.code}
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

  const additionalServiceTypesOptions = (
    (entities && entities.active_additionalServices) ||
    []
  ).map((r) => (
    <Option key={r.id} value={r.id}>
      {r.name}
    </Option>
  ));

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
              message: 'Please enter branch name',
            },
          ]}
        >
          <Input maxLength={256} />
        </Form.Item>
        <Form.Item
          name="company"
          label="Company"
          rules={[
            {
              required: true,
              pattern: ALPHABETICAL_INPUTS,
              message: 'Please enter company name',
            },
          ]}
        >
          <Input maxLength={256} />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: 'Please enter email',
            },
            {
              type: 'email',
              message: 'Please enter a valid email',
            },
          ]}
        >
          <Input maxLength={64} />
        </Form.Item>
        <Form.Item
          name="address1"
          label="Address 1"
          rules={[
            {
              required: true,
              message: 'Please enter address1',
            },
          ]}
        >
          <Input maxLength={256} />
        </Form.Item>
        <Form.Item
          name="address2"
          label="Address 2"
          rules={[
            {
              required: false,
              message: 'Please enter address2',
            },
          ]}
        >
          <Input maxLength={256} />
        </Form.Item>
        <Form.Item
          name="city"
          label="City"
          rules={[
            {
              required: true,
              pattern: ALPHABETICAL_INPUTS,
              message: 'Please enter city',
            },
          ]}
        >
          <Input maxLength={256} />
        </Form.Item>
        <Form.Item
          name="state"
          label="State"
          rules={[
            {
              required: true,
              pattern: ALPHABETICAL_INPUTS,
              message: 'Please enter state',
            },
          ]}
        >
          <Input maxLength={256} />
        </Form.Item>
        <Form.Item
          name="country"
          label="Country"
          rules={[
            {
              required: true,
              message: 'Please enter country',
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
        <Form.Item
          name="currency"
          label="Currency"
          rules={[
            {
              required: true,
              message: 'Please enter currency',
            },
          ]}
        >
          <Select mode="single">{currencyOptions}</Select>
        </Form.Item>
        <Form.Item
          name="zip"
          label="Zip"
          rules={[
            {
              required: true,
              message: 'Please enter zip code',
              pattern: NUMERIC_INPUTS,
              min: 5,
            },
          ]}
        >
          <Input maxLength={5} />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            {
              required: true,
              message: 'Please enter phone number',
            },
          ]}
        >
          <Input maxLength={25} />
        </Form.Item>
        <Form.Item
          name="mobile"
          label="Mobile"
          rules={[
            {
              required: false,
              message: 'Please enter mobile number',
            },
          ]}
        >
          <Input maxLength={20} />
        </Form.Item>
        <Form.Item
          name="fax"
          label="Fax"
          rules={[
            {
              required: false,
              message: 'Please enter fax number',
            },
          ]}
        >
          <Input maxLength={30} />
        </Form.Item>

        <Form.Item
          name="serviceTypes"
          label="Service Types"
          rules={[
            {
              required: true,
              message: 'Please enter Services Type',
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

        <Form.Item
          name="additionalServices"
          label="Additional Service"
          rules={[
            {
              required: true,
              message: 'Please add Additional Services',
            },
          ]}
        >
          <Select
            showSearch
            mode="multiple"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {additionalServiceTypesOptions}
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

export default BranchForm;
