/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Table, Button, Tag } from 'antd';
import { startCase } from 'lodash';
import { baseAttribs, baseAttribsWarehouse } from '../config';

import './styles.scss';

const TableComp = (props) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [tableData, setTableData] = useState([]);

  const onDelete = () => {
    try {
      props.onDelete && props.onDelete(selectedRows);
      setSelectedRows([]);
    } catch (e) {}
  };

  const onEdit = () => {
    try {
      const itemToEdit = getItemById(selectedRows[0]);
      props.onEdit && props.onEdit(itemToEdit);
    } catch (e) {}
  };

  const getItemById = (id) => {
    return (props.data || []).find((item) => item.id === id);
  };

  const filterColumnData = (d) => {
    if ('active' in d) {
      if (d['active'] === 0) d['active'] = 'false';
      else if (d['active'] === 1) d['active'] = 'true';
    } else if ('fragile' in d) {
      if (d['fragile'] === false) d['fragile'] = 'false';
      else if (d['fragile'] === true) d['fragile'] = 'true';
    }
    if ('dangerousGoods' in d) {
      if (d['dangerousGoods'] === false) d['dangerousGoods'] = 'false';
      else if (d['dangerousGoods'] === true) d['dangerousGoods'] = 'true';
    }
    if ('hold' in d) {
      if (d['hold'] === false) d['hold'] = 'false';
      else if (d['hold'] === true) d['hold'] = 'true';
    }
    if ('insurance' in d) {
      if (d['insurance'] === false) d['insurance'] = 'false';
      else if (d['insurance'] === true) d['insurance'] = 'true';
    }
    if ('tvProtect' in d) {
      if (d['tvProtect'] === false) d['tvProtect'] = 'false';
      else if (d['tvProtect'] === true) d['tvProtect'] = 'true';
    }
    if ('repackStatus' in d) {
      if (d['repackStatus'] === false) d['repackStatus'] = 'false';
      else if (d['repackStatus'] === true) d['repackStatus'] = 'true';
    }
    if ('repackStatus' in d) {
      if (d['repackStatus'] === false) d['repackStatus'] = 'false';
      else if (d['repackStatus'] === true) d['repackStatus'] = 'true';
    }
    if ('enabled' in d) {
      if (d['enabled'] === false) d['enabled'] = 'false';
      else if (d['enabled'] === true) d['enabled'] = 'true';
    }

    if ('autoRenew' in d) {
      if (d['autoRenew'] === false) d['autoRenew'] = 'false';
      else if (d['autoRenew'] === true) d['autoRenew'] = 'true';
    }
  };

  useEffect(() => {
    setSelectedRows([]);
    if (props.data && Array.isArray(props.data)) {
      let firstRow = {};
      firstRow = props.data.slice().pop() || {};
      let cols = Object.keys(firstRow)
        .filter((key) =>
          props.entity.name === 'warehouse'
            ? baseAttribsWarehouse.indexOf(key) === -1
            : baseAttribs.indexOf(key) === -1
        )
        .filter((key) => key !== 'password')
        .map((key) => {
          if (Array.isArray(firstRow[key])) {
            return {
              title: startCase(key),
              dataIndex: key,
              key: key,
              width: 150,
              render: (tags) => (
                <>
                  {tags.map((tag) => (
                    <Tag color="blue" key={tag}>
                      {tag.name ? tag.name : tag.description}
                      {tag.addressLine1 ? tag.addressLine1 : tag.trackingStatus}
                    </Tag>
                  ))}
                </>
              ),
            };
          }
          return {
            title: startCase(key),
            dataIndex: key,
            key: key,
            width: 150,
          };
        });
      setColumns(cols);
      const tableData = (props.data || []).map((d, i) => {
        let objVals = Object.keys(d).reduce((combinedObj, currentKey) => {
          combinedObj =
            combinedObj instanceof Object && Object.keys(combinedObj).length > 0
              ? combinedObj
              : {};
          let currentVal = d[currentKey];
          if (currentVal instanceof Object && !Array.isArray(currentVal)) {
            combinedObj = {
              [currentKey]: currentVal.id,
              [currentKey]: currentVal.username
                ? currentVal.username
                : currentVal.name,
              ...combinedObj,
            };
          }
          return combinedObj || {};
        });
        filterColumnData(d);
        return { ...d, ...objVals, key: d.id + i };
      });
      setTableData(tableData);
    }
  }, [props.entity, props.data]);

  const onRowSelectedChange = (keys) => {
    setSelectedRows(keys);
  };

  const renderTitle = () => {
    const { actions = [], label } = props.entity;
    return (
      <header className="table-header">
        <h4>{label}</h4>
        <div className="table_actions">
          {actions.includes('add') && (
            <Button type="primary" onClick={props.onAdd}>
              Add
            </Button>
          )}

          {actions.includes('update') && (
            <Button
              type="primary"
              style={{ marginLeft: '10px' }}
              disabled={selectedRows.length !== 1}
              onClick={onEdit}
            >
              Edit
            </Button>
          )}
          {actions.includes('delete') && (
            <Button
              type="danger"
              style={{ marginLeft: '10px' }}
              disabled={selectedRows.length < 1}
              onClick={onDelete}
            >
              Delete
            </Button>
          )}
        </div>
      </header>
    );
  };

  return (
    <Table
      rowSelection={
        tableData.length > 0 &&
        (props.entity.actions.includes('add') ||
          props.entity.actions.includes('update') ||
          props.entity.actions.includes('delete'))
          ? {
              onChange: onRowSelectedChange,
              selectedRowKeys: selectedRows,
            }
          : null
      }
      rowKey={'id'}
      dataSource={tableData}
      columns={columns}
      className="admin-table-container"
      scroll={{ x: 'calc(690px + 50%)', y: 'calc(100vh - 360px)' }}
      title={renderTitle}
      bordered={true}
    />
  );
};

export default TableComp;
