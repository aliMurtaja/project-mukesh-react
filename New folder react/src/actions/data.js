import { SET_ENTITY, RESET_ENTITIES } from 'utils/constants';
import request from 'service';

export const loadEntities = (entityConfig) => {
  return (dispatch) => {
    entityConfig.forEach((config) => {
      dispatch(loadEntity(config));
    });
  };
};

export const loadEntity = (config) => {
  return (dispatch) => {
    request({
      method: 'GET',
      url: config.url,
      loadingText: config.loadingText,
    }).then((res) => {
      if (res) {
        dispatch(saveEntityData(config.name, res));
      }
    });
  };
};

export const saveEntityData = (key, value) => {
  return {
    type: SET_ENTITY,
    payload: {
      key,
      value,
    },
  };
};

export const resetEntities = () => {
  return {
    type: RESET_ENTITIES,
  };
};
