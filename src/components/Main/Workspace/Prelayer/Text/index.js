import { StyledText } from "./styled";
import { MainContext } from "context";

const Text = ({ html, styles }) => (
  <MainContext.Consumer>
    {({ onUpdatePrelayerText }) => (
      <StyledText
        contentEditable
        dangerouslySetInnerHTML={{ __html: html }}
        style={styles.native}
        onBlur={onUpdatePrelayerText}
      />
    )}
  </MainContext.Consumer>
);

Text.propTypes = {
  html: PropTypes.string.isRequired,
  styles: PropTypes.shape({
    native: PropTypes.object.isRequired
  }).isRequired
};

export default Text;
