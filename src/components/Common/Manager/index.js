import {
  StyledDraggableBody,
  StyledDraggableHeader,
  StyledDraggableContent
} from "./styled";
import Draggable from "react-draggable";

const Manager = ({ children, position, title, ...props }) => (
  <Draggable handle=".handle">
    <StyledDraggableBody {...props} position={position}>
      <StyledDraggableHeader className="handle">{title}</StyledDraggableHeader>
      <StyledDraggableContent>{children}</StyledDraggableContent>
    </StyledDraggableBody>
  </Draggable>
);

Manager.propTypes = {
  title: PropTypes.string.isRequired,
  position: PropTypes.arrayOf(PropTypes.string.isRequired),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired
};

Manager.defaultProps = {
  position: ["bottom", "right"]
};

export default Manager;
