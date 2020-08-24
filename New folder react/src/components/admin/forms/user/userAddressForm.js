/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { countryActiveEntity } from '../../../../service/common_services';
import { Form, Button, Input, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { dispatch } from 'store';
import { APP_CONTEXT_URL } from '../../../../utils/constants';
import { loadEntity } from 'actions/data';
import TableComp from '../../table';
import request from 'service';

const { Option } = Select;

const UserAddressForm = (props) => {
  const allData = useSelector(({ data }) => data.entities || {});
  const dispatch = new useDispatch();

  const { address } = allData;
  const [localUserAddress, setLocalUserAddress] = useState(address);
  const [form] = Form.useForm();
  form.resetFields();
  const { entities } = props;

  const [checkTempData, setCheckTempData] = useState(false);
  //   const [editItem, setEditItem] = useState([]);

  const responseUser = window.$name;
  const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 19 },
    labelAlign: 'left',
    name: 'user-Address-form',
    form: form,
  };

  useEffect(() => {
    dispatch(loadEntity(countryActiveEntity));
    setLocalUserAddress(address);
  }, [address]);

  useEffect(() => {
    dispatch(loadEntity(addressEntity));
    // setEntity(addressEntity);
    const values = props.editItem;
    form.resetFields();
    values &&
      form.setFieldsValue({
        country: (values.country || {}).id,
        ...values,
      });
  }, [props.editItem]);

  const addressEntity = {
    label: 'Address',
    name: 'address',
    url: APP_CONTEXT_URL + '/v1/users/' + responseUser.id + '/addresses',
    loadingText: 'Loading Address...',
    addingText: 'Adding Address...',
    updatingText: 'Updating Address...',
    icon: '/static/media/logistics.8f857d2d.svg',
    actions: ['update', 'delete'],
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
    if (editedData !== undefined) {
      if (editedData.createdBy !== undefined) {
        form
          .validateFields()
          .then(async (values) => {
            const { ...otherValues } = values;
            const val = {
              user: { id: responseUser.id },
              ...otherValues,
            };
            response = await updateEntity(val);

            dispatch(loadEntity(addressEntity));
          })
          .catch((info) => {});
      } else {
        form
          .validateFields()
          .then(async (values) => {
            const { ...otherValues } = values;
            const val = {
              ...otherValues,
            };
            response = await addEntity(val);
            dispatch(loadEntity(addressEntity));
          })
          .catch((info) => {});
      }
    } else {
      if (checkTempData === true) {
        var lastId;
        if (address.length > 0) {
          lastId = address[address.length - 1].id;
        } else {
          lastId = 0;
        }
        for (var i = 0; i < localUserAddress.length; i++) {
          if (localUserAddress[i].id > lastId) {
            delete localUserAddress[i].id;
            response = await addEntity(localUserAddress[i]);
          }
        }
        dispatch(loadEntity(addressEntity));
      } else {
        form
          .validateFields()
          .then(async (values) => {
            const { user, ...otherValues } = values;
            const val = {
              //   user: { id: responseUser.id },
              ...otherValues,
            };
            response = await addEntity(val);
            dispatch(loadEntity(addressEntity));
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
        '/v1/users/' +
        responseUser.id +
        '/addresses/' +
        editedData.id,
      data: values,
      loadingText: addressEntity.updatingText,
    });
  };

  const addEntity = async (values) => {
    return await request({
      method: 'POST',
      url: addressEntity.url,
      data: values,
      loadingText: addressEntity.addingText,
    });
  };

  const handleItemDelete = (ids) => {
    const lastId = address[address.length - 1].id;
    ids.forEach(async (id) => {
      if (id <= lastId) {
        await request({
          method: 'DELETE',
          url: `${addressEntity.url}/${id}`,
          loadingText: `Deleting ${addressEntity.name} named "${
            allData[addressEntity.name].find((data) => data.id === id).name
          }"`,
        });
        dispatch(loadEntity(addressEntity));
      } else {
        setLocalUserAddress(localUserAddress.filter((item) => item.id !== id));
      }
    });
  };

  const addMoreAddressesHandleSubmit = (e) => {
    form
      .validateFields()
      .then(async (values) => {
        var lastId;
        if (localUserAddress.length > 0) {
          lastId = localUserAddress[localUserAddress.length - 1].id;
        } else {
          lastId = 0;
        }
        const { ...otherValues } = values;

        let count = lastId;
        const item = {
          id: (count = count + 1),
          ...otherValues,
        };

        setLocalUserAddress([...localUserAddress, item]);
        setCheckTempData(true);
      })
      .catch((info) => {});
  };

  const countryOptions = ((entities && entities.active_countries) || []).map(
    (c) => (
      <Option key={c.id} value={c.id}>
        {c.name}
      </Option>
    )
  );

  return (
    <div>
      <div>
        <Form {...formItemLayout}>
          <Form.Item
            name="addressLine1"
            label="Address 1"
            rules={[
              {
                required: true,
                message: 'Please Enter Address 1',
              },
            ]}
          >
            <Input maxLength={512} />
          </Form.Item>

          <Form.Item
            name="addressLine2"
            label="Address 2"
            rules={[
              {
                required: true,
                message: 'Please Enter Address 2',
              },
            ]}
          >
            <Input maxLength={512} />
          </Form.Item>

          <Form.Item
            name="city"
            label="City"
            rules={[
              {
                required: true,
                message: 'Please Enter City',
              },
            ]}
          >
            <Input maxLength={256} />
          </Form.Item>

          <Form.Item
            name="state"
            label="State"
            rules={[
              {
                required: true,
                message: 'Please Enter State',
              },
            ]}
          >
            <Input maxLength={256} />
          </Form.Item>

          <Form.Item
            name="zip"
            label="Zip"
            rules={[
              {
                required: true,
                message: 'Please Enter Zip',
              },
            ]}
          >
            <Input maxLength={8} />
          </Form.Item>

          <Form.Item
            name="country_id"
            rules={[
              {
                required: true,
                message: 'Please input Country',
              },
            ]}
            label="Country"
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
        </Form>
      </div>

      <Button
        type="primary"
        key="submit"
        htmlType="submit"
        onClick={addMoreAddressesHandleSubmit}
      >
        Add More Addresses
      </Button>

      <div className="item">
        <TableComp
          entity={addressEntity}
          data={localUserAddress}
          //   onAdd={handleItemAdd}
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
export default UserAddressForm;
