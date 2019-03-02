import { createSelector } from "reselect";

// Helpers
const ui = state => state.ui;

// Selectors
export const hasActiveNavButton = createSelector(
  ui,
  ({ buttons }) => !!buttons.navigation.length
);

export const getTextManager = createSelector(ui, ({ select }) => {
  const { fontFamily, fontSize } = select;
  const selectedFontFamily = fontFamily.find(({ selected }) => !!selected);

  const selectedFontSize = fontSize.find(({ selected }) => !!selected);

  return {
    select: {
      fontFamily: {
        options: fontFamily,
        selectedOption: selectedFontFamily
      },
      fontSize: {
        options: fontSize,
        selectedOption: selectedFontSize
      }
    }
  };
});
