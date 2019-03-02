import styled from "styled-components";

export const StyledCrop = styled.div`
  padding: 1rem;

  > div:last-child {
    margin-bottom: 0;
  }

  > div {
    margin-bottom: 1rem;
  }
`;

export const StyledHint = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.gray["500"]};
`;
