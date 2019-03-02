import Text from "./Text";
import Image from "./Image";
import { StyledPrelayer, StyledDragHandle } from "./styled";
import { MainContext } from "context";
import theme from "styled/theme";
import { Rnd } from "react-rnd";

const StyledPrelayerHoc = StyledPrelayer(Rnd);

class Prelayer extends React.PureComponent {
  getPrelayer(prelayer) {
    switch (prelayer.type) {
      case "text":
        return <Text {...prelayer} />;

      default:
        return <Image {...prelayer} />;
    }
  }

  get defaultSettings() {
    const {
      x,
      y,
      offsetX = 0,
      offsetY = 0,
      width,
      height
    } = this.props.prelayer;

    return {
      x: x - offsetX,
      y: y - offsetY,
      width,
      height
    };
  }

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

  render() {
    const { prelayer } = this.props;

    if (!prelayer) {
      return null;
    }

    return (
      <MainContext.Consumer>
        {({ onDragPrelayer, onResizePrelayer }) => (
          <StyledPrelayerHoc
            default={this.defaultSettings}
            dragHandleClassName="drag-handle"
            onDragStop={onDragPrelayer}
            onResizeStop={onResizePrelayer}
            resizeHandleClasses={this.resizeHandleClasses}
          >
            <StyledDragHandle
              cursor="pointer"
              className="drag-handle"
              name="Drag"
              width={17}
              height={17}
              color={theme.colors.white["700"]}
            />
            {this.getPrelayer(prelayer)}
          </StyledPrelayerHoc>
        )}
      </MainContext.Consumer>
    );
  }
}

Prelayer.propTypes = {
  prelayer: PropTypes.shape({})
};

export default Prelayer;
