import Konva from "konva";

export default layer => {
  const filters = [];
  const { red, green, blue, saturation, luminance } = layer;

  if (
    typeof red === "number" ||
    typeof green === "number" ||
    typeof blue === "number"
  )
    filters.push(Konva.Filters.RGBA);

  if (typeof saturation === "number" || typeof luminance === "number")
    filters.push(Konva.Filters.HSL);

  return filters;
};
