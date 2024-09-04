export const isPropertySetInCss = (css, selector, property, value) => {
  // convert to string remove spaces and change to lowercase
  css = removeSpacesAndLowerCase(css);
  property = removeSpacesAndLowerCase(property);
  value = removeSpacesAndLowerCase(value);

  // generate the properties object for the selector
  const properties = {};
  const parts = css.split(selector + '{');
  const subPart = parts[1].split('}');
  const propertiesRaw = subPart[0].split(';');
  propertiesRaw.forEach((item) => {
    const colonIndex = item.indexOf(':');
    const prop = item.slice(0, colonIndex);
    const value = item.slice(colonIndex + 1);
    properties[prop] = value;
  });

  //check value
  if (properties[property] && properties[property] == value) {
    return true;
  }
  return properties[property];
};

const removeSpacesAndLowerCase = (str) => {
  return str
    .toString()
    .replaceAll(/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, '')
    .replaceAll(/(?:\r\n|\r|\n| )/g, '')
    .toLowerCase();
};
