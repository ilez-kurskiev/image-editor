import Icon from "Icon";
import styled from "styled-components";

export const StyledBackground = styled(Icon)`
  position: absolute;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const StyledIcon = styled(Icon)`
  z-index: -1;
`;

export const StyledResize = Rnd => styled(Rnd)`
  position: relative;
  background: ${({ theme }) => theme.colors.black["300"]};
  color: ${({ theme }) => theme.colors.white["700"]};
  border-radius: ${({ theme }) => theme.radius.m};
  z-index: 1;

  .resize-handle {
    position: absolute;
    background: ${({ theme }) => theme.colors.gray["500"]};
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
