import { StyledWorkspaceSettings } from "./WorkspaceSettings/styled";
import Flex from "UI/Flex";
import { media } from "styled/mixins";
import styled from "styled-components";

export const StyledHeader = styled(Flex)`
  margin-top: 2rem;
  background: ${({ theme }) => theme.colors.white["700"]};
  border-radius: ${({ theme }) => theme.radius.s};
  padding: 0 1.5rem;
  z-index: 2;
  justify-content: space-between;
  align-items: center;
  min-height: 6rem;
  position: relative;
  ${media.tablet`border-radius: 0;`};
`;

export const StyledRightSide = styled(Flex)`
  ${StyledWorkspaceSettings} {
    margin-left: 1rem;
  }
`;
