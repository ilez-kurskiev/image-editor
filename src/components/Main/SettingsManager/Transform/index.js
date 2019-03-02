import { StyledTransform } from "./styled";
import Button from "Button";
import { MainContext } from "context";

const Transform = () => (
  <MainContext.Consumer>
    {({ onUpdateLayer }) => (
      <StyledTransform justify="space-between">
        <Button
          justify="center"
          useDefaultStyles
          onClick={onUpdateLayer}
          text={Translation.apply}
          ignoreWidth={false}
        />
      </StyledTransform>
    )}
  </MainContext.Consumer>
);

export default Transform;
