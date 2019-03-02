import styled from "styled-components";

export const StyledCropzone = styled.div.attrs({
  style: ({ width, height, x, y }) => ({
    width: `${width}px`,
    height: `${height}px`,
    left: `${x}px`,
    top: `${y}px`
  })
})`
  position: absolute;
  z-index: 1;
  border: 1px dashed ${({ theme }) => theme.colors.white["700"]};
  border-radius: ${({ theme }) => theme.radius.s};
  box-shadow: ${({ theme }) => theme.shadows.base};
`;
