import { createSelector } from "reselect";

// Helpers
const history = state => state.history;

// Selectors
export const getHistoryStage = createSelector(history, history => {
  const { items, position } = history;
  const { length } = items;
  let stage = "undo/redo";

  if (length < 2) stage = "unknown";
  if (position === 0 && length >= 2) stage = "redo";
  if (position === length - 1 && length >= 2) stage = "undo";

  return stage;
});

export const hasHistory = createSelector(history, ({ allow }) => allow);

export const getStateFromHistory = createSelector(
  hasHistory,
  history,
  (hasHistory, history) => {
    if (!hasHistory) return false;

    const { position, items } = history;
    return items[position];
  }
);
