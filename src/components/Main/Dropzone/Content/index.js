import { StyledDropzoneContent } from "./styled";

class DropzoneContent extends React.PureComponent {
  render() {
    const { hasLayers } = this.props;

    return (
      !hasLayers && (
        <StyledDropzoneContent>{Translation.dragImage}</StyledDropzoneContent>
      )
    );
  }
}

DropzoneContent.propTypes = {
  hasLayers: PropTypes.bool.isRequired
};

export default DropzoneContent;
