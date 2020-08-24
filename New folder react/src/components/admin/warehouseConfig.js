import {
  loaders,
  sortEntities,
  getUserPermissions,
  getEntityActions,
} from './config';
import i18next from '../../utils/i18n';
import Icon from './images/logistics.svg';
import { APP_CONTEXT_URL } from 'utils/constants';

export const warehouseEntityConfig = [
  {
    label: i18next.t('admin.warehouse'),
    name: 'warehouse',
    url: APP_CONTEXT_URL + '/v1/warehouses',
    ...loaders('warehouse'),
    icon: Icon,
  },
];
export const viewWarehouseEntities = (currentUser) => {
  if (currentUser) {
    const permissions = getUserPermissions(currentUser);
    const viewWarehouseEntities = warehouseEntityConfig.filter(
      (e) => permissions.indexOf(`view_${e.name}`) > -1
    );
    const viewWarehouseEntities_withActions = viewWarehouseEntities.map((e) => {
      return {
        ...e,
        actions: getEntityActions(e, permissions),
      };
    });
    return sortEntities(viewWarehouseEntities_withActions);
  } else {
    return [];
  }
};
