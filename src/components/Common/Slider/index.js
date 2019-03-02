import { StyledSlider } from "./styled";
import * as uiActions from "ducks/ui";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.actions = bindActionCreators(uiActions, props.dispatch);
    this.onChange = this.onChange.bind(this);
    this.onAfterChange = this.onAfterChange.bind(this);
  }

  onChange(value) {
    const { group, name } = this.props;
    this.actions.updateSlider(group, name, value);
  }

  onAfterChange(value) {
    const { group, name, onChange } = this.props;
    onChange({ group, name, value });
  }

  render() {
    const { value, ...props } = this.props;

    return (
      <StyledSlider
        {...props}
        value={value}
        onChange={this.onChange}
        onAfterChange={this.onAfterChange}
        min={0}
        max={100}
      />
    );
  }
}

Slider.propTypes = {
  onChange: PropTypes.func.isRequired,
  group: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

const getState = (state, { group, name }) => ({
  value: state.ui.slider[group][name]
});

export default connect(getState)(Slider);
