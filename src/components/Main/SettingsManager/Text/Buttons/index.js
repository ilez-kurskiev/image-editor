import { StyledButton } from "./styled";
import theme from "styled/theme";
import { MainContext } from "context";
import Flex from "UI/Flex";

const firstUpperCase = value =>
  value.slice(0, 1).toUpperCase() + value.slice(1);

const Buttons = () => (
  <MainContext.Consumer>
    {({
      onChangeTextStyling,
      onChangeTextDecorating,
      onChangeTextAligning
    }) => (
      <Flex>
        {["bold", "italic"].map(style => (
          <StyledButton
            key={style}
            justify="center"
            withIcon
            isToggler
            group="textStyling"
            data-style={style}
            onClick={onChangeTextStyling}
            name={`Text${firstUpperCase(style)}`}
            cursor="pointer"
            color={theme.colors.gray["300"]}
            ignoreWidth={false}
          />
        ))}
        <StyledButton
          justify="center"
          withIcon
          isToggler
          onClick={onChangeTextDecorating}
          group="textDecorating"
          name="TextUnderline"
          cursor="pointer"
          color={theme.colors.gray["300"]}
          ignoreWidth={false}
        />
        {["left", "center", "right"].map(align => (
          <StyledButton
            key={align}
            justify="center"
            withIcon
            onClick={onChangeTextAligning}
            group="textAlignin"
            data-style={align}
            name={`TextAlign${firstUpperCase(align)}`}
            cursor="pointer"
            color={theme.colors.gray["300"]}
            ignoreWidth={false}
          />
        ))}
      </Flex>
    )}
  </MainContext.Consumer>
);

export default Buttons;
