import Flex from "./Flex";
import styled from "styled-components";

export default styled(Flex)`
  width: 100%;
  height: 100%;
  ${({ cursor = "pointer" }) => `cursor: ${cursor};`};
`;
