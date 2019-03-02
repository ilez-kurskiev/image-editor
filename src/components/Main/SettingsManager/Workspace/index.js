import { StyledWorkspace } from "./styled";
import Button from "Button";
import { MainContext } from "context";

const Workspace = () => (
  <MainContext.Consumer>
    {({ onResizeWorkspaceEnd }) => (
      <StyledWorkspace justify="space-between">
        <Button
          justify="center"
          useDefaultStyles
          onClick={onResizeWorkspaceEnd}
          text={Translation.apply}
          ignoreWidth={false}
        />
      </StyledWorkspace>
    )}
  </MainContext.Consumer>
);

export default Workspace;
