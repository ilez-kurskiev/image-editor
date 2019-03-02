// Constants
export const UPDATE_HISTORY = "[HISTORY] * Update history";
export const FILL_HISTORY = "[HISTORY] * Fill history";

// Reducer
export default (
  state = {
    items: [],
    position: -1,
    allow: false
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case FILL_HISTORY:
      const { length: size } = state.items;
      const { position } = state;
      const isSlice = position < size - 1;

      return {
        ...state,
        items: state.items
          .slice(0, isSlice ? position || 1 : size)
          .concat(payload),
        position: !position || !isSlice ? position + 1 : position
      };

    case UPDATE_HISTORY:
      return {
        ...state,
        ...payload
      };

    default:
      return state;
  }
};

// Actions
export const fillHistory = history => ({
  type: FILL_HISTORY,
  payload: history
});

export const updateHistory = settings => ({
  type: UPDATE_HISTORY,
  payload: settings
});
