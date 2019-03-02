import { StyledCrop, StyledHint } from "./styled";
import Button from "Button";
import { MainContext } from "context";

const Crop = ({ hasCrop }) => (
  <MainContext.Consumer>
    {({
      onCropLayer,
      onCutLayer,
      onCropLayerWithNewLayer,
      onCutLayerWithNewLayer
    }) => (
      <StyledCrop>
        {!hasCrop && <StyledHint>{Translation.selectCropArea}</StyledHint>}
        {hasCrop && (
          <React.Fragment>
            <Button
              justify="center"
              useDefaultStyles
              onClick={onCropLayer}
              text={Translation.crop}
              ignoreWidth={false}
            />
            <Button
              justify="center"
              useDefaultStyles
              onClick={onCropLayerWithNewLayer}
              text={Translation.cropWithNewLayer}
              ignoreWidth={false}
            />
            <Button
              justify="center"
              useDefaultStyles
              onClick={onCutLayer}
              text={Translation.cut}
              ignoreWidth={false}
            />
            <Button
              justify="center"
              useDefaultStyles
              onClick={onCutLayerWithNewLayer}
              text={Translation.cutWithNewLayer}
              ignoreWidth={false}
            />
          </React.Fragment>
        )}
      </StyledCrop>
    )}
  </MainContext.Consumer>
);

Crop.propTypes = {
  hasCrop: PropTypes.bool.isRequired
};

export default Crop;
