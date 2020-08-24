/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { viewWarehouseEntities } from '../warehouseConfig';
import { useSelector, useDispatch } from 'react-redux';
import { loadEntity, loadEntities } from 'actions/data';
import message from 'components/ui-kit/message';
import i18next from 'i18next';
import { SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import './styles.scss';

export const WarehouseSection = (props) => {
  const dispatch = new useDispatch();
  const allData = useSelector(({ data }) => data.entities || {});
  const [warehouseEntityConfig, setwarehouseEntityConfig] = useState([]);
  const [entity, setwarehouseEntity] = useState({});
  const { SubMenu } = Menu;
  useEffect(() => {
    const warehouseEntityConfig = viewWarehouseEntities(props.currentUser);

    const [firstwarehouseEntity = {}] = warehouseEntityConfig || [];

    if (
      Object.keys(firstwarehouseEntity).length === 0 &&
      entity.constructor === Object
    )
      setwarehouseEntity(firstwarehouseEntity); //set empty when entity is not already selected
    setwarehouseEntityConfig(warehouseEntityConfig);

    if (warehouseEntityConfig.length > 0 && Object.keys(allData).length === 0) {
      dispatch(loadEntities(warehouseEntityConfig));
    }
  }, [allData, dispatch, props.currentUser]);
  const handleWarehouseEntityChange = (name) => {
    const entity = warehouseEntityConfig.find((item) => item.name === name);
    props.onChange(entity);
    dispatch(loadEntity(entity));
    setwarehouseEntity(entity);
  };

  const hasWarehousePermission = () => {
    if (warehouseEntityConfig.length > 0) return true;
    else return false;
  };

  return (
    <div hidden={!hasWarehousePermission()}>
      <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['wrm']}>
        <SubMenu
          key="wrm"
          title={
            <span>
              <SettingOutlined />
              {i18next.t('admin.wrm')}
            </span>
          }
        >
          {warehouseEntityConfig.map((item) => (
            <Menu.Item
              key={item.name}
              onClick={() => handleWarehouseEntityChange(item.name)}
            >
              {item.label}
            </Menu.Item>
          ))}
        </SubMenu>
      </Menu>
    </div>
  );
};
export default WarehouseSection;
