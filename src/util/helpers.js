export function toId(val) {
  return val
    .trim()
    .toLowerCase()
    .replace(" ", "-");
}
