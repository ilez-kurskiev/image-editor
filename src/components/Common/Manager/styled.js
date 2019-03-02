import styled from "styled-components";

export const StyledDraggableBody = styled.div`
  min-width: 25rem;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  position: absolute;
  ${({ position }) => position.map(item => `${item}: 1rem;`).join("")};
  z-index: 1;
`;

export const StyledDraggableHeader = styled.div`
  padding: 0.7rem 1rem;
  border-radius: ${({ theme }) => theme.radius.s};
  background: ${({ theme }) => theme.colors.white["700"]};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray["500"]};
  font-size: 1.4rem;
  text-align: center;
  font-weight: 600;
`;

export const StyledDraggableContent = styled.div`
  margin-top: 1rem;
  border-radius: ${({ theme }) => theme.radius.s};
  background: ${({ theme }) => theme.colors.white["700"]};
`;
