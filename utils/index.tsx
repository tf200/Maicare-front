export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function parseGoalIds(str: string) {
  // e.g str = "1,2,3"
  return str.split(",").map(Number);
}
