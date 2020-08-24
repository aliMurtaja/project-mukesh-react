import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';

export const PrealertSection = (props) => {
    const dispatch = new useDispatch();

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


}