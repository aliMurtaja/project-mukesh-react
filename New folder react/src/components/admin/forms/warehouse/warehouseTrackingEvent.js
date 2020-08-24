/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Button,
  DatePicker,
  TimePicker,
  Row,
  Col,
} from 'antd';
import moment from 'moment';
import TextArea from 'antd/lib/input/TextArea';
import TableComp from '../../table';
import {
  SWIFTPAC_DATE_FORMAT,
  SWIFTPAC_TIME_FORMAT,
  SWIFTPAC_DATETIME_FORMAT,
  APP_CONTEXT_URL,
} from './../../../../utils/constants';
import { useSelector, useDispatch } from 'react-redux';
import { loadEntity, loadEntities } from 'actions/data';
import request from 'service';

const WarehouseTrackingEvent = (props) => {
  const allData = useSelector(({ data }) => data.entities || {});
  const dispatch = new useDispatch();

  const { warehouse_trackingevent } = allData;
  const [
    localWarehouseTrackingEvent,
    setLocalWarehouseTrackingEvent,
  ] = useState(warehouse_trackingevent);

  const [entity, setEntity] = useState({});
  const [form] = Form.useForm();
  form.resetFields();

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editItem, setEditItem] = useState();
  const responseWarehouse = window.$name;

  const [checkTempData, setCheckTempData] = useState(false);

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
    labelAlign: 'left',
    name: 'warehouseTrackingEvent-form',
    form: form,
  };

  const warehouseTrackingEventEntity = {
    label: 'TrackingEvent',
    name: 'warehouse_trackingevent',
    url:
      APP_CONTEXT_URL +
      '/v1/warehouses/' +
      responseWarehouse.id +
      '/trackingevents',
    loadingText: 'Loading TrackingEvents...',
    addingText: 'Adding Tracking Event...',
    updatingText: 'Updating Tracking Event...',
    icon: '/static/media/logistics.8f857d2d.svg',
    actions: ['update', 'delete'],
  };

  useEffect(() => {
    setLocalWarehouseTrackingEvent(warehouse_trackingevent);
  }, [warehouse_trackingevent]);

  useEffect(() => {
    dispatch(loadEntity(warehouseTrackingEventEntity));
    setEntity(warehouseTrackingEventEntity);

    const values = props.editItem;
    form.resetFields();
    if (values) {
      let { trackingDate, ...otherValues } = values;
      trackingDate = { trackingDate: getValidDate(trackingDate) };
      form.setFieldsValue({
        ...otherValues,
      });
      form.setFieldsValue(trackingDate);
    }
  }, [props.editItem, form]);

  const getValidDate = (date) => {
    return moment(date, SWIFTPAC_DATE_FORMAT);
  };

  const handleItemAdd = () => {
    setEditItem(null);
    setDrawerVisible(true);
  };

  var editedData;
  const handleItemEdit = (item) => {
    editedData = {
      id: item.id,
      remarks: item.remarks,
      location: item.location,
      trackingStatus: item.trackingStatus,
      trackingDate: moment(item.trackingDate, SWIFTPAC_DATE_FORMAT),
      trackingTime: moment(item.trackingTime, SWIFTPAC_TIME_FORMAT),
      createdBy: item.createdBy,
    };
    form.setFieldsValue({
      ...editedData,
    });
  };

  const handleSubmit = async (e) => {
    let response;

    if (editedData) {
      if (editedData.createdBy !== undefined) {
        form
          .validateFields()
          .then(async (values) => {
            const { warehouse, ...otherValues } = values;
            const val = {
              warehouse: { id: responseWarehouse.id },
              trackingDate: values.trackingDate.format(SWIFTPAC_DATE_FORMAT),
              trackingStatus: values.trackingStatus,
              location: values.location,
              remarks: values.remarks,
              trackingTime: values.trackingTime.format(SWIFTPAC_TIME_FORMAT),
            };
            response = await updateEntity(val);

            dispatch(loadEntity(warehouseTrackingEventEntity));
          })
          .catch((info) => {
            // console.log('Validate Failed:', info)
          });
      } else {
        form
          .validateFields()
          .then(async (values) => {
            const { warehouse, ...otherValues } = values;
            const val = {
              warehouse: { id: responseWarehouse.id },
              trackingDate: values.trackingDate.format(SWIFTPAC_DATE_FORMAT),
              trackingStatus: values.trackingStatus,
              location: values.location,
              remarks: values.remarks,
              trackingTime: values.trackingTime.format(SWIFTPAC_TIME_FORMAT),
            };
            response = await addEntity(val);
            dispatch(loadEntity(warehouseTrackingEventEntity));
          })
          .catch((info) => {});
      }
    } else {
      if (checkTempData === true) {
        var lastId;
        if (warehouse_trackingevent.length > 0) {
          lastId =
            warehouse_trackingevent[warehouse_trackingevent.length - 1].id;
        } else {
          lastId = 0;
        }

        for (var i = 0; i < localWarehouseTrackingEvent.length; i++) {
          if (localWarehouseTrackingEvent[i].id > lastId) {
            delete localWarehouseTrackingEvent[i].id;
            const val = {
              warehouse: { id: responseWarehouse.id },
              trackingDate: localWarehouseTrackingEvent[i].trackingDate,
              trackingStatus: localWarehouseTrackingEvent[i].trackingStatus,
              location: localWarehouseTrackingEvent[i].location,
              remarks: localWarehouseTrackingEvent[i].remarks,
              trackingTime: localWarehouseTrackingEvent[i].trackingTime,
            };
            response = await addEntity(val);
          }
        }
        dispatch(loadEntity(warehouseTrackingEventEntity));
      } else {
        form
          .validateFields()
          .then(async (values) => {
            const { warehouse, ...otherValues } = values;
            const val = {
              warehouse: { id: responseWarehouse.id },
              trackingDate: values.trackingDate.format(SWIFTPAC_DATE_FORMAT),
              trackingStatus: values.trackingStatus,
              location: values.location,
              remarks: values.remarks,
              trackingTime: values.trackingTime.format(SWIFTPAC_TIME_FORMAT),
            };
            response = await addEntity(val);
            dispatch(loadEntity(warehouseTrackingEventEntity));
          })
          .catch((info) => {});
      }
    }
  };

  const updateEntity = async (values) => {
    return await request({
      method: 'PUT',
      url:
        APP_CONTEXT_URL +
        '/v1/warehouses/' +
        responseWarehouse.id +
        '/trackingevents/' +
        editedData.id,
      data: values,
      loadingText: warehouseTrackingEventEntity.updatingText,
    });
  };

  const addEntity = async (values) => {
    return await request({
      method: 'POST',
      url: warehouseTrackingEventEntity.url,
      data: values,
      loadingText: warehouseTrackingEventEntity.addingText,
    });
  };

  const handleItemDelete = (ids) => {
    const lastId =
      warehouse_trackingevent[warehouse_trackingevent.length - 1].id;
    ids.forEach(async (id) => {
      if (id <= lastId) {
        await request({
          method: 'DELETE',
          url: `${warehouseTrackingEventEntity.url}/${id}`,
          loadingText: `Deleting ${warehouseTrackingEventEntity.name} named "${
            allData[warehouseTrackingEventEntity.name].find(
              (data) => data.id === id
            ).name
          }"`,
        });
        dispatch(loadEntity(warehouseTrackingEventEntity));
      } else {
        setLocalWarehouseTrackingEvent(
          localWarehouseTrackingEvent.filter((item) => item.id !== id)
        );
      }
    });
  };

  const addMoreTrackingHandleSubmit = (e) => {
    form
      .validateFields()
      .then(async (values) => {
        var lastId;
        if (localWarehouseTrackingEvent > 0) {
          lastId =
            localWarehouseTrackingEvent[localWarehouseTrackingEvent.length - 1]
              .id;
        } else {
          lastId = 0;
        }
        const { warehouse, ...otherValues } = values;

        let count = lastId;
        const item = {
          id: (count = count + 1),
          trackingDate: values.trackingDate.format(SWIFTPAC_DATE_FORMAT),
          trackingStatus: values.trackingStatus,
          location: values.location,
          remarks: values.remarks,
          trackingTime: values.trackingTime.format(SWIFTPAC_TIME_FORMAT),
        };

        setLocalWarehouseTrackingEvent([...localWarehouseTrackingEvent, item]);
        setCheckTempData(true);
      })
      .catch((info) => {
        // console.log('Validate Failed:', info)
      });
  };

  return (
    <div>
      <div>
        <Form {...formItemLayout}>
          <Form.Item
            name="trackingStatus"
            label="Status"
            rules={[
              {
                required: true,
                message: 'Please enter Status',
              },
            ]}
          >
            <Input maxLength={256} />
          </Form.Item>

          <Form.Item
            name="remarks"
            label="Remarks"
            rules={[
              {
                required: true,
                message: 'Please enter Remarks',
              },
            ]}
          >
            <TextArea rows={2} />
          </Form.Item>
          <Form.Item
            name="location"
            label="Location"
            rules={[
              {
                required: true,
                message: 'Please enter Location',
              },
            ]}
          >
            <Input maxLength={50} min={0} />
          </Form.Item>

          <Form.Item
            className="switch-label"
            name="trackingDate"
            label="Tracking Date"
            rules={[
              {
                type: 'object',
                required: true,
                message: 'Please enter Tracking Date',
              },
            ]}
          >
            <DatePicker format={SWIFTPAC_DATE_FORMAT} />
          </Form.Item>

          <Form.Item
            className="switch-label"
            name="trackingTime"
            label="Tracking Time"
            rules={[
              {
                type: 'object',
                required: true,
                message: 'Please enter Tracking Time',
              },
            ]}
          >
            <TimePicker format={SWIFTPAC_TIME_FORMAT} />
          </Form.Item>
        </Form>
      </div>
      <Button
        type="primary"
        key="submit"
        htmlType="submit"
        onClick={addMoreTrackingHandleSubmit}
      >
        Add More Tracking Events
      </Button>

      <div className="item">
        <TableComp
          entity={warehouseTrackingEventEntity}
          data={localWarehouseTrackingEvent}
          onAdd={handleItemAdd}
          onEdit={handleItemEdit}
          onDelete={handleItemDelete}
        />
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
    </div>
  );
};
export default WarehouseTrackingEvent;
