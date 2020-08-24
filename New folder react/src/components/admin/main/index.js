/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import WarehouseSection from './warehouseSection';

// import PrealertSection from './prealertSection'; 

import SettingSection from './settingSection';
import { Layout, Drawer } from 'antd';
import TableComp from '../table';
import FormComp from '../forms/index';
import { useSelector, useDispatch } from 'react-redux';
import { loadEntity } from 'actions/data';
import './styles.scss';
import request from 'service';

const TabsComp = (props) => {
  const dispatch = new useDispatch();
  const allData = useSelector(({ data }) => data.entities || {});
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editItem, setEditItem] = useState();
  const [entity, setEntity] = useState({});
  const { Sider, Content } = Layout;

  const handleItemEdit = (item) => {
    setEditItem(item);
    setDrawerVisible(true);
  };

  useEffect(() => { }, [allData, dispatch, props.currentUser]);

  const handleItemDelete = (ids) => {
    ids.forEach(async (id) => {
      await request({
        method: 'DELETE',
        url: `${entity.url}/${id}`,
        loadingText: `Deleting ${entity.name} named "${
          allData[entity.name].find((data) => data.id === id).name
          }"`,
      });
      dispatch(loadEntity(entity));
    });
  };

  const onFormSubmit = (e) => {
    dispatch(loadEntity(entity));
    setDrawerVisible(false);
  };

  const handleItemAdd = () => {
    setEditItem(null);
    setDrawerVisible(true);
    window.$check = undefined;
  };

  return (
    <Layout>
      <Drawer
        title={entity.label}
        width={750}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <FormComp
          editItem={editItem}
          entity={entity}
          onCancel={() => setDrawerVisible(false)}
          onSubmit={onFormSubmit}
        />
      </Drawer>
      <Sider
        style={{
          overflow: 'auto',
          width: 200,
          maxHeight: '74vh',
        }}
      >
        <WarehouseSection {...props} onChange={(value) => setEntity(value)} />
        <SettingSection {...props} onChange={(value) => setEntity(value)} />
      </Sider>
      <Content
        style={{
          overflow: 'auto',
          height: '74vh',
        }}
      >
        <TableComp
          entity={entity}
          data={allData[entity.name]}
          onEdit={handleItemEdit}
          onDelete={handleItemDelete}
          onAdd={handleItemAdd}
        />
      </Content>
    </Layout>
  );
};
export default TabsComp;
