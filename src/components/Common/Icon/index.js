import { StyledIcon } from "./styled";
import * as icons from "icons";

const Icon = props => {
  const { name, stroke, width, height, cursor, color } = props;
  const MatchIcon = icons[name];

  return (
    <StyledIcon
      inline
      ignoreWidth
      stroke={stroke}
      cursor={cursor}
      width={width}
      height={height}
      color={color}
      {...props}
    >
      <MatchIcon />
    </StyledIcon>
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  stroke: PropTypes.string,
  cursor: PropTypes.string
};

Icon.defaultProps = {
  cursor: "default",
  width: 22,
  height: 22,
  stroke: "none",
  color: "black"
};

export default Icon;
