import ducks from "ducks";
import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  ducks,
  composeWithDevTools(applyMiddleware(promiseMiddleware))
);

export default store;

if (module.hot) {
  module.hot.accept("./ducks", () => {
    const newReducer = require("./ducks").default;
    store.replaceReducer(newReducer);
  });
}
