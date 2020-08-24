import React, { useEffect, useState } from 'react';
import {
  Form,
  DatePicker,
  Button,
  Switch,
  Input,
  Select,
  InputNumber,
  Tabs,
  Row,
  Col,
} from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { SWIFTPAC_DATETIME_FORMAT } from './../../../../utils/constants';
import moment from 'moment';
import TextArea from 'antd/lib/input/TextArea';
import WarehousePiece from './warehousePiece';
import WarehouseTrackingEvent from './warehouseTrackingEvent';
import WarehouseRemarks from './warehouseRemark';
import WarehouseReferenceDoc from './warehousrreferenceDoc';

const { Option } = Select;
const { TabPane } = Tabs;

const Warehouseform = (props) => {
  const [form] = Form.useForm();
  const { entities } = props;

  var showTabs = true;
  const [defaultTab, setDefaultTab] = useState(1);
  const responseWarehouse = window.$name;
  if (responseWarehouse !== undefined) {
    showTabs = false;
  }
  if (window.$check === undefined) {
    showTabs = true;
    // setDefaultTab(1);
  }

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
    labelAlign: 'left',
    name: 'warehouse-form',
    form: form,
  };

  if (props.editItem) {
    showTabs = false;
    window.$name = props.editItem;
  }

  useEffect(() => {
    setDefaultTab(1);
    const values = props.editItem;
    form.resetFields();

    if (values) {
      let {
        account,
        releaseDate,
        agent,
        billTo,
        shipper,
        origin,
        destination,
        ...otherValues
      } = values;
      releaseDate = { releaseDate: getValidDate(releaseDate) };
      form.setFieldsValue({
        account: (values.account || {}).id,
        agent: (values.agent || {}).id,
        billTo: (values.billTo || {}).id,
        shipper: (values.shipper || {}).id,
        origin: (values.origin || {}).id,
        destination: (values.destination || {}).id,
        ...otherValues,
      });
      form.setFieldsValue(releaseDate);
    }
  }, [props.editItem, form]);

  const getValidDate = (date) => {
    return moment(date, SWIFTPAC_DATETIME_FORMAT);
  };

  const handleSubmit = (e) => {
    form
      .validateFields()
      .then((values) => {
        const {
          account,
          releaseDate,
          origin,
          destination,
          agent,
          billTo,
          shipper,
          ...otherValues
        } = values;

        props.onSubmit({
          account: { id: account },
          origin: { id: origin },
          destination:
            origin !== destination ? { id: destination } : destination,
          agent: agent === account ? agent : { id: agent },
          billTo:
            billTo === account || billTo === agent ? billTo : { id: billTo },
          shipper:
            shipper === account || shipper === agent || shipper === billTo
              ? shipper
              : { id: shipper },
          releaseDate: releaseDate.format(SWIFTPAC_DATETIME_FORMAT),
          ...otherValues,
        });
      })
      .catch((info) => {
        // console.log('Validate Failed:', info)
      });
  };

  const userOptions = ((entities && entities.user) || []).map((r) => (
    <Option key={r.id} value={r.id}>
      {r.username}
    </Option>
  ));

  const branchOptions = ((entities && entities.branch) || []).map((r) => (
    <Option key={r.id} value={r.id}>
      {r.name}
    </Option>
  ));

  // '','','','','GROUND SHIP','AIR ECONOMY CONSOLIDATE','AIR EXPRESS CONSOLIDATE','AIR CARGO CONSOLIDATE','OCEAN CARGO CONSOLIDATE','GROUND CONSOLIDATE'
  const instructions = [
    { id: 1, instruction: 'AIR ECONOMY' },
    { id: 2, instruction: 'AIR EXPRESS' },
    { id: 3, instruction: 'AIR CARGO' },
    { id: 4, instruction: 'OCEAN CARGO' },
  ];

  const instructionsOptions = ((instructions && instructions) || []).map(
    (r) => (
      <Option key={r.id} value={r.instruction}>
        {r.instruction}
      </Option>
    )
  );
  return (
    <>
      <Tabs tabPosition={'left'} defaultActiveKey={defaultTab}>
        <TabPane tab="Summary" key="1">
          <div>
            <Form {...formItemLayout}>
              <Form.Item
                name="warehouseStatus"
                label="Status"
                rules={[
                  {
                    required: true,
                    message: 'Please enter Warehouse Status',
                  },
                ]}
              >
                <Select mode="single">
                  <Option value="ON HAND">ON HAND</Option>
                  <Option value="IN TRANSIT">IN TRANSIT</Option>
                  <Option value="DELIVERED">DELIVERED</Option>
                </Select>
              </Form.Item>

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
                <TextArea rows={2} />
              </Form.Item>

              <Form.Item
                name="comments"
                label="Comments"
                rules={[
                  {
                    required: false,
                    message: 'Please enter comments',
                  },
                ]}
              >
                <TextArea rows={2} />
              </Form.Item>

              <Form.Item
                name="account"
                label="Account"
                rules={[
                  {
                    required: true,
                    message: 'Please enter Account',
                  },
                ]}
              >
                <Select
                  showSearch
                  mode="single"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {userOptions}
                </Select>
              </Form.Item>

              <Form.Item
                name="billTo"
                label="Bill To"
                rules={[
                  {
                    required: true,
                    message: 'Please enter Bill To',
                  },
                ]}
              >
                <Select
                  showSearch
                  mode="single"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {userOptions}
                </Select>
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
                <Select
                  showSearch
                  mode="single"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {userOptions}
                </Select>
              </Form.Item>

              <Form.Item
                name="shipper"
                label="Shipper"
                rules={[
                  {
                    required: true,
                    message: 'Please enter Shipper',
                  },
                ]}
              >
                <Select
                  showSearch
                  mode="single"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {userOptions}
                </Select>
              </Form.Item>
              <Form.Item
                name="origin"
                label="Origin"
                rules={[
                  {
                    required: true,
                    message: 'Please enter Origin',
                  },
                ]}
              >
                <Select
                  showSearch
                  mode="single"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {branchOptions}
                </Select>
              </Form.Item>

              <Form.Item
                name="destination"
                label="Destination"
                rules={[
                  {
                    required: true,
                    message: 'Please enter Destination',
                  },
                ]}
              >
                <Select
                  showSearch
                  mode="single"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {branchOptions}
                </Select>
              </Form.Item>

              <Form.Item
                name="instructions"
                label="Instructions"
                rules={[
                  {
                    required: true,
                    message: 'Please enter Instructions',
                  },
                ]}
              >
                <Select
                  showSearch
                  mode="single"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {instructionsOptions}
                </Select>
              </Form.Item>

              <Form.Item
                name="terms"
                label="Terms"
                rules={[
                  {
                    required: true,
                    message: 'Please enter Terms',
                  },
                ]}
              >
                <Select mode="single">
                  <Option value="COLLECT">COLLECT</Option>
                  <Option value="PREPAID ">PREPAID</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="deliveredBy"
                label="Delivered By"
                rules={[
                  {
                    required: true,
                    message: 'Please enter Delivered By',
                  },
                ]}
              >
                <Input maxLength={256} />
              </Form.Item>

              <Form.Item
                name="_condition"
                label="Condition"
                rules={[
                  {
                    required: true,
                    message: 'Please enter Condition',
                  },
                ]}
              >
                <Select mode="single">
                  <Option value="GOOD">GOOD</Option>
                  <Option value="DAMAGED">DAMAGED </Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="reference"
                label="Reference"
                rules={[
                  {
                    required: true,
                    message: 'Please enter Reference',
                  },
                ]}
              >
                <Input maxLength={256} />
              </Form.Item>

              <Form.Item
                name="po"
                label="Po"
                rules={[
                  {
                    required: false,
                    message: 'Please enter Po',
                  },
                ]}
              >
                <Input maxLength={256} />
              </Form.Item>

              <Form.Item
                name="eei"
                label="Eei"
                rules={[
                  {
                    required: false,
                    message: 'Please enter Eei',
                  },
                ]}
              >
                <Input maxLength={256} />
              </Form.Item>

              <Form.Item
                name="releaseDate"
                label="Release Date"
                rules={[
                  {
                    type: 'object',
                    required: true,
                    message: 'Please enter Release Date',
                  },
                ]}
              >
                <DatePicker format={SWIFTPAC_DATETIME_FORMAT} showTime />
              </Form.Item>
              <Form.Item
                name="value"
                label=" Default Value"
                rules={[
                  {
                    required: true,
                    message: 'Please enter Value',
                  },
                ]}
              >
                <InputNumber min={0} />
              </Form.Item>
              <Form.Item name="insuranceVal" label="Insurance Value">
                <InputNumber min={0} />
              </Form.Item>
              <Row>
                <Col span={12}>
                  <Form.Item
                    className="switch-label"
                    name="hold"
                    label="Hold"
                    valuePropName="checked"
                  >
                    <Switch
                      checkedChildren={<CheckOutlined />}
                      unCheckedChildren={<CloseOutlined />}
                      defaultChecked={false}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="dangerousGoods"
                    label="Dangerous Goods"
                    valuePropName="checked"
                    className="switch-label"
                  >
                    <Switch
                      checkedChildren={<CheckOutlined />}
                      unCheckedChildren={<CloseOutlined />}
                      defaultChecked={false}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={12}>
                  <Form.Item
                    name="fragile"
                    label="Fragile"
                    valuePropName="checked"
                    className="switch-label"
                  >
                    <Switch
                      checkedChildren={<CheckOutlined />}
                      unCheckedChildren={<CloseOutlined />}
                      defaultChecked={false}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="tvProtect"
                    label="Tv Protect"
                    valuePropName="checked"
                    className="switch-label"
                  >
                    <Switch
                      checkedChildren={<CheckOutlined />}
                      unCheckedChildren={<CloseOutlined />}
                      defaultChecked={false}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={12}>
                  <Form.Item
                    name="repackStatus"
                    label="Repack Status"
                    valuePropName="checked"
                    className="switch-label"
                  >
                    <Switch
                      checkedChildren={<CheckOutlined />}
                      unCheckedChildren={<CloseOutlined />}
                      defaultChecked={false}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="insurance"
                    label="Insurance"
                    className="switch-label"
                  >
                    <Switch
                      defaultChecked
                      checkedChildren={<CheckOutlined />}
                      unCheckedChildren={<CloseOutlined />}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
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
          tab="Piece"
          key="2"
        >
          <WarehousePiece {...props}></WarehousePiece>
        </TabPane>

        <TabPane
          disabled={showTabs}
          className="textAlign : left"
          tab="Tracking Event"
          key="3"
        >
          <WarehouseTrackingEvent {...props} />
        </TabPane>

        <TabPane
          disabled={showTabs}
          className="textAlign : left"
          tab="Remarks"
          key="4"
        >
          <WarehouseRemarks {...props} />
        </TabPane>

        <TabPane
          disabled={showTabs}
          className="textAlign : left"
          tab="Ref Doc"
          key="5"
        >
          <WarehouseReferenceDoc {...props} />
        </TabPane>
      </Tabs>
    </>
  );
};

export default Warehouseform;
