import Text from "./Text";
import Default from "./Default";
import Transform from "./Transform";
import Filter from "./Filter";
import Crop from "./Crop";
import Workspace from "./Workspace";
import { StyledSettingsManager } from "./styled";
import Manager from "Manager";

const StyledSettingsManagerHoc = StyledSettingsManager(Manager);

class SettingsManager extends React.PureComponent {
  getPrelayer() {
    const { stage, textManager, hasCrop, hasPrelayerToLayer } = this.props;

    switch (stage) {
      case "createTextLayer":
        return (
          <Text {...textManager} hasPrelayerToLayer={hasPrelayerToLayer} />
        );

      case "transformLayer":
        return <Transform />;

      case "filterLayer":
        return <Filter />;

      case "cropLayer":
        return <Crop hasCrop={hasCrop} />;

      case "resizeWorkspace":
        return <Workspace />;

      default:
        return <Default />;
    }
  }

  render() {
    const { hasLayers } = this.props;

    return (
      hasLayers && (
        <StyledSettingsManagerHoc
          position={["top", "right"]}
          title={Translation.settings}
        >
          {this.getPrelayer()}
        </StyledSettingsManagerHoc>
      )
    );
  }
}

SettingsManager.propTypes = {
  hasCrop: PropTypes.bool.isRequired,
  textManager: PropTypes.shape({}).isRequired,
  stage: PropTypes.string,
  hasLayers: PropTypes.bool.isRequired,
  hasPrelayerToLayer: PropTypes.bool.isRequired
};

export default SettingsManager;
