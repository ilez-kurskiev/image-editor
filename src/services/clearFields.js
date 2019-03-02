export default (object, fields) => {
  const newObject = {};

  for (const prop in object) {
    if (!~fields.indexOf(prop)) {
      newObject[prop] = object[prop];
    }
  }

  return newObject;
};
