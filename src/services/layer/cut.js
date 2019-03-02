import toBlobUrl from "../toBlobUrl";

export default ({ image, width, height, cut }) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = width;
  canvas.height = height;

  ctx.drawImage(image, 0, 0, width, height);
  ctx.clearRect(cut.x, cut.y, cut.width, cut.height);

  const url = toBlobUrl(canvas.toDataURL("image/png"));

  return new Promise(resolve => {
    const cuttedImage = new Image(width, height);

    cuttedImage.src = url;
    cuttedImage.onload = function() {
      resolve({
        url,
        native: cuttedImage
      });
    };
  });
};
