import React from 'react';
import CountryForm from './settings/countryform';
import UserForm from './user/userform';
import RoleForm from './settings/roleform';
import BranchForm from './settings/branchform';
import ClassificationForm from './settings/classificationform';
import CommodityForm from './settings/commodityform';
import CurrencyForm from './settings/currencyform';
import MeasureTypeForm from './settings/measuretypeform';
import PackageTypeForm from './settings/packagetypeform';
import PaymentTypeForm from './settings/paymenttypeform';
import PermissionForm from './settings/permissionform';
import ZoneForm from './settings/zoneform';
import ServiceTypeForm from './settings/servicetypeform';
import AdditonalServiceForm from './settings/additonalserviceform';
import GLChartOfAccountsForm from './settings/glchartofaccountsform';
import PortForm from './settings/portform';
import WarehouseForm from './warehouse/warehouseform';
import request from 'service';
import { useSelector } from 'react-redux';

const FormComp = (props) => {
  const entities = useSelector(({ data }) => data.entities || {});
  const addEntity = async (values) => {
    const { entity } = props;

    return await request({
      method: 'POST',
      url: entity.url,
      data: values,
      loadingText: entity.addingText,
    });
  };

  const updateEntity = async (values) => {
    const { entity, editItem } = props;
    return await request({
      method: 'PUT',
      url: entity.url,
      data: { ...values, id: editItem.id },
      loadingText: entity.updatingText,
    });
  };

  const handleFormSubmit = async (values) => {
    const { editItem } = props;
    let response;
    if (editItem) {
      response = await updateEntity(values);
    } else {
      response = await addEntity(values);
    }
    if (response && !response.response) {
      //service successfull then proceed
      window.$name = response;
      window.$check = '';
      props.onSubmit && props.onSubmit(response);
    }
  };

  const RenderForm = () => {
    const entityName = props.entity.name;
    const formProps = {
      editItem: props.editItem,
      onCancel: props.onCancel,
      onSubmit: handleFormSubmit,
      entities: entities,
    };
    switch (entityName) {
      case 'country':
        return <CountryForm {...formProps} />;
      case 'user':
        return <UserForm {...formProps} />;
      case 'role':
        return <RoleForm {...formProps} />;
      case 'branch':
        return <BranchForm {...formProps} />;
      case 'classification':
        return <ClassificationForm {...formProps} />;
      case 'commodity':
        return <CommodityForm {...formProps} />;
      case 'currency':
        return <CurrencyForm {...formProps} />;
      case 'measuretype':
        return <MeasureTypeForm {...formProps} />;
      case 'packagetype':
        return <PackageTypeForm {...formProps} />;
      case 'paymenttype':
        return <PaymentTypeForm {...formProps} />;
      case 'permission':
        return <PermissionForm {...formProps} />;
      case 'zone':
        return <ZoneForm {...formProps} />;
      case 'servicetype':
        return <ServiceTypeForm {...formProps} />;
      case 'additionalservice':
        return <AdditonalServiceForm {...formProps} />;
      case 'port':
        return <PortForm {...formProps} />;
      case 'glchartofaccounts':
        return <GLChartOfAccountsForm {...formProps} />;
      case 'warehouse':
        return <WarehouseForm {...formProps} />;

      default:
        return <h5>Render Form Here!</h5>;
    }
  };

  return <div>{RenderForm()}</div>;
};

export default FormComp;
