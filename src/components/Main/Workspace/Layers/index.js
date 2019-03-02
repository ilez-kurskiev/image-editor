import { StyledStage } from "./styled";
import { MainContext } from "context";
import { Stage, FastLayer as Layer, Image, Text } from "react-konva";

const StyledStageHoc = StyledStage(Stage);
const Layers = props => {
  const { layers } = props;
  const { innerWidth, innerHeight } = window;

  return (
    <MainContext.Consumer>
      {({ selectedLayerRef, getFilters }) => (
        <StyledStageHoc width={innerWidth} height={innerHeight}>
          <Layer>
            {layers.map((layer, i) => {
              const { type, id, selected } = layer;
              const key = id + i;
              const ref = selected ? selectedLayerRef : null;

              switch (type) {
                case "text": {
                  const { styles, ...props } = layer;

                  return (
                    <Text {...props} {...styles.canvas} key={key} ref={ref} />
                  );
                }

                default: {
                  const { native, ...props } = layer;
                  return (
                    <Image
                      {...props}
                      filters={getFilters(layer)}
                      image={native}
                      key={key}
                      ref={ref}
                    />
                  );
                }
              }
            })}
          </Layer>
        </StyledStageHoc>
      )}
    </MainContext.Consumer>
  );
};

Layers.propTypes = {
  layers: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      native: PropTypes.object,
      styles: PropTypes.shape({
        canvas: PropTypes.object.isRequired
      })
    })
  ).isRequired
};

export default Layers;
