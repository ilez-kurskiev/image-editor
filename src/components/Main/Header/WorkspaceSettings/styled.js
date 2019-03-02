import Flex from "UI/Flex";
import styled from "styled-components";

export const StyledWorkspaceSettings = styled(Flex)`
  color: ${({ theme }) => theme.colors.white["700"]};
  border-radius: ${({ theme }) => theme.radius.s};
  padding: 0.2rem 0.7rem;
  background: ${({ theme }) => theme.colors.green["200"]};
  font-size: 1.2rem;
  font-weight: 600;
`;
