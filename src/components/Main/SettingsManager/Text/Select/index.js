import { StyledSelect } from "./styled";
import ReactSelect from "react-select";

const StyledSelectHoc = StyledSelect(ReactSelect);

const Select = ({ options, selectedOption, onChange }) => (
  <StyledSelectHoc
    onChange={onChange}
    options={options}
    value={selectedOption}
  />
);

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  selectedOption: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }).isRequired
};

export default Select;
