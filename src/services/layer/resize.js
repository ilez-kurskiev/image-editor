import toBlobUrl from "../toBlobUrl";

export default ({ image, width, height }, withImage) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0, width, height);

  const url = toBlobUrl(canvas.toDataURL("image/png"));

  if (!withImage) {
    return url;
  }

  return new Promise(resolve => {
    const resizedImage = new Image(width, height);

    resizedImage.src = url;
    resizedImage.onload = function() {
      resolve({
        base64: url,
        image: resizedImage
      });
    };
  });
};
