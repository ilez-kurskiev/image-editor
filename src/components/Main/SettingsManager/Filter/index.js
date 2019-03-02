import { StyledFilter } from "./styled";
import Slider from "./Slider";
import Button from "Button";
import { MainContext } from "context";

const Filter = () => (
  <MainContext.Consumer>
    {({ onFilterLayer, onUpdateLayerByFilter }) => (
      <StyledFilter>
        {["red", "green", "blue", "saturation", "luminance"].map(color => (
          <Slider
            key={color}
            group="filters"
            name={color}
            onChange={onFilterLayer}
            title={Translation[color]}
          />
        ))}
        <Button
          justify="center"
          useDefaultStyles
          onClick={onUpdateLayerByFilter}
          text={Translation.apply}
          ignoreWidth={false}
        />
      </StyledFilter>
    )}
  </MainContext.Consumer>
);

export default Filter;
