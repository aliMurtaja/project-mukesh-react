import {
  loaders,
  sortEntities,
  getUserPermissions,
  getEntityActions,
} from './config';
import i18next from '../../utils/i18n';
import Icon from './images/logistics.svg';
import { APP_CONTEXT_URL } from 'utils/constants';

export const entityConfig = [
  {
    label: i18next.t('admin.country'),
    name: 'country',
    url: APP_CONTEXT_URL + '/v1/countries',
    ...loaders('country'),
    icon: Icon,
  },
  {
    label: i18next.t('admin.port'),
    name: 'port',
    url: APP_CONTEXT_URL + '/v1/ports',
    ...loaders('port'),
    icon: Icon,
  },
  {
    label: i18next.t('admin.branch'),
    name: 'branch',
    url: APP_CONTEXT_URL + '/v1/branches',
    ...loaders('branch'),
    icon: Icon,
  },
  {
    label: i18next.t('admin.zone'),
    name: 'zone',
    url: APP_CONTEXT_URL + '/v1/zones',
    ...loaders('zone'),
    icon: Icon,
  },
  {
    label: i18next.t('admin.user'),
    name: 'user',
    url: APP_CONTEXT_URL + '/v1/users',
    ...loaders('user'),
    icon: Icon,
  },
  {
    label: i18next.t('admin.role'),
    name: 'role',
    url: APP_CONTEXT_URL + '/v1/roles',
    ...loaders('role'),
    icon: Icon,
  },
  {
    label: i18next.t('admin.permission'),
    name: 'permission',
    url: APP_CONTEXT_URL + '/v1/permissions',
    ...loaders('permission'),
    icon: Icon,
  },
  {
    label: i18next.t('admin.currency'),
    name: 'currency',
    url: APP_CONTEXT_URL + '/v1/currencies',
    ...loaders('currency'),
    icon: Icon,
  },
  {
    label: i18next.t('admin.classification'),
    name: 'classification',
    url: APP_CONTEXT_URL + '/v1/classifications',
    ...loaders('classification'),
    icon: Icon,
  },
  {
    label: i18next.t('admin.commodity'),
    name: 'commodity',
    url: APP_CONTEXT_URL + '/v1/commodities',
    ...loaders('commodity'),
    icon: Icon,
  },
  {
    label: i18next.t('admin.measuretype'),
    name: 'measuretype',
    url: APP_CONTEXT_URL + '/v1/measuretypes',
    ...loaders('measuretype'),
    icon: Icon,
  },
  {
    label: i18next.t('admin.packagetype'),
    name: 'packagetype',
    url: APP_CONTEXT_URL + '/v1/packagetypes',
    ...loaders('packagetype'),
    icon: Icon,
  },
  {
    label: i18next.t('admin.paymenttype'),
    name: 'paymenttype',
    url: APP_CONTEXT_URL + '/v1/paymenttypes',
    ...loaders('paymenttype'),
    icon: Icon,
  },
  {
    label: i18next.t('admin.servicetype'),
    name: 'servicetype',
    url: APP_CONTEXT_URL + '/v1/servicetypes',
    ...loaders('servicetype'),
    icon: Icon,
  },
  {
    label: i18next.t('admin.additionalservice'),
    name: 'additionalservice',
    url: APP_CONTEXT_URL + '/v1/additionalservice',
    ...loaders('additionalservice'),
    icon: Icon,
  },
  {
    label: i18next.t('admin.glchartofaccounts'),
    name: 'glchartofaccounts',
    url: APP_CONTEXT_URL + '/v1/glchartofaccounts',
    ...loaders('glchartofaccounts'),
    icon: Icon,
  },
];
export const viewEntities = (currentUser) => {
  if (currentUser) {
    const permissions = getUserPermissions(currentUser);
    const viewEntities = entityConfig.filter(
      (e) => permissions.indexOf(`view_${e.name}`) > -1
    );

    const viewEntities_withActions = viewEntities.map((e) => {
      return {
        ...e,
        actions: getEntityActions(e, permissions),
      };
    });
    return sortEntities(viewEntities_withActions);
  } else {
    return [];
  }
};
export default entityConfig;
