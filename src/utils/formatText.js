export function wrapNamesInSpan(namesString) {
  if (!namesString) return ""

  return namesString
    .split(",") // Split by comma
    .map((name, index, arr) => {
      const trimmedName = name.trim()
      return index < arr.length - 1
        ? `<span class="name">${trimmedName},</span>` // Add comma inside the span
        : `<span class="name">${trimmedName}</span>` // No comma for last item
    })
    .join(" ") // Add space between spans
}

export function replaceUnderscoresWithSpaces(text) {
  if (!text) return ""
  return text.replace(/_/g, " ") // Replace all underscores with spaces
}
