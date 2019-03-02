import Button from "Button";
import styled from "styled-components";

export const StyledResetButton = styled(Button)`
  transition: all 300ms;

  ${({ hasActiveNavButton, isForceReset }) =>
    hasActiveNavButton || isForceReset
      ? `
        opacity: 1;
        visibility: visible;
      `
      : `
        opacity: 0;
        visibility: hidden;
      `};
`;
