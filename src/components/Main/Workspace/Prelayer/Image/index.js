import { StyledImage } from "./styled";

const Image = ({ url: src }) => (
  <StyledImage className="drag-handle" src={src} />
);

Image.propTypes = {
  url: PropTypes.string.isRequired
};

export default Image;
