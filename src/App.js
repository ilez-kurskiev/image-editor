// Modules
import store from "./store";
import theme from "./styled/theme";
import Main from "components/Main";
import GlobalStyles from "styled";
import Async from "components/Common/Async";
// import Sync from "components/Common/Sync";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

// Css
import "react-tippy/dist/tippy.css";

// Sync components
// const SyncMain = Sync(Main);

// Async components
const AsyncMain = Async(() => import("components/Main"));

// App
const App = () => (
  <React.Fragment>
    <GlobalStyles />
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AsyncMain />
      </Provider>
    </ThemeProvider>
  </React.Fragment>
);

export default App;
