import Flex from "UI/Flex";
import styled from "styled-components";

export const StyledLayerManager = styled(Flex)`
  position: relative;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.colors.white["700"]};
  border-radius: ${({ theme }) => theme.radius.s};
  z-index: 1;

  ::after,
  ::before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    transition: all 200ms;
  }

  ::after {
    top: 0.4rem;
    right: 0.4rem;
    border-radius: ${({ theme }) => theme.radius.l};
    background: ${({ theme }) => theme.colors.green["200"]};
  }

  ::before {
    right: 0;
    top: 0;
    height: 100%;
    background: ${({ theme }) => theme.colors.gray["300"]};
  }

  ${({ selected }) =>
    !selected &&
    `
    :hover::before {
      width: .4rem;
    }
  `} ${({ selected }) =>
    selected &&
    `
    ::after {
      width: .9rem;
      height: .9rem;
    }
  `};
`;

export const StyledImage = styled.div`
  height: 4rem;
  width: 100%;
  margin: 0 1rem;
  border-radius: ${({ theme }) => theme.radius.s};
  background: url(${({ textImageUrl, url }) => textImageUrl || url}) 50% 50% /
      cover,
    ${({ theme }) => theme.colors.gray["500"]};

  ${({ isVisible }) => !isVisible && "opacity: .3;"};
`;
