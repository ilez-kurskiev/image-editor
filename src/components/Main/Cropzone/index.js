import { StyledCropzone } from "./styled";

const Cropzone = ({ crop }) => (crop ? <StyledCropzone {...crop} /> : null);

Cropzone.propTypes = {
  crop: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  })
};

export default Cropzone;
