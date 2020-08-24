/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'antd';
import { APP_CONTEXT_URL } from '../../../../utils/constants';
import { useSelector, useDispatch } from 'react-redux';
import { loadEntity } from 'actions/data';
import request from 'service';
import TableComp from 'components/admin/table';

const WarehouseReferenceDoc = (props) => {
  const allData = useSelector(({ data }) => data.entities || {});
  const dispatch = new useDispatch();
  const { warehouse_referencedoc } = allData;

  const [form] = Form.useForm();

  const responseWarehouse = window.$name;

  const [localWarehouseRefDoc, setLocalWarehouseRefDoc] = useState(
    warehouse_referencedoc
  );
  const [entity, setEntity] = useState({});

  useEffect(() => {
    setLocalWarehouseRefDoc(warehouse_referencedoc);
  }, [warehouse_referencedoc]);

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
    labelAlign: 'left',
    name: 'referenceDoc-form',
    form: form,
    contentType: 'multipart/form-data',
  };

  useEffect(() => {
    dispatch(loadEntity(warehouseReferenceDocEntity));
    setEntity(warehouseReferenceDocEntity);
    const values = props.editItem;
    form.resetFields();
    // if (values) {
    //   let { ...otherValues } = values;
    //   form.setFieldsValue({
    //     ...otherValues,
    //   });
    // }
  }, [props.editItem, form]);

  const uploadFileEntity = {
    label: 'Upload File',
    name: 'uploaded_file',
    url:
      APP_CONTEXT_URL +
      '/v1/uploadfile/' +
      responseWarehouse.account.id +
      '/warehouse',
    loadingText: 'Loading File...',
    addingText: 'Adding File...',
    updatingText: 'Updating File...',
    icon: '/static/media/logistics.8f857d2d.svg',
    actions: ['delete'],
  };

  const warehouseReferenceDocEntity = {
    label: 'Reference Doc',
    name: 'warehouse_referencedoc',
    url:
      APP_CONTEXT_URL + '/v1/warehouses/' + responseWarehouse.id + '/refdocs',
    loadingText: 'Loading Reference Doc...',
    addingText: 'Adding Reference Doc...',
    updatingText: 'Updating Reference Doc...',
    icon: '/static/media/logistics.8f857d2d.svg',
    actions: ['delete'],
  };

  const onFileChange = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('file', event.target.files[0]);
    let res = await addEntity(data, uploadFileEntity);
    form
      .validateFields()
      .then(async (values) => {
        var lastId;
        if (localWarehouseRefDoc.length > 0) {
          lastId = localWarehouseRefDoc[localWarehouseRefDoc.length - 1].id;
        } else {
          lastId = 0;
        }
        const { warehouse, ...otherValues } = values;

        let count = lastId;
        const item = {
          id: (count = count + 1),
          link: res,
        };
        setLocalWarehouseRefDoc([...localWarehouseRefDoc, item]);
      })
      .catch((info) => {});
  };

  const handleSubmit = async (e) => {
    let response;
    if (warehouse_referencedoc.length > 0 || localWarehouseRefDoc.length > 0) {
      var lastId;
      if (warehouse_referencedoc.length > 0) {
        lastId = warehouse_referencedoc[warehouse_referencedoc.length - 1].id;
      } else {
        lastId = 0;
      }
      for (var i = 0; i < localWarehouseRefDoc.length; i++) {
        if (localWarehouseRefDoc[i].id > lastId) {
          delete localWarehouseRefDoc[i].id;
          response = await addEntity(
            localWarehouseRefDoc[i],
            warehouseReferenceDocEntity
          );
        }
      }
      dispatch(loadEntity(warehouseReferenceDocEntity));
    }
  };

  const handleItemDelete = (ids) => {
    const lastId = warehouse_referencedoc[warehouse_referencedoc.length - 1].id;
    ids.forEach(async (id) => {
      if (id <= lastId) {
        await request({
          method: 'DELETE',
          url: `${warehouseReferenceDocEntity.url}/${id}/${
            responseWarehouse.account.id
          }/${'warehouse'}`,
          loadingText: `Deleting ${warehouseReferenceDocEntity.name} named "${
            allData[warehouseReferenceDocEntity.name].find(
              (data) => data.id === id
            ).name
          }"`,
        });
        dispatch(loadEntity(warehouseReferenceDocEntity));
      } else {
        setLocalWarehouseRefDoc(
          localWarehouseRefDoc.filter((item) => item.id !== id)
        );
      }
    });
  };

  const addEntity = async (data, entity) => {
    return await request({
      method: 'POST',
      url: entity.url,
      data: data,
      loadingText: entity.addingText,
    });
  };

  return (
    <div>
      <div>
        <Form {...formItemLayout}>
          <Form.Item
            name="description"
            label="Reference Doc"
            rules={[
              {
                required: true,
                message: 'Please enter Description',
              },
            ]}
          >
            <input
              type="file"
              className="form-control"
              name="file"
              onChange={onFileChange}
            />
          </Form.Item>
        </Form>
      </div>

      <div className="item">
        <TableComp
          entity={warehouseReferenceDocEntity}
          data={localWarehouseRefDoc}
          //   onAdd={handleItemAdd}
          //   onEdit={handleItemEdit}
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

export default WarehouseReferenceDoc;
