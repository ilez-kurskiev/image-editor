import main from "./main";
import ui from "./ui";
import history from "./history";
import { combineReducers } from "redux";

export default combineReducers({
  main,
  ui,
  history,
  lastActionType: (state, action) => action.type
});
