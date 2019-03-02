import { StyledForeground, StyledBody } from "./styled";

const Foreground = ({ stage, x, y, width, height }) =>
  stage !== "resizeWorkspace" ? (
    <StyledForeground width={width} height={height} x={x} y={y}>
      <StyledBody />
    </StyledForeground>
  ) : null;

Foreground.propTypes = {
  stage: PropTypes.string,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

export default Foreground;
