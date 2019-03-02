import { createSelector } from "reselect";

// Helpers
const layers = state => state.main.layers;
const workspaceSettings = state => state.main.workspaceSettings;
const prelayer = state => state.main.prelayer;
const crop = state => state.main.crop;

// Selectors
export const hasCrop = createSelector(crop, crop => !!(crop && crop.finished));
export const hasLayers = createSelector(layers, layers => !!layers.length);
export const getSelectedLayer = createSelector(layers, layers =>
  layers.find(({ selected }) => !!selected)
);

export const hasPrelayerToLayer = createSelector(
  prelayer,
  layers,
  (prelayer, layers) =>
    !prelayer ? false : layers.some(({ id }) => id === prelayer.id)
);

export const getVisibleLayers = createSelector(
  layers,
  prelayer,
  (layers, prelayer) =>
    (prelayer && prelayer.type === "text" ? [prelayer].concat(layers) : layers)
      .filter(({ isVisible }) => !!isVisible)
      .reverse()
);

export const getWorkspaceSettings = createSelector(
  hasLayers,
  workspaceSettings,
  (hasLayers, workspaceSettings) => (hasLayers ? workspaceSettings : null)
);
