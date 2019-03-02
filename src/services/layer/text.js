import getCenterPosition from "../getCenterPosition";
import theme from "styled/theme";

export default () => ({
  ...getCenterPosition(300, 150),
  type: "text",
  id: Date.now(),
  width: 300,
  height: 150,
  text: Translation.canWriteText,
  html: Translation.canWriteText,
  isVisible: true,
  selected: true,
  visible: false,
  styles: {
    canvas: {
      fontFamily: "Open Sans",
      fontSize: 14,
      fill: theme.colors.white["700"]
    },
    native: {
      fontFamily: "Open Sans",
      fontSize: 14,
      color: theme.colors.white["700"]
    }
  }
});
