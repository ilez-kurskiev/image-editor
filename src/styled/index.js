import theme from "./theme";
import { createGlobalStyle } from "styled-components";
import styledNormalize from "styled-normalize";

const GlobalStyles = createGlobalStyle`
  ${styledNormalize}
  @import url("https://fonts.googleapis.com/css?family=Open+Sans:400,600");

  * {
    box-sizing: border-box!important;
    outline: none;
  }

  *:not(input) {
    user-select: none;
  }

  body, html {
    -webkit-tap-highlight-color: transparent;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 62.5%;
    height: 100%;
  }

  body, #root {
    height: inherit;
    font: 1.4rem "Open Sans";
    overflow-x: hidden;
  }

  body {
    background: ${theme.colors.black["700"]};
  }

  #root {
    position: absolute;
    width: 100%;
  }

  .tippy-tooltip-content {
    font-size: 1.2rem;
  }

  .__resizable_base__ {
    display: none;
  }
`;

export default GlobalStyles;
