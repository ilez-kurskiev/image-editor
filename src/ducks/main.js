// Constants
export const ADD_LAYER = "[MAIN] * Push layer to layers";
export const SET_PRELAYER = "[MAIN] * Set prelayer to state";
export const MOVE_PRELAYER_TO_LAYER = "[MAIN] * Move prelayer to layers";
export const UPDATE_PRELAYER = "[MAIN] * Update prelayer";
export const UPDATE_LAYER = "[MAIN] * Update layer";
export const UPDATE_LAYERS = "[MAIN] * Update all layers";
export const UPDATE_SELECTED_LAYER = "[MAIN] * Update selected layer";
export const CHANGE_SELECTED_LAYER =
  "[MAIN] * Change selected layer as templayer";
export const TOGGLE_LAYER = "[MAIN] * Toggle layer";
export const SELECT_LAYER = "[MAIN] * Select current layer";
export const REMOVE_LAYER = "[MAIN] * Remove layer";
export const SORT_LAYER = "[MAIN] * Sort layers by index";
export const CREATE_WORKSPACE_SETTINGS = "[MAIN] * Create workspace settings";
export const SET_PREWORKSPACE_SETTINGS = "[MAIN] * Set preworkspace settings";
export const CHANGE_PAGE_CURSOR = "[MAIN] * Change main page cursor";
export const UPDATE_STAGE = "[MAIN] * Update editor stage";
export const SET_TEMPLAYER = "[MAIN] * Set templayer";
export const UPDATE_CROP = "[MAIN] * Update crop settings";
export const SET_CROP = "[MAIN] * Set crop settings";
export const UPDATE_ALL_STATE = "[MAIN] * Update all state";
export const TOGGLE_HISTORY_FILL = "[MAIN] * Toggle history filling";
export const FILL_IMAGE_HISTORY = "[MAIN] * Push image name to image history";

// Reducer
export default (
  state = {
    layers: [],
    prelayer: null,
    templayer: null,
    workspaceSettings: null,
    preworkspaceSettings: null,
    pageCursor: "default",
    stage: null,
    crop: null,
    imageHistory: [],
    isHistoryFill: false
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_STAGE:
      return {
        ...state,
        stage: payload
      };

    case CHANGE_PAGE_CURSOR:
      return {
        ...state,
        pageCursor: payload
      };

    case MOVE_PRELAYER_TO_LAYER:
      return {
        ...state,
        layers: [state.prelayer].concat(state.layers)
      };

    case CREATE_WORKSPACE_SETTINGS:
      return {
        ...state,
        workspaceSettings: payload
      };

    case SET_PREWORKSPACE_SETTINGS:
      return {
        ...state,
        preworkspaceSettings: payload
      };

    case ADD_LAYER:
      return {
        ...state,
        layers: [payload].concat(state.layers)
      };

    case SET_PRELAYER:
      return {
        ...state,
        prelayer: payload
      };

    case SET_TEMPLAYER:
      return {
        ...state,
        templayer: payload
      };

    case TOGGLE_LAYER:
      return {
        ...state,
        layers: state.layers.map(layer => {
          const { id, isVisible } = layer;

          return {
            ...layer,
            isVisible: payload === id ? !isVisible : isVisible
          };
        })
      };

    case SELECT_LAYER:
      return {
        ...state,
        layers: state.layers.map(layer => {
          const { id } = layer;

          return {
            ...layer,
            selected: payload === id
          };
        })
      };

    case REMOVE_LAYER: {
      const layerSize = state.layers.length;
      const hasSelectedLayer = state.layers.some(
        ({ selected, id }) => !!selected && id !== payload
      );

      return {
        ...state,
        layers: state.layers
          .filter(({ id }) => id !== payload)
          .map(
            (layer, i) =>
              !hasSelectedLayer && layerSize - 2 === i
                ? { ...layer, selected: true }
                : layer
          )
      };
    }

    case SORT_LAYER:
      return {
        ...state,
        layers: payload
      };

    case UPDATE_PRELAYER:
      return {
        ...state,
        prelayer: {
          ...state.prelayer,
          ...payload
        }
      };

    case UPDATE_LAYER:
      return {
        ...state,
        layers: state.layers.map(
          layer => (layer.id !== payload.id ? layer : { ...layer, ...payload })
        )
      };

    case UPDATE_LAYERS:
      return {
        ...state,
        layers: state.layers.map(layer => ({
          ...layer,
          ...payload
        }))
      };

    case UPDATE_SELECTED_LAYER:
      return {
        ...state,
        layers: state.layers.map(
          layer => (layer.selected ? { ...layer, ...payload } : layer)
        )
      };

    case CHANGE_SELECTED_LAYER:
      return {
        ...state,
        layers: state.layers.map(layer => (layer.selected ? payload : layer))
      };

    case UPDATE_CROP:
      return {
        ...state,
        crop: {
          ...state.crop,
          ...payload
        }
      };

    case SET_CROP:
      return {
        ...state,
        crop: payload
      };

    case UPDATE_ALL_STATE:
      return payload;

    case TOGGLE_HISTORY_FILL:
      return {
        ...state,
        isHistoryFill: payload
      };

    case FILL_IMAGE_HISTORY:
      return {
        ...state,
        imageHistory: state.imageHistory.concat(payload)
      };

    default:
      return state;
  }
};

// Actions
export const fillImageHistory = name => ({
  type: FILL_IMAGE_HISTORY,
  payload: name
});

export const toggleHistoryFill = bool => ({
  type: TOGGLE_HISTORY_FILL,
  payload: bool
});

export const updateAllState = state => ({
  type: UPDATE_ALL_STATE,
  payload: state
});

export const setCrop = settings => ({
  type: SET_CROP,
  payload: settings
});

export const updateCrop = settings => ({
  type: UPDATE_CROP,
  payload: settings
});

export const setTemplayer = templayer => ({
  type: SET_TEMPLAYER,
  payload: templayer
});

export const updateStage = stage => ({
  type: UPDATE_STAGE,
  payload: stage
});

export const updateLayers = chunk => ({
  type: UPDATE_LAYERS,
  payload: chunk
});

export const changePageCursor = type => ({
  type: CHANGE_PAGE_CURSOR,
  payload: type
});

export const movePrelayerToLayer = () => ({
  type: MOVE_PRELAYER_TO_LAYER
});

export const createWorkspaceSettings = settings => ({
  type: CREATE_WORKSPACE_SETTINGS,
  payload: settings
});

export const setPreworkspaceSettings = settings => ({
  type: SET_PREWORKSPACE_SETTINGS,
  payload: settings
});

export const updatePrelayer = data => ({
  type: UPDATE_PRELAYER,
  payload: data
});

export const updateSelectedLayer = data => ({
  type: UPDATE_SELECTED_LAYER,
  payload: data
});

export const changeSelectedLayer = data => ({
  type: CHANGE_SELECTED_LAYER,
  payload: data
});

export const sortLayers = layers => ({
  type: SORT_LAYER,
  payload: layers
});

export const setPrelayer = prelayer => ({
  type: SET_PRELAYER,
  payload: prelayer
});

export const addLayer = layer => ({
  type: ADD_LAYER,
  payload: layer
});

export const toggleLayer = id => ({
  type: TOGGLE_LAYER,
  payload: id
});

export const updateLayer = layer => ({
  type: UPDATE_LAYER,
  payload: layer
});

export const selectLayer = id => ({
  type: SELECT_LAYER,
  payload: id
});

export const removeLayer = id => ({
  type: REMOVE_LAYER,
  payload: id
});
