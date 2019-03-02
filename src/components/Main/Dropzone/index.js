import { StyledDropzone } from "./styled";
import { MainContext } from "context";
import ReactDropzone from "react-dropzone";

const StyledDropzoneHoc = StyledDropzone(ReactDropzone);

class Dropzone extends React.PureComponent {
  render() {
    const { children } = this.props;

    return (
      <MainContext.Consumer>
        {({ onDropImage }) => (
          <StyledDropzoneHoc
            onDrop={onDropImage}
            accept="image/*"
            disableClick
            disablePreview
          >
            {children}
          </StyledDropzoneHoc>
        )}
      </MainContext.Consumer>
    );
  }
}

Dropzone.propTypes = {
  children: PropTypes.node.isRequired
};

export default Dropzone;
