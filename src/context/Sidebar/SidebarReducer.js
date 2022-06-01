import { SET_CONTENT_ID, SET_IS_ACTIVE } from './types';

const SidebarReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_IS_ACTIVE:
      return {
        ...state,
        isActive: payload,
      };

    case SET_CONTENT_ID:
      return {
        ...state,
        contentId: payload,
      };

    default:
      return state;
  }
};

export default SidebarReducer;
