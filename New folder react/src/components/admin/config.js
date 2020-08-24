import i18next from '../../utils/i18n';
import Icon from './images/logistics.svg';

export const loaders = (entity) => {
  return {
    loadingText: `${
      i18next.t(`loading`) + ` ` + i18next.t(`all ${entity}`)
    }...`,
    addingText: `${i18next.t(`adding`) + ` ` + i18next.t(` ${entity}`)}...`,
    updatingText: `${i18next.t(`updating`) + ` ` + i18next.t(` ${entity}`)}...`,
  };
};

export const baseAttribs = [
  'id',
  'createdBy',
  'creationDate',
  'lastModifiedBy',
  'lastModifiedDate',
];
export const baseAttribsWarehouse = [
  'createdBy',
  'creationDate',
  'lastModifiedBy',
  'lastModifiedDate',
];
export const sortEntities = (entities) => {
  return entities.sort((a, b) => {
    let comparison = 0;
    if (a.name > b.name) {
      comparison = 1;
    } else if (a.name < b.name) {
      comparison = -1;
    }
    return comparison;
  });
};

export const getEntityActions = (entity, permissions) => {
  const actions = ['add', 'update', 'delete'];
  return actions.filter((a) => permissions.indexOf(`${a}_${entity.name}`) > -1);
};

export const getUserPermissions = (user) => {
  const permissions = ((user && user.roles) || []).reduce((prev, next) => {
    const p = [...prev, ...next.permissions];
    return p;
  }, []);
  const permissionNames = (permissions || [])
    .filter((p) => !!p.name)
    .map((p) => p.name.toLowerCase());
  return permissionNames;
};
