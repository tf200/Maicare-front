export function cleanQueryParams(params: Record<string, unknown>) {
  return Object.keys(params).reduce((acc, key) => {
    if (
      params[key] !== "" &&
      params[key] !== null &&
      params[key] !== undefined
    ) {
      acc[key] = params[key];
    }
    return acc;
  }, {});
}
