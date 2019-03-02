import { StyledWorkspaceSettings } from "./styled";

const WorkspaceSettings = ({ settings }) =>
  settings ? (
    <StyledWorkspaceSettings align="center">
      {Math.round(settings.width)}
      px&#160;&#x25cf;&#160;
      {Math.round(settings.height)}
      px
    </StyledWorkspaceSettings>
  ) : null;

WorkspaceSettings.propTypes = {
  settings: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  })
};

export default WorkspaceSettings;
