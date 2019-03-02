import Icon from "Icon";
import styled from "styled-components";

export const StyledPrelayer = Rnd => styled(Rnd)`
  position: relative;
  background: ${({ theme }) => theme.colors.black["300"]};
  box-shadow: ${({ theme }) => theme.shadows.base};
  color: ${({ theme }) => theme.colors.white["700"]};
  border-radius: ${({ theme }) => theme.radius.s};
  z-index: 1;

  .resize-handle {
    position: absolute;
    background: ${({ theme }) => theme.colors.white["700"]};
    width: 0.8rem !important;
    height: 0.8rem !important;

    &.top-left {
      top: -0.4rem !important;
      left: -0.4rem !important;
    }

    &.top-right {
      top: -0.4rem !important;
      right: -0.4rem !important;
    }

    &.bottom-left {
      bottom: -0.4rem !important;
      left: -0.4rem !important;
    }

    &.bottom-right {
      bottom: -0.4rem !important;
      right: -0.4rem !important;
    }

    &.top {
      top: -0.4rem !important;
      left: 50% !important;
      margin-left: -0.4rem;
    }

    &.bottom {
      bottom: -0.4rem !important;
      left: 50% !important;
      margin-left: -0.4rem;
    }

    &.left {
      left: -0.4rem !important;
      top: 50% !important;
      margin-top: -0.4rem;
    }

    &.right {
      right: -0.4rem !important;
      top: 50% !important;
      margin-top: -0.4rem;
    }
  }
`;

export const StyledDragHandle = styled(Icon)`
  position: absolute;
  right: 1rem;
  top: 1rem;
  cursor: pointer;
`;
