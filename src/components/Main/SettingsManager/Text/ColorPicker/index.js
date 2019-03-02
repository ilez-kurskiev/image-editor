import { StyledColorPicker } from "./styled";
import { MainContext } from "context";
import { CompactPicker } from "react-color";

const StyledColorPickerHoc = StyledColorPicker(CompactPicker);

const ColorPicker = () => (
  <MainContext.Consumer>
    {({ onChangeTextColor }) => (
      <StyledColorPickerHoc onChange={onChangeTextColor} />
    )}
  </MainContext.Consumer>
);

export default ColorPicker;
