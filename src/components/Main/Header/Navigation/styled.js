import Flex from "UI/Flex";
import Button from "Button";
import styled from "styled-components";

export const StyledNavigation = styled(Flex)`
  border-radius: ${({ theme }) => theme.radius.m};
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.colors.gray["500"]};
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;

  > div {
    margin-left: 1.5rem;

    :first-child {
      margin-left: 0;
    }
  }
`;

export const StyledButton = styled(Button)`
  position: relative;
  transition: all 300ms;

  ::after {
    content: "";
    position: absolute;
    height: 0.3rem;
    width: 0;
    bottom: -0.7rem;
    border-radius: ${({ theme }) => theme.radius.m};
    left: 0;
    background: ${({ theme }) => theme.colors.white["700"]};
    transition: all 300ms;
  }

  &.selected::after {
    width: 100%;
  }

  ${({ disableHoverEffect }) =>
    !disableHoverEffect &&
    `
      &:not(.selected):hover::after {
        width: 50%;
      }   
    `} ${({ enabled }) =>
    typeof enabled === "boolean" &&
    !enabled &&
    `
      pointer-events: none;
      opacity: .7;
    `};
`;
