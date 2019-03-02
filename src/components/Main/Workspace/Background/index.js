import { StyledBackground, StyledResize, StyledIcon } from "./styled";
import { MainContext } from "context";
import { Rnd } from "react-rnd";

const StyledResizeHoc = StyledResize(Rnd);

class Background extends React.PureComponent {
  get resizeHandleClasses() {
    return {
      bottomRight: "resize-handle bottom-right",
      bottomLeft: "resize-handle bottom-left",
      topRight: "resize-handle top-right",
      topLeft: "resize-handle top-left",
      top: "resize-handle top",
      left: "resize-handle left",
      right: "resize-handle right",
      bottom: "resize-handle bottom"
    };
  }

  get size() {
    const { width, height } = this.props.preworkspaceSettings;
    return { width, height };
  }

  get position() {
    const { x, y } = this.props.preworkspaceSettings;
    return { x, y };
  }

  render() {
    const { stage, x, y, width, height } = this.props;

    return stage !== "resizeWorkspace" ? (
      <StyledBackground
        width={width}
        height={height}
        x={x}
        y={y}
        name="Workspace"
      />
    ) : (
      <MainContext.Consumer>
        {({ onResizeWorkspace }) => (
          <StyledResizeHoc
            size={this.size}
            position={this.position}
            onResize={onResizeWorkspace}
            resizeHandleClasses={this.resizeHandleClasses}
            disableDragging
          >
            <StyledIcon name="Workspace" {...this.size} />
          </StyledResizeHoc>
        )}
      </MainContext.Consumer>
    );
  }
}

Background.propTypes = {
  stage: PropTypes.string,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  preworkspaceSettings: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  })
};

export default Background;
