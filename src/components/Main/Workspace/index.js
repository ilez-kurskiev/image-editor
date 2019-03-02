import Background from "./Background";
import Foreground from "./Foreground";
import Layers from "./Layers";
import Prelayer from "./Prelayer";

class Workspace extends React.PureComponent {
  render() {
    const {
      prelayer,
      stage,
      hasLayers,
      layers,
      workspaceSettings,
      preworkspaceSettings
    } = this.props;

    return (
      hasLayers && (
        <React.Fragment>
          <Background
            {...workspaceSettings}
            preworkspaceSettings={preworkspaceSettings}
            stage={stage}
          />
          <Layers layers={layers} />
          <Foreground {...workspaceSettings} stage={stage} />
          <Prelayer prelayer={prelayer} />
        </React.Fragment>
      )
    );
  }
}

Workspace.propTypes = {
  stage: PropTypes.string,
  prelayer: PropTypes.shape({}),
  hasLayers: PropTypes.bool.isRequired,
  preworkspaceSettings: PropTypes.object,
  workspaceSettings: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.bool.isRequired
  ]),
  layers: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Workspace;
