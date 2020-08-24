/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { viewEntities } from '../settingsConfig';
import { useSelector, useDispatch } from 'react-redux';
import { loadEntity, loadEntities } from 'actions/data';
import message from 'components/ui-kit/message';
import i18next from 'i18next';
import { SettingOutlined } from '@ant-design/icons';
import { Layout, Menu, Drawer, SubMenu } from 'antd';
import './styles.scss';

export const SettingSection = (props) => {
  const dispatch = new useDispatch();
  const allData = useSelector(({ data }) => data.entities || {});
  const [entityConfig, setEntityConfig] = useState([]);
  const [entity, setEntity] = useState({});

  const [editItem, setEditItem] = useState();
  const { SubMenu } = Menu;
  useEffect(() => {
    const entityConfig = viewEntities(props.currentUser);
    const [firstEntity = {}] = entityConfig || [];

    if (Object.keys(entity).length === 0 && entity.constructor === Object)
      setEntity(firstEntity); //set empty when entity is not already selected
    setEntityConfig(entityConfig);
    if (entityConfig.length > 0 && Object.keys(allData).length === 0) {
      dispatch(loadEntities(entityConfig));
    }
    // if (props.currentUser && entityConfig.length === 0) {
    //   message.info(
    //     "You don't have permissions to view any entity! Please contact your administrator"
    //   );
    // }
  }, [allData, dispatch, props.currentUser]);
  const handleEntityChange = (name) => {
    const entity = entityConfig.find((item) => item.name === name);
    props.onChange(entity);
    if (entity.name === 'country') {
      dispatch(loadEntity(entity));
    }
    setEntity(entity);
  };
  const hasSettingsPermission = () => {
    if (entityConfig.length > 0) return true;
    else return false;
  };

  return (
    <div hidden={!hasSettingsPermission()}>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['settings']}
      >
        <SubMenu
          key="settings"
          title={
            <span>
              <SettingOutlined />
              {i18next.t('admin.settings')}
            </span>
          }
        >
          {entityConfig.map((item) => (
            <Menu.Item
              key={item.name}
              onClick={() => handleEntityChange(item.name)}
            >
              {item.label}
            </Menu.Item>
          ))}
        </SubMenu>
      </Menu>
    </div>
  );
};
export default SettingSection;
