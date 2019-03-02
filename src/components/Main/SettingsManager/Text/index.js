import { StyledText } from "./styled";
import Select from "./Select";
import ColorPicker from "./ColorPicker";
import Buttons from "./Buttons";
import Button from "Button";
import { MainContext } from "context";

const Text = ({ select, hasPrelayerToLayer }) => (
  <MainContext.Consumer>
    {({
      onMovePrelayerToLayer,
      onUpdateLayer,
      onChangeFontFamily,
      onChangeFontSize
    }) => (
      <StyledText justify="space-between">
        <Select
          onChange={onChangeFontFamily}
          options={select.fontFamily.options}
          selectedOption={select.fontFamily.selectedOption}
        />
        <Select
          onChange={onChangeFontSize}
          options={select.fontSize.options}
          selectedOption={select.fontSize.selectedOption}
        />
        <Buttons />
        <ColorPicker />
        <Button
          justify="center"
          useDefaultStyles
          onClick={hasPrelayerToLayer ? onUpdateLayer : onMovePrelayerToLayer}
          text={hasPrelayerToLayer ? Translation.apply : Translation.add}
          ignoreWidth={false}
        />
      </StyledText>
    )}
  </MainContext.Consumer>
);

Text.propTypes = {
  hasPrelayerToLayer: PropTypes.bool.isRequired,
  select: PropTypes.shape({
    fontFamily: PropTypes.shape({
      options: PropTypes.array.isRequired,
      selectedOption: PropTypes.object.isRequired
    }).isRequired,
    fontSize: PropTypes.shape({
      options: PropTypes.array.isRequired,
      selectedOption: PropTypes.object.isRequired
    }).isRequired
  }).isRequired
};

export default Text;
