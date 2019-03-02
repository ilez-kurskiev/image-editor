import resize from "./resize";
import getCenterPosition from "../getCenterPosition";

const calculateImageSizeByRatio = (width, height) => {
  const widthRatio = window.innerWidth / width;
  const heightRatio = window.innerHeight / height;
  const ratio = Math.min(widthRatio, heightRatio);

  return [width * ratio, height * ratio];
};

const createImageWithSettings = url =>
  new Promise(resolve => {
    const nativeImage = new Image();

    nativeImage.src = url;
    nativeImage.onload = function() {
      const { width, height } = this;
      const { x, y } = getCenterPosition(width, height);

      // If image is large
      if (window.innerWidth < width || window.innerHeight < height) {
        const [calculatedWidth, calculatedHeight] = calculateImageSizeByRatio(
          width,
          height
        );

        const { x, y } = getCenterPosition(calculatedWidth, calculatedHeight);
        const newNativeImage = new Image(calculatedWidth, calculatedHeight);

        newNativeImage.src = resize({
          image: nativeImage,
          width: calculatedWidth,
          height: calculatedHeight
        });

        newNativeImage.onload = function() {
          resolve({
            native: newNativeImage,
            width: calculatedWidth,
            height: calculatedHeight,
            x,
            y
          });
        };

        return;
      }

      // If image is normal
      resolve({
        native: nativeImage,
        width,
        height,
        x,
        y
      });
    };
  });

export default async (image /* , isFirst */) => {
  const id = Date.now();
  const isVisible = true;
  const url = (window.URL || window.webkitURL).createObjectURL(image);
  const {
    width,
    height,
    x,
    y,
    ...imageWithSettings
  } = await createImageWithSettings(url);
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  return {
    id,
    isVisible,
    url,
    width,
    height,
    type: "image",
    offsetX: halfWidth,
    offsetY: halfHeight,
    x: x + halfWidth,
    y: y + halfHeight,
    selected: true,
    ...imageWithSettings
  };
};
