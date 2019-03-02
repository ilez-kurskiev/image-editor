export default (width, height) => ({
  x: window.innerWidth > width ? (window.innerWidth - width) / 2 : 0,
  y: window.innerHeight > height ? (window.innerHeight - height) / 2 : 0
});
