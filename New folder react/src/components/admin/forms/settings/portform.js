import React, { useEffect } from 'react';
import { Form, Button, Input, Select, InputNumber, Switch } from 'antd';
import { countryActiveEntity } from '../../../../service/common_services';
import { ALPHABETICAL_INPUTS, NUMERIC_INPUTS } from 'utils/constants';
import { loadEntity, loadEntities } from 'actions/data';
import { dispatch } from 'store';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
const { Option } = Select;
const PortForm = (props) => {
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
    if (values) {
      let { active, ...otherValues } = values;
      active = active === 'true' ? true : false;
      form.setFieldsValue({
        active,
        ...otherValues,
        country: (values.country || {}).id,
      });
    }
  }, [props.editItem, form]);

  const handleSubmit = (e) => {
    form
      .validateFields()
      .then((values) => {
        const { active, country, ...otherValues } = values;
        props.onSubmit({
          country: { id: country },
          active: active ? 1 : 0,
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
              message: 'Please enter branch name',
              pattern: ALPHABETICAL_INPUTS,
              message: 'Please enter valid name',
            },
          ]}
        >
          <Input maxLength={256} />
        </Form.Item>
        <Form.Item
          name="iata"
          label="IATA"
          rules={[
            {
              required: true,
              message: 'Please enter IATA',
              pattern: ALPHABETICAL_INPUTS,
              min: 3,
              message: 'Please enter 3 characters',
            },
          ]}
        >
          <Input maxLength={3} />
        </Form.Item>
        <Form.Item name="shipType" label="Ship Type" type="String">
          <Input maxLength={64} />
        </Form.Item>
        <Form.Item
          name="country"
          label="Country"
          rules={[
            {
              required: true,
              message: 'Please enter Country',
            },
          ]}
        >
          <Select
            showSearch
            mode="single"
            // optionFilterProp="children"
            // value={selectedItems}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {countryOptions}
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

export default PortForm;
