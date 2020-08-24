/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'antd';
import { loadEntity } from 'actions/data';
import TableComp from '../../table';
import { useSelector, useDispatch } from 'react-redux';
import { APP_CONTEXT_URL } from '../../../../utils/constants';
import TextArea from 'antd/lib/input/TextArea';
import request from 'service';

const WarehouseRemark = (props) => {
  const allData = useSelector(({ data }) => data.entities || {});
  const dispatch = new useDispatch();

  const { warehouse_remark } = allData;
  const [localWarehouseRemarks, setLocalWarehouseRemark] = useState(
    warehouse_remark
  );

  const [entity, setEntity] = useState({});

  const [editItem, setEditItem] = useState([]);
  // const [tempRemarkssList, setTempRemarksList] = useState(warehouse_remark);

  const [form] = Form.useForm();
  form.resetFields();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const responseWarehouse = window.$name;

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
    labelAlign: 'left',
    name: 'warehouseRemark-form',
    form: form,
  };

  const warehouseRemarkEntity = {
    label: 'Remark',
    name: 'warehouse_remark',
    url:
      APP_CONTEXT_URL + '/v1/warehouses/' + responseWarehouse.id + '/remarks',
    loadingText: 'Loading Remarks...',
    addingText: 'Adding Remarks...',
    updatingText: 'Updating Remarks...',
    icon: '/static/media/logistics.8f857d2d.svg',
    actions: ['update', 'delete'],
  };

  useEffect(() => {
    setLocalWarehouseRemark(warehouse_remark);
  }, [warehouse_remark]);

  useEffect(() => {
    dispatch(loadEntity(warehouseRemarkEntity));
    setEntity(warehouseRemarkEntity);
    const values = props.editItem;
    form.resetFields();
    if (values) {
      let { ...otherValues } = values;
      form.setFieldsValue({
        ...otherValues,
      });
    }
  }, [props.editItem, form]);

  const handleItemAdd = () => {
    setEditItem(null);
    setDrawerVisible(true);
  };

  var editedData;
  const handleItemEdit = (item) => {
    editedData = item;
    form.setFieldsValue({
      createdBy: item.createdBy,
      ...item,
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
              ...otherValues,
            };
            response = await updateEntity(val);

            dispatch(loadEntity(warehouseRemarkEntity));
          })
          .catch((info) => {});
      } else {
        form
          .validateFields()
          .then(async (values) => {
            const { warehouse, ...otherValues } = values;
            const val = {
              warehouse: { id: responseWarehouse.id },
              ...otherValues,
            };
            response = await addEntity(val);
            dispatch(loadEntity(warehouseRemarkEntity));
          })
          .catch((info) => {});
      }
    } else {
      if (warehouse_remark.length > 0 || localWarehouseRemarks.length > 0) {
        var lastId;
        if (warehouse_remark.length > 0) {
          lastId = warehouse_remark[warehouse_remark.length - 1].id;
        } else {
          lastId = 0;
        }
        for (var i = 0; i < localWarehouseRemarks.length; i++) {
          if (localWarehouseRemarks[i].id > lastId) {
            delete localWarehouseRemarks[i].id;
            response = await addEntity(localWarehouseRemarks[i]);
          }
        }
        dispatch(loadEntity(warehouseRemarkEntity));
      } else {
        form
          .validateFields()
          .then(async (values) => {
            const { warehouse, ...otherValues } = values;
            const val = {
              warehouse: { id: responseWarehouse.id },
              ...otherValues,
            };
            response = await addEntity(val);
            dispatch(loadEntity(warehouseRemarkEntity));
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
        '/remarks/' +
        editedData.id,
      data: values,
      loadingText: warehouseRemarkEntity.updatingText,
    });
  };

  const addEntity = async (values) => {
    return await request({
      method: 'POST',
      url: warehouseRemarkEntity.url,
      data: values,
      loadingText: warehouseRemarkEntity.addingText,
    });
  };

  const handleItemDelete = (ids) => {
    const lastId = warehouse_remark[warehouse_remark.length - 1].id;
    ids.forEach(async (id) => {
      if (id <= lastId) {
        await request({
          method: 'DELETE',
          url: `${warehouseRemarkEntity.url}/${id}`,
          loadingText: `Deleting ${warehouseRemarkEntity.name} named "${
            allData[warehouseRemarkEntity.name].find((data) => data.id === id)
              .name
          }"`,
        });
        dispatch(loadEntity(warehouseRemarkEntity));
      } else {
        setLocalWarehouseRemark(
          localWarehouseRemarks.filter((item) => item.id !== id)
        );
      }
    });
  };

  const addMoreRemarkHandleSubmit = (e) => {
    form
      .validateFields()
      .then(async (values) => {
        var lastId;
        if (localWarehouseRemarks.length > 0) {
          lastId = localWarehouseRemarks[localWarehouseRemarks.length - 1].id;
        } else {
          lastId = 0;
        }
        const { warehouse, ...otherValues } = values;

        let count = lastId;
        const item = {
          id: (count = count + 1),
          ...otherValues,
        };
        setLocalWarehouseRemark([...localWarehouseRemarks, item]);
      })
      .catch((info) => {});
  };

  return (
    <div>
      <div>
        <Form {...formItemLayout}>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: 'Please enter Description',
              },
            ]}
          >
            <TextArea rows={2} />
          </Form.Item>
        </Form>
      </div>
      <Button
        type="primary"
        key="submit"
        htmlType="submit"
        onClick={addMoreRemarkHandleSubmit}
      >
        Add More Remarks
      </Button>

      <div className="item">
        <TableComp
          entity={warehouseRemarkEntity}
          data={localWarehouseRemarks}
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
export default WarehouseRemark;
