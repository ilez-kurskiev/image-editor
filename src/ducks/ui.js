// Modules
import data from "./data";
import { combineReducers } from "redux";

// Constants
const CHANGE_FONT_FAMILY = "[UI] * Change select value (fontFamily)";
const CHANGE_FONT_SIZE = "[UI] * Change select value (fontSize)";
const CHANGE_TEXT_COLOR = "[UI] * Change text color";
const TOGGLE_BUTTON = "[UI] * Toggle button selection";
const RESET_BUTTONS = "[UI] * Reset buttons";
const RESET_SELECTS = "[UI] * Reset selects";
const RESET_SLIDERS = "[UI] * Reset sliders";
const UPDATE_SLIDER = "[UI] * Update slider value";

// Initial States
const initialSelectState = {
  fontFamily: data.select.fontFamily,
  fontSize: data.select.fontSize
};

const initialSliderState = {
  filters: {
    red: 0,
    blue: 0,
    green: 0,
    saturation: 0,
    luminance: 0
  }
};

const initialColorPickerState = {
  textColor: null
};

const initialButtonsState = {
  navigation: [],
  textStyling: ["TextNormal"],
  textAlignin: ["TextAlignLeft"],
  textDecorating: []
};

// Reducers
const slider = (state = initialSliderState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_SLIDER: {
      const { group, name, value } = payload;

      return {
        ...state,
        [group]: {
          ...state[group],
          [name]: value
        }
      };
    }

    case RESET_SLIDERS:
      return { ...initialSliderState };

    default:
      return state;
  }
};

const select = (state = initialSelectState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_FONT_FAMILY:
      return {
        ...state,
        fontFamily: state.fontFamily.map(font => ({
          ...font,
          selected: payload === font.value
        }))
      };

    case CHANGE_FONT_SIZE:
      return {
        ...state,
        fontSize: state.fontSize.map(font => ({
          ...font,
          selected: payload === font.value
        }))
      };

    case RESET_SELECTS:
      return { ...initialSelectState };

    default:
      return state;
  }
};

const colorPicker = (state = initialColorPickerState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_TEXT_COLOR:
      return {
        ...state,
        textColor: payload
      };

    default:
      return state;
  }
};

const buttons = (state = initialButtonsState, action) => {
  const { type, payload } = action;

  switch (type) {
    case RESET_BUTTONS:
      return { ...initialButtonsState };

    case TOGGLE_BUTTON: {
      const { group, name, isToggler } = payload;
      const buttons = state[group];

      return !isToggler
        ? {
            ...state,
            [group]: [name]
          }
        : {
            ...state,
            [group]: ~buttons.indexOf(name)
              ? buttons.filter(button => button !== name)
              : buttons.concat(name)
          };
    }

    default:
      return state;
  }
};

export default combineReducers({ colorPicker, select, buttons, slider });

// Actions
export const updateSlider = (group, name, value) => ({
  type: UPDATE_SLIDER,
  payload: { group, name, value }
});

export const resetSliders = () => ({
  type: RESET_SLIDERS
});

export const resetButtons = () => ({
  type: RESET_BUTTONS
});

export const resetSelects = () => ({
  type: RESET_SELECTS
});

export const toggleButton = (group, name, isToggler) => ({
  type: TOGGLE_BUTTON,
  payload: { name, group, isToggler }
});

export const changeTextColor = color => ({
  type: CHANGE_TEXT_COLOR,
  payload: color
});

export const changeFontFamily = fontFamily => ({
  type: CHANGE_FONT_FAMILY,
  payload: fontFamily
});

export const changeFontSize = fontSize => ({
  type: CHANGE_FONT_SIZE,
  payload: fontSize
});
