import React, { useEffect } from 'react';
import { Form, Button, Input, InputNumber, Select } from 'antd';
const { Option } = Select;
const PackageTypeForm = (props) => {
  const [form] = Form.useForm();

  const { entities } = props;

  const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 20 },
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
        dimensionMeasureType: (values.dimensionMeasureType || {}).id,
        weightMeasureType: (values.weightMeasureType || {}).id,
        volumeMeasureType: (values.volumeMeasureType || {}).id,
      });
  }, [props.editItem, form]);

  const handleSubmit = (e) => {
    form
      .validateFields()
      .then((values) => {
        const {
          dimensionMeasureType,
          weightMeasureType,
          volumeMeasureType,
          ...otherValues
        } = values;
        props.onSubmit({
          dimensionMeasureType: { id: dimensionMeasureType },
          weightMeasureType: { id: weightMeasureType },
          volumeMeasureType: { id: volumeMeasureType },
          ...otherValues,
        });
        form.resetFields();
      })
      .catch((info) => {
        // console.log('Validate Failed:', info)
      });
  };

  const measureTypeOptions = ((entities && entities.measuretype) || []).map(
    (r) => (
      <Option key={r.id} value={r.id}>
        {r.code}
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
            },
          ]}
        >
          <Input maxLength={256} />
        </Form.Item>
        <Form.Item
          name="packageTypeCode"
          label="Package Type Code"
          rules={[
            {
              required: true,
              message: 'Please enter code',
            },
          ]}
        >
          <Input maxLength={100} />
        </Form.Item>
        <Form.Item
          name="length"
          label="Length"
          rules={[
            {
              required: true,
              message: 'Please enter length',
            },
          ]}
        >
          <InputNumber min={1} maxLength={10} />
        </Form.Item>
        <Form.Item
          name="height"
          label="Height"
          rules={[
            {
              required: true,
              message: 'Please enter height',
            },
          ]}
        >
          <InputNumber min={1} maxLength={10} />
        </Form.Item>
        <Form.Item
          name="width"
          label="Width"
          rules={[
            {
              required: true,
              message: 'Please enter width',
            },
          ]}
        >
          <InputNumber min={1} maxLength={10} />
        </Form.Item>
        <Form.Item
          name="dimensionMeasureType"
          label="Dimension Measure Type"
          rules={[
            {
              required: true,
              message: 'Please enter dimension measure type',
            },
          ]}
        >
          <Select mode="single">{measureTypeOptions}</Select>
        </Form.Item>
        <Form.Item
          name="weightCapacity"
          label="Weight Capacity"
          rules={[
            {
              required: true,
              message: 'Please enter weight capacity',
            },
          ]}
        >
          <InputNumber min={1} maxLength={10} />
        </Form.Item>
        <Form.Item
          name="weightMeasureType"
          label="Weight Measure Type"
          rules={[
            {
              required: true,
              message: 'Please enter weight measure type',
            },
          ]}
        >
          <Select mode="single">{measureTypeOptions}</Select>
        </Form.Item>
        <Form.Item
          name="volumeCapacity"
          label="Volume Capacity"
          rules={[
            {
              required: true,
              message: 'Please enter volume capacity',
            },
          ]}
        >
          <InputNumber min={1} maxLength={10} />
        </Form.Item>
        <Form.Item
          name="volumeMeasureType"
          label="Volume Measure Type"
          rules={[
            {
              required: true,
              message: 'Please enter width',
            },
          ]}
        >
          <Select mode="single">{measureTypeOptions}</Select>
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

export default PackageTypeForm;
