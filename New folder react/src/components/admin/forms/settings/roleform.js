/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Form, Button, Input, Select } from 'antd';
import { forEach } from 'lodash';
import { ALPHABETICAL_INPUTS } from 'utils/constants';
const { Option, OptGroup } = Select;
const RoleForm = (props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    const values = props.editItem;
    form.resetFields();
    values &&
      form.setFieldsValue({
        ...values,
        permission_ids: (values.permissions || []).map((p) => p.id),
      });
  }, [props.editItem]);

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
    labelAlign: 'left',
  };
  const handleSubmit = (e) => {
    form
      .validateFields()
      .then((values) => {
        const { permission_ids = [], ...otherValues } = values;
        props.onSubmit({
          permissions: permission_ids.map((pId) => ({ id: pId })),
          ...otherValues,
        });
        form.resetFields();
      })
      .catch((info) => {
        // console.log('Validate Failed:', info)
      });
  };

  const { entities } = props;
  var permissionsMap = {};
  ((entities && entities.permission) || []).forEach((r) => {
    var splits = r.name.split('_');
    if (permissionsMap[splits[1]] == undefined) permissionsMap[splits[1]] = [r];
    else permissionsMap[splits[1]].push(r);
  });
  const permissionsOptions = Object.keys(permissionsMap)
    .sort()
    .map((group) => {
      return (
        <OptGroup key={group} label={group}>
          {permissionsMap[group].map((permission) => {
            return (
              <Option key={permission.id} value={permission.id}>
                {permission.name}
              </Option>
            );
          })}
        </OptGroup>
      );
    });
  return (
    <div>
      <Form {...formItemLayout} name="role-form" form={form}>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please input name',
              pattern: ALPHABETICAL_INPUTS,
              message: 'Please enter valid name',
            },
          ]}
        >
          <Input maxLength={256} />
        </Form.Item>
        <Form.Item
          name="permission_ids"
          label="Permissions"
          rules={[
            {
              required: true,
              message: 'Please input Permissions',
            },
          ]}
        >
          <Select showSearch mode="multiple">
            {permissionsOptions}
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
        <Button
          style={{ marginRight: 8 }}
          onClick={() => {
            props.onCancel();
          }}
        >
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

export default RoleForm;
