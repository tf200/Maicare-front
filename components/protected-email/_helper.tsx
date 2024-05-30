export const getLabelFormvalue = (options, value) => {
  return options.find((item) => item.value == value).label;
};
