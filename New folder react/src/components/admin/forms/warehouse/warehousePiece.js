/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, Col, Row } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import TableComp from '../../table';
import { useSelector, useDispatch } from 'react-redux';
import { loadEntity, loadEntities } from 'actions/data';
import request from 'service';
import { APP_CONTEXT_URL } from 'utils/constants';

const WarehousePiece = (props) => {
  const allData = useSelector(({ data }) => data.entities || {});
  const dispatch = new useDispatch();

  const { warehouse_piece } = allData;
  const [localWarehousePieces, setLocalWarehousePiece] = useState(
    warehouse_piece
  );
  const [entity, setEntity] = useState({});
  const [editItem, setEditItem] = useState([]);
  const [tempPiecesList, setTempPiecesList] = useState(warehouse_piece);

  const [form] = Form.useForm();
  form.resetFields();

  const responseWarehouse = window.$name;

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
    labelAlign: 'left',
    name: 'warehousePiece-form',
    form: form,
  };

  const warehousePieceEntity = {
    label: 'Piece',
    name: 'warehouse_piece',
    url: APP_CONTEXT_URL + '/v1/warehouses/' + responseWarehouse.id + '/pieces',
    updatingText: 'Updating Piece...',
    icon: '/static/media/logistics.8f857d2d.svg',
    actions: ['update', 'delete'],
  };

  useEffect(() => {
    setLocalWarehousePiece(warehouse_piece);
  }, [warehouse_piece]);

  useEffect(() => {
    dispatch(loadEntity(warehousePieceEntity));
    setEntity(warehousePieceEntity);
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
  };

  var editedData;
  const handleItemEdit = (item) => {
    editedData = item;
    form.setFieldsValue({
      ...item,
    });
  };

  const handleSubmit = async (e) => {
    let response;
    if (editedData) {
      if (editedData.createdBy !== null || editedData.createdBy !== undefined) {
        form
          .validateFields()
          .then(async (values) => {
            const { warehouse, ...otherValues } = values;
            const val = {
              warehouse: { id: responseWarehouse.id },
              ...otherValues,
            };
            response = await updateEntity(val);

            dispatch(loadEntity(warehousePieceEntity));
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
              ...otherValues,
            };
            response = await addEntity(val);
            dispatch(loadEntity(warehousePieceEntity));
          })
          .catch((info) => {});
      }
    } else {
      if (warehouse_piece.length > 0 || localWarehousePieces.length > 0) {
        var lastId;
        if (warehouse_piece.length > 0) {
          lastId = warehouse_piece[warehouse_piece.length - 1].id;
        } else {
          lastId = 0;
        }
        for (var i = 0; i < localWarehousePieces.length; i++) {
          if (localWarehousePieces[i].id > lastId) {
            delete localWarehousePieces[i].id;
            response = await addEntity(localWarehousePieces[i]);
          }
        }
        dispatch(loadEntity(warehousePieceEntity));
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
            dispatch(loadEntity(warehousePieceEntity));
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
        '/pieces/' +
        editedData.id,
      data: values,
      loadingText: warehousePieceEntity.updatingText,
    });
  };

  const addEntity = async (values) => {
    return await request({
      method: 'POST',
      url: warehousePieceEntity.url,
      data: values,
      loadingText: warehousePieceEntity.addingText,
    });
  };

  const handleItemDelete = (ids) => {
    const lastId = warehouse_piece[warehouse_piece.length - 1].id;

    ids.forEach(async (id) => {
      if (id <= lastId) {
        await request({
          method: 'DELETE',
          url: `${warehousePieceEntity.url}/${id}`,
          loadingText: `Deleting ${warehousePieceEntity.name} named "${
            allData[warehousePieceEntity.name].find((data) => data.id === id)
              .name
          }"`,
        });
        dispatch(loadEntity(warehousePieceEntity));
      } else {
        setLocalWarehousePiece(
          localWarehousePieces.filter((item) => item.id !== id)
        );
      }
    });
  };

  const addMorePieceHandleSubmit = (e) => {
    form
      .validateFields()
      .then(async (values) => {
        var lastId = 0;
        if (localWarehousePieces.length > 0) {
          lastId = localWarehousePieces[localWarehousePieces.length - 1].id;
        } else {
          lastId = 0;
        }
        const { warehouse, ...otherValues } = values;

        let count = lastId;
        const item = {
          id: (count = count + 1),
          ...otherValues,
        };
        setLocalWarehousePiece([...localWarehousePieces, item]);
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
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Please enter Name',
              },
            ]}
          >
            <Input maxLength={256} />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <TextArea rows={2} />
          </Form.Item>

          <Form.Item
            name="trackingNumber"
            label="Tracking No"
            rules={[
              {
                required: true,
                message: 'Please enter Tracking Number',
              },
            ]}
          >
            <Input maxLength={256} />
          </Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item
                name="length"
                label="Length"
                className="switch-label"
                rules={[
                  {
                    required: true,
                    message: 'Please enter Length',
                  },
                ]}
              >
                <InputNumber maxLength={256} min={0} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="width"
                label="Width"
                className="switch-label"
                rules={[
                  {
                    required: true,
                    message: 'Please enter Width',
                  },
                ]}
              >
                <InputNumber maxLength={256} min={0} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item
                name="height"
                label="Height"
                className="switch-label"
                rules={[
                  {
                    required: true,
                    message: 'Please enter Height',
                  },
                ]}
              >
                <InputNumber maxLength={256} min={0} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="weight"
                label="Weight"
                className="switch-label"
                rules={[
                  {
                    required: true,
                    message: 'Please enter Weight',
                  },
                ]}
              >
                <InputNumber maxLength={256} min={0} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="declaredValue"
            label="Declared Value"
            className="switch-label"
            rules={[
              {
                required: true,
                message: 'Please enter Declared Value',
              },
            ]}
          >
            <InputNumber maxLength={256} min={0} />
          </Form.Item>
        </Form>
      </div>

      <Button
        type="primary"
        key="submit"
        htmlType="submit"
        onClick={addMorePieceHandleSubmit}
      >
        Add More Piece
      </Button>

      <div className="item">
        <TableComp
          entity={warehousePieceEntity}
          data={localWarehousePieces}
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

export default WarehousePiece;
