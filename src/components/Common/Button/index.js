import { StyledButton } from "./styled";
import Icon from "Icon";
import * as uiActions from "ducks/ui";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip as Tippy } from "react-tippy";

const CrossWrapper = ({ children, tooltip }) =>
  tooltip ? (
    <Tippy {...tooltip}>{children}</Tippy>
  ) : (
    <React.Fragment>{children}</React.Fragment>
  );

class Button extends React.Component {
  constructor(props) {
    super(props);

    this.actions = bindActionCreators(uiActions, props.dispatch);
    this.onClick = this.onClick.bind(this);
  }

  get isSelected() {
    const { group, name, buttons } = this.props;
    return group ? ~buttons.indexOf(name) : false;
  }

  onClick(event) {
    const { group, name, isToggler, onClick } = this.props;

    // Передаем противоположное значение
    // Так как хотя кнопка не выбрана
    // Но будет выбранной
    onClick(event, group ? !this.isSelected : this.isSelected);

    // Don't lift ^
    if (group) {
      process.nextTick(
        this.actions.toggleButton.bind(this, group, name, isToggler)
      );
    }
  }

  get tooltip() {
    return {
      title: this.props.tooltip,
      position: "bottom",
      trigger: "mouseenter"
    };
  }

  render() {
    const {
      withIcon,
      text,
      name,
      innerRef,
      className = "",
      useDefaultStyles,
      tooltip = "",
      ignoreWidth = true,
      onClick, // Выводим чтобы не передалось в Icon
      ...props
    } = this.props;

    const concatedClassName = `${className}${
      this.isSelected ? " selected" : ""
    }`;

    return (
      <CrossWrapper tooltip={tooltip && this.tooltip}>
        <StyledButton
          {...props}
          ref={innerRef}
          onClick={this.onClick}
          className={concatedClassName}
          useDefaultStyles={useDefaultStyles}
          ignoreWidth={ignoreWidth}
        >
          {withIcon && <Icon {...props} name={name} className="icon" />}
          {text && text}
        </StyledButton>
      </CrossWrapper>
    );
  }
}

Button.propTypes = {
  ignoreWidth: PropTypes.bool,
  useDefaultStyles: PropTypes.bool,
  innerRef: PropTypes.object,
  buttons: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func.isRequired,
  withIcon: PropTypes.bool,
  text: PropTypes.string,
  group: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  isToggler: PropTypes.bool,
  tooltip: PropTypes.string
};

const getState = (state, { group }) => ({
  buttons: state.ui.buttons[group] || []
});

export default connect(getState)(Button);
