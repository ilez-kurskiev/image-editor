const setStyle = (prelayer, canvasField, nativeField, value, to) => ({
  ...prelayer,
  styles: {
    canvas: {
      ...prelayer.styles.canvas,
      [canvasField]: !value
        ? value
        : to === "number"
          ? parseInt(value, 10)
          : to === "transform"
            ? value.split("*").join(" ")
            : value
    },
    native: {
      ...prelayer.styles.native,
      [nativeField]: !value
        ? value
        : to === "transform"
          ? value.split("*").slice(-1)[0]
          : value
    }
  }
});

const setCrossStyle = (prelayer, field, value) => {
  switch (field) {
    case "fontFamily":
      return setStyle(prelayer, "fontFamily", "fontFamily", value);

    case "fontSize":
      return setStyle(prelayer, "fontSize", "fontSize", value, "number");

    case "color":
      return setStyle(prelayer, "fill", "color", value);

    case "fontWeight":
      return setStyle(prelayer, "fontStyle", "fontWeight", value, "transform");

    case "fontStyle":
      return setStyle(prelayer, "fontStyle", "fontStyle", value, "transform");

    case "fontDecoration":
      return setStyle(prelayer, "textDecoration", "textDecoration", value);

    case "align":
      return setStyle(prelayer, "align", "textAlign", value);

    default:
      return prelayer;
  }
};

export default (prelayer, field, value) =>
  setCrossStyle(prelayer, field, value);
