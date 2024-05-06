export default function convertLineBreak(str) {
  if (str.includes("\n")) {
    return str
      .split("\n")
      .map((text) => `<p>${text}</p>`)
      .join("")
      .trim();
  }
  return str.trim();
}
