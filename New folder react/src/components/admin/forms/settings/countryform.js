import React, { useEffect } from 'react';
import { Form, Button, Input, Switch, Select, AutoComplete, Alert } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { ALPHABETICAL_INPUTS } from 'utils/constants';
import { loadEntity, loadEntities } from 'actions/data';
import { AdditionalServiceActiveEntity } from '../../../../service/common_services';

import { dispatch } from 'store';

const { Option } = Select;
const CountryForm = (props) => {
  const [form] = Form.useForm();
  const { entities } = props;

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
    labelAlign: 'left',
    name: 'country-form',
    form: form,
  };

  useEffect(() => {
    dispatch(loadEntity(AdditionalServiceActiveEntity));
    const values = props.editItem;
    form.resetFields();
    if (values) {
      let { active, serviceTypes, additionalServices, ...otherValues } = values;
      active = active === 'true' ? true : false;
      form.setFieldsValue({
        active,
        serviceTypes: (values.serviceTypes || []).map((s) => s.id),
        additionalServices: (values.additionalServices || []).map((s) => s.id),

        ...otherValues,
      });
    }
  }, [props.editItem, form]);

  const handleSubmit = (e) => {
    form
      .validateFields()
      .then((values) => {
        let {
          serviceTypes = [],
          additionalServices = [],
          active,
          ...otherValues
        } = values;
        active = active ? 1 : 0;
        props.onSubmit({
          serviceTypes: serviceTypes.map((sId) => ({ id: sId })),
          additionalServices: additionalServices.map((sId) => ({ id: sId })),
          active,
          ...otherValues,
        });
        form.resetFields();
      })
      .catch((info) => {
        // console.log('Validate Failed:', info)
      });
  };

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
              message: 'Please input name',
              pattern: ALPHABETICAL_INPUTS,
            },
          ]}
        >
          <Input maxLength={80} />
        </Form.Item>
        <Form.Item
          name="iata"
          label="IATA"
          rules={[
            {
              required: true,
              message: 'Please input IATA',
              pattern: ALPHABETICAL_INPUTS,
              min: 3,
              message: 'Enter atleast 3 characters',
            },
          ]}
        >
          <Input maxLength={3} />
        </Form.Item>
        <Form.Item
          name="iso"
          label="ISO"
          rules={[
            {
              required: true,
              message: 'Please input ISO',
              pattern: ALPHABETICAL_INPUTS,
              min: 2,
              message: 'Enter atleast 2 characters',
            },
          ]}
        >
          <Input maxLength={2} minLength={2} />
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

        <Form.Item name="active" label="ACTIVE" valuePropName="checked">
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

export default CountryForm;
