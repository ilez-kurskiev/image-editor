import { StyledButton, StyledNavigation } from "./styled";
import theme from "styled/theme";
import { MainContext } from "context";

const Navigation = ({ hasLayers, historyStage }) =>
  !hasLayers ? null : (
    <MainContext.Consumer>
      {({ onClickNavigationButton }) => (
        <StyledNavigation ignoreWidth>
          <StyledButton
            enabled={historyStage === "undo" || historyStage === "undo/redo"}
            withIcon
            name="Undo"
            cursor="pointer"
            color={theme.colors.white["700"]}
            data-stage="undo"
            data-method="updateHistory"
            tooltip={Translation.back}
            onClick={onClickNavigationButton}
            disableHoverEffect
          />
          <StyledButton
            enabled={historyStage === "redo" || historyStage === "undo/redo"}
            withIcon
            name="Redo"
            cursor="pointer"
            color={theme.colors.white["700"]}
            data-stage="redo"
            data-method="updateHistory"
            tooltip={Translation.forward}
            onClick={onClickNavigationButton}
            disableHoverEffect
          />
          <StyledButton
            withIcon
            name="Text"
            cursor="pointer"
            color={theme.colors.white["700"]}
            group="navigation"
            data-method="createTextPrelayer"
            tooltip={Translation.addText}
            onClick={onClickNavigationButton}
          />
          <StyledButton
            withIcon
            name="Drag"
            group="navigation"
            cursor="pointer"
            data-method="changePageCursorToMove"
            color={theme.colors.white["700"]}
            tooltip={Translation.move}
            onClick={onClickNavigationButton}
          />
          <StyledButton
            withIcon
            name="Rotate"
            group="navigation"
            cursor="pointer"
            data-method="rotateLayer"
            width={21}
            height={21}
            color={theme.colors.white["700"]}
            tooltip={Translation.rotate}
            onClick={onClickNavigationButton}
          />
          <StyledButton
            withIcon
            name="FlipX"
            group="navigation"
            cursor="pointer"
            data-method="flipXLayer"
            width={21}
            height={21}
            color={theme.colors.white["700"]}
            tooltip={Translation.flip}
            onClick={onClickNavigationButton}
          />
          <StyledButton
            withIcon
            name="Transform"
            group="navigation"
            cursor="pointer"
            width={21}
            height={21}
            color={theme.colors.white["700"]}
            data-method="moveLayerToPrelayer"
            tooltip={Translation.transform}
            onClick={onClickNavigationButton}
          />
          <StyledButton
            withIcon
            name="Filter"
            group="navigation"
            cursor="pointer"
            width={21}
            height={21}
            color={theme.colors.white["700"]}
            data-method="filterLayer"
            tooltip={Translation.setFilter}
            onClick={onClickNavigationButton}
          />
          <StyledButton
            withIcon
            name="Crop"
            group="navigation"
            cursor="pointer"
            width={21}
            height={21}
            color={theme.colors.white["700"]}
            data-method="cropLayer"
            tooltip={Translation.cropLayer}
            onClick={onClickNavigationButton}
          />
          <StyledButton
            withIcon
            name="ResizeWorkspace"
            group="navigation"
            cursor="pointer"
            width={21}
            height={21}
            color={theme.colors.white["700"]}
            data-method="resizeWorkspace"
            tooltip={Translation.resizeWorkspace}
            onClick={onClickNavigationButton}
          />
        </StyledNavigation>
      )}
    </MainContext.Consumer>
  );

Navigation.propTypes = {
  historyStage: PropTypes.string.isRequired,
  hasLayers: PropTypes.bool.isRequired
};

export default Navigation;
