import styled from "styled-components";

export default styled.div`
  position: relative;
  width: ${({ ignoreWidth }) => (ignoreWidth ? "initial" : "100%")}
  flex: ${({ flex = "initial" }) => flex}
  display: ${({ inline }) => (inline ? "inline-flex" : "flex")};
  flex-direction: ${({ column }) => (column ? "column" : "row")}
  justify-content: ${({ justify = "initial" }) => justify}
  align-items: ${({ align = "initial" }) => align}
`;
