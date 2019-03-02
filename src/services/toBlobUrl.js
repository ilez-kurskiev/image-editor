export default (dataURI, type) => {
  if (!dataURI) return false;

  // convert base64 to raw binary data held in a string
  const [first, last] = dataURI.split(",");
  const byteString = window.atob(last);
  const contentType = first.split(":")[1].split(";")[0];

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return (window.URL || window.webkitURL).createObjectURL(
    new Blob([ab], {
      type: type || contentType
    })
  );
};
