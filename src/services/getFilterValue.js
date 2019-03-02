const filters = {
  red: 256,
  green: 256,
  blue: 256,
  alpha: 1,
  saturation: 5,
  luminance: 1
};

export default (filter, value) => (filters[filter] / 100) * value;
