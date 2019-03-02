import { StyledImage, StyledLayerManager } from "./styled";
import Button from "Button";
import theme from "styled/theme";
import { MainContext } from "context";

const LayerManager = ({ id, isVisible, url, textImageUrl, selected }) => (
  <MainContext.Consumer>
    {({ onToggleLayer, onRemoveLayer }) => (
      <StyledLayerManager align="center" selected={selected}>
        <Button
          withIcon
          ignoreWidth
          cursor="pointer"
          data-id={id}
          name={isVisible ? "Show" : "Hide"}
          color={theme.colors.black["700"]}
          onClick={onToggleLayer}
        />
        <StyledImage
          data-type="select-layer-area"
          isVisible={isVisible}
          url={url}
          textImageUrl={textImageUrl}
          data-id={id}
        />
        <Button
          ignoreWidth
          withIcon
          cursor="pointer"
          data-id={id}
          name="Remove"
          color={theme.colors.black["700"]}
          width={18}
          height={18}
          onClick={onRemoveLayer}
        />
      </StyledLayerManager>
    )}
  </MainContext.Consumer>
);

LayerManager.propTypes = {
  id: PropTypes.number.isRequired,
  isVisible: PropTypes.bool.isRequired,
  url: PropTypes.string,
  textImageUrl: PropTypes.string,
  selected: PropTypes.bool.isRequired
};

export default LayerManager;
