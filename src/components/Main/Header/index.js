import { StyledHeader, StyledRightSide } from "./styled";
import UploadButton from "./UploadButton";
import WorkspaceSettings from "./WorkspaceSettings";
import Navigation from "./Navigation";
import ResetButton from "./ResetButton";
import { MainContext } from "context";
import theme from "styled/theme";

class Header extends React.PureComponent {
  get workspaceSettings() {
    const { preworkspaceSettings, workspaceSettings, stage } = this.props;
    return stage === "resizeWorkspace"
      ? preworkspaceSettings
      : workspaceSettings;
  }

  render() {
    const { hasLayers, hasActiveNavButton, historyStage } = this.props;

    return (
      <StyledHeader as="header">
        <MainContext.Consumer>
          {({ onUploadImage }) => (
            <UploadButton
              color={theme.colors.gray["300"]}
              onUploadImage={onUploadImage}
            />
          )}
        </MainContext.Consumer>
        <Navigation historyStage={historyStage} hasLayers={hasLayers} />
        <StyledRightSide ignoreWidth>
          <ResetButton
            hasActiveNavButton={hasActiveNavButton}
            isForceReset={this.props.stage === "resizeWorkspace"}
          />
          <WorkspaceSettings settings={this.workspaceSettings} />
        </StyledRightSide>
      </StyledHeader>
    );
  }
}

Header.propTypes = {
  stage: PropTypes.string,
  preworkspaceSettings: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }),
  historyStage: PropTypes.string.isRequired,
  hasActiveNavButton: PropTypes.bool.isRequired,
  hasLayers: PropTypes.bool.isRequired,
  workspaceSettings: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  })
};

export default Header;
