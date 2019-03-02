import Flex from "UI/Flex";
import styled from "styled-components";

export const StyledButton = styled(Flex)`
  outline: none;
  border: none;

  ${({ useDefaultStyles, theme }) =>
    useDefaultStyles &&
    `
      min-width: 12rem;
      padding: 1rem 2.5rem;
      border-radius: ${theme.radius.s};
      color: ${theme.colors.white["700"]};
      background: ${theme.colors.gray["500"]};
      cursor: pointer;
      transition: all 300ms;

      :active {
        box-shadow: ${theme.shadows.button};
      }
    `};
`;
