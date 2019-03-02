import Button from "Button";
import styled from "styled-components";

export const StyledButton = styled(Button)`
  &.selected .icon path {
    fill: ${({ theme }) => theme.colors.gray["500"]}!important;
  }
`;
