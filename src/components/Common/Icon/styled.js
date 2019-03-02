import Flex from "UI/Flex";
import styled from "styled-components";

export const StyledIcon = styled(Flex)`
  cursor: ${({ cursor }) => cursor};

  svg {
    vertical-align: middle;
    flex-shrink: 0;
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;
    stroke: ${({ stroke }) => stroke};
    fill: ${({ color }) => color};

    path {
      fill: ${({ color }) => color};
    }
  }
`;
