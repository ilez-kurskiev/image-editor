import { StyledSlider, StyledTitle } from "./styled";
import Flex from "UI/Flex";

const Slider = ({ title, group, name, onChange }) => (
  <Flex align="center">
    <StyledTitle>{title}</StyledTitle>
    <StyledSlider group={group} name={name} onChange={onChange} />
  </Flex>
);

Slider.propTypes = {
  title: PropTypes.string.isRequired,
  group: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Slider;
