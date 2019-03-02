import createImageLayer from "./image";
import createTextLayer from "./text";

export default (layerType, ...args) => {
  switch (layerType) {
    case "image":
      return createImageLayer(...args);

    case "text":
      return createTextLayer();

    default:
      return createImageLayer(...args);
  }
};
