/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Form, Button, Input, Select, Switch, Tabs } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import UserAddressForm from './userAddressForm';
// import { values } from 'lodash';
import {
  ALPHABETICAL_INPUTS,
  NUMERIC_INPUTS,
  APP_CONTEXT_URL,
} from 'utils/constants';
import { AdditionalServiceActiveEntity } from '../../../../service/common_services';
import { loadEntity, loadEntities } from 'actions/data';
import { dispatch } from 'store';

const { Option } = Select;
const { TabPane } = Tabs;

const UserForm = (props) => {
  const [form] = Form.useForm();

  var showTabs = true;
  const { entities } = props;

  var disabledWhenEdit = false;
  const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 19 },
    labelAlign: 'left',
    name: 'user-form',
  };

  var valueLabel = '';
  if (props.editItem) {
    valueLabel = props.editItem.username;
    disabledWhenEdit = true;
  } else {
    form.resetFields();
    valueLabel = 'Login ID will be auto generated';
  }

  const responseUser = window.$name;
  if (responseUser !== undefined) {
    showTabs = false;
  }

  if (window.$check === undefined) {
    showTabs = true;
  }

  if (props.editItem) {
    showTabs = false;
    window.$name = props.editItem;
  }
  useEffect(() => {
    const values = entities.get_user;
    if (props.editItem) {
      values &&
        form.setFieldsValue({
          roles: (values.roles || []).map((s) => s.id),
        });
    }
  }, [entities]);

  useEffect(() => {
    dispatch(loadEntity(AdditionalServiceActiveEntity));
    const values = props.editItem;
    if (values) {
      const getUserEntity = {
        label: 'Get User',
        name: 'get_user',
        url: APP_CONTEXT_URL + '/v1/users/' + values.id,
      };

      dispatch(loadEntity(getUserEntity));
    }
    values &&
      form.setFieldsValue({
        agent: (values.agent || {}).id,
        name: values.name,
        userType: values.userType,
        mobile: values.mobile,
        email: values.email,
        fax: values.fax,
        autoRenew: values.autoRenew === 'true' ? true : false,
        phone: values.phone,
        classification: (values.classification || {}).id,
        additionalServices: (values.additionalServices || []).map((s) => s.id),
        defaultServiceType: (values.defaultServiceType || {}).id,
      });
  }, [props.editItem, form]);

  const handleSubmit = (e) => {
    form
      .validateFields()
      .then((values) => {
        values.username = valueLabel;
        const {
          roles = [],
          country_id,
          agent,
          defaultServiceType = {},
          additionalServices = [],
          classification = {},
          ...otherValues
        } = values;
        props.onSubmit({
          country: { id: country_id },
          agent: { id: agent },
          classification: { id: classification },
          defaultServiceType: { id: defaultServiceType },
          additionalServices: additionalServices.map((aId) => ({ id: aId })),
          roles: roles.map((rId) => ({ id: rId })),
          password: values.password,
          ...otherValues,
        });
        form.resetFields();
      })
      .catch((info) => {});
  };

  const roleOptions = ((entities && entities.role) || []).map((r) => (
    <Option key={r.id} value={r.id}>
      {r.name}
    </Option>
  ));

  const branchOptions = ((entities && entities.branch) || []).map((r) => (
    <Option key={r.id} value={r.id}>
      {r.name}
    </Option>
  ));

  const serviceTypeOptions = ((entities && entities.servicetype) || []).map(
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

  const classificationOptions = (
    (entities && entities.classification) ||
    []
  ).map((r) => (
    <Option key={r.id} value={r.id}>
      {r.name}
    </Option>
  ));

  if (props.editItem) {
    // showTabs = false;
    window.$name = props.editItem;
  }

  return (
    <div>
      <Tabs tabPosition={'left'} defaultActiveKey="1">
        <TabPane tab="User" key="1">
          <Form {...formItemLayout} form={form}>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: 'Please input name',
                  pattern: ALPHABETICAL_INPUTS,
                  type: 'string',
                  message: 'Please enter valid name',
                },
              ]}
            >
              <Input maxLength={512} />
            </Form.Item>
            <Form.Item
              name="roles"
              label="Role"
              rules={[
                {
                  required: true,
                  message: 'Please enter role',
                },
              ]}
            >
              <Select
                showSearch
                mode="multiple"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {roleOptions}
              </Select>
            </Form.Item>

            <Form.Item
              name="defaultServiceType"
              label="Default Ship Method"
              rules={[
                {
                  required: true,
                  message: 'Please input Ship method',
                },
              ]}
            >
              <Select mode="single">{serviceTypeOptions}</Select>
            </Form.Item>

            <Form.Item
              name="classification"
              label="Classification"
              rules={[
                {
                  required: true,
                  message: 'Please input Classification',
                },
              ]}
            >
              <Select mode="single">{classificationOptions}</Select>
            </Form.Item>

            <Form.Item
              name="additionalServices"
              label="Additional Service"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Select
                showSearch
                mode="multiple"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {additionalServiceTypesOptions}
              </Select>
            </Form.Item>

            <Form.Item
              name="userType"
              label="User Type"
              rules={[
                {
                  required: true,
                  message: 'Please select User Type',
                },
              ]}
            >
              <Select mode="single">
                <Option value="Customer">Customer</Option>
                <Option value="Vendor">Vendor</Option>
                <Option value="Employee">Employee</Option>
                <Option value="Agent">Agent</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone"
              rules={[
                {
                  pattern: NUMERIC_INPUTS,
                  message: 'Please enter valid phone no',
                },
              ]}
            >
              <Input maxLength={16} />
            </Form.Item>

            <Form.Item name="fax" label="Fax">
              <Input maxLength={16} />
            </Form.Item>

            <Form.Item
              name="mobile"
              label="Mobile"
              rules={[
                {
                  pattern: NUMERIC_INPUTS,
                  message: 'Please enter valid mobile no',
                },
              ]}
            >
              <Input maxLength={16} />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: 'Please input Email',
                },
                {
                  type: 'email',
                  message: 'Please enter a valid email',
                },
              ]}
            >
              <Input type="email" maxLength={64} />
            </Form.Item>

            <Form.Item
              name="agent"
              label="Agent"
              rules={[
                {
                  required: true,
                  message: 'Please enter Agent',
                },
              ]}
            >
              <Select disabled={disabledWhenEdit} mode="single">
                {branchOptions}
              </Select>
            </Form.Item>

            <Form.Item
              name="username"
              label="Login ID"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <h6>{valueLabel}</h6>
            </Form.Item>

            <Form.Item
              name="autoRenew"
              label="Auto Renew"
              valuePropName="checked"
            >
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked={false}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input password',
                },
              ]}
              hasFeedback
            >
              <Input.Password maxLength={60} />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      'The two passwords that you entered do not match!'
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Form>
          <div
            style={{
              position: 'fixed',
              right: 0,
              bottom: 0,
              width: '750px',
              zIndex: 9999,
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
        </TabPane>

        <TabPane
          disabled={showTabs}
          className="textAlign : left"
          tab="Addresses"
          key="2"
        >
          <UserAddressForm {...props}></UserAddressForm>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default UserForm;
