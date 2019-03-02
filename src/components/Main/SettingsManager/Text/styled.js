import Flex from "UI/Flex";
import styled from "styled-components";

export const StyledText = styled(Flex)`
  padding: 1rem;
  flex-direction: column;

  > div {
    margin-bottom: 1rem;
  }

  > div:last-child {
    margin-bottom: 0;
  }
`;
