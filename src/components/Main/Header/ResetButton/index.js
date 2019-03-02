import { StyledResetButton } from "./styled";
import { MainContext } from "context";
import theme from "styled/theme";

const ResetButton = ({ hasActiveNavButton, isForceReset }) =>
  hasActiveNavButton || isForceReset ? (
    <MainContext.Consumer>
      {({ onClickNavigationButton }) => (
        <StyledResetButton
          withIcon
          hasActiveNavButton={hasActiveNavButton}
          isForceReset={isForceReset}
          cursor="pointer"
          name="Close"
          data-reset="yes"
          width={20}
          height={20}
          color={theme.colors.gray["300"]}
          onClick={onClickNavigationButton}
        />
      )}
    </MainContext.Consumer>
  ) : null;

ResetButton.propTypes = {
  hasActiveNavButton: PropTypes.bool.isRequired,
  isForceReset: PropTypes.bool.isRequired
};

export default ResetButton;
