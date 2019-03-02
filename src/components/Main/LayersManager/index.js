import LayerManager from "./LayerManager";
import Manager from "Manager";
import { MainContext } from "context";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

const SortableItem = SortableElement(layer => <LayerManager {...layer} />);

const SortableList = SortableContainer(({ layers }) => (
  <Manager title={Translation.layers}>
    {layers.map(({ id, ...layer }, i) => (
      <SortableItem key={id} index={i} id={id} {...layer} />
    ))}
  </Manager>
));

class LayersManager extends React.PureComponent {
  shouldCancelStart(event) {
    const { tagName } = event.target;

    return tagName !== "DIV";
  }

  render() {
    const { hasLayers, layers } = this.props;

    return (
      hasLayers && (
        <MainContext.Consumer>
          {({ onLayerSortEnd, onLayerSortStart }) => (
            <SortableList
              lockAxis="y"
              onSortStart={onLayerSortStart}
              shouldCancelStart={this.shouldCancelStart}
              lockToContainerEdges
              layers={layers}
              onSortEnd={onLayerSortEnd}
            />
          )}
        </MainContext.Consumer>
      )
    );
  }
}

LayersManager.propTypes = {
  hasLayers: PropTypes.bool.isRequired,
  layers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired
    })
  ).isRequired
};

export default LayersManager;
