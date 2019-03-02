import Flex from "./Flex";
import { media } from "styled/mixins";
import styled from "styled-components";

export default styled(Flex)`
  min-height: ${({ fullHeight }) => (fullHeight ? "100%" : "initial")};
  min-width: 32rem;
  max-width: 200rem;
  margin: 0 auto;
  padding: 0 4rem;
  ${media.tablet`padding: 0;`};
`;
