import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

export const StyledForeground = styled.div`
  position: absolute;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  border: 2px solid ${({ theme }) => theme.colors.white["700"]};
  outline: 1000px solid ${({ theme }) => theme.colors.black["300"]};
  overflow: hidden;
  pointer-events: none;
`;

export const StyledBody = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.colors.gray["600"]}!important;
  }
`;
