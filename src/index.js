import App from "./App";
import { render } from "react-dom";
import "./polyfill";

// Rerender
const rootElement = document.getElementById("root");
const rerender = AppComponent => {
  if (__ENV__ === "development") {
    const RedBox = require("redbox-react").default;

    try {
      render(<AppComponent />, rootElement);
    } catch (error) {
      render(<RedBox error={error} />, rootElement);
    }
  } else {
    render(<AppComponent />, rootElement);
  }
};

// Rerender by HMR
rerender(App);

// HMR accept
if (module.hot) {
  module.hot.accept("./App", () => {
    const NewApp = require("./App").default;
    rerender(NewApp);
  });
}
