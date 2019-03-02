import styled, { keyframes } from "styled-components";

export const spinner = keyframes`
  from { transform: perspective(220px) rotateY(0deg); }
  to { transform: perspective(220px) rotateY(360deg); }
`;

export const StyledPreloader = styled.div`
  position: fixed;
  z-index: 99;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.black["700"]};
`;

export const StyledSpinner = styled.div`
  border-left: 2rem solid transparent;
  border-right: 2rem solid transparent;
  border-bottom: 3rem solid ${({ theme }) => theme.colors.white["700"]};
  position: absolute;
  animation: ${spinner} 1s infinite ease-in-out;
  top: 50%;
  left: 50%;
  margin-top: -1.8rem;
  margin-left: -1.3rem;
`;
