import { StyledLabel } from "./styled";
import Icon from "Icon";

const UploadButton = props => {
  const { onUploadImage, color } = props;

  return (
    <StyledLabel ignoreWidth>
      <input type="file" accept="image/*" onChange={onUploadImage} />
      <Icon name="Upload" color={color} pointer />
      <span>{Translation.upload}</span>
    </StyledLabel>
  );
};

UploadButton.propTypes = {
  onUploadImage: PropTypes.func.isRequired,
  color: PropTypes.string
};

UploadButton.defaultProps = {
  color: "#000"
};

export default UploadButton;
