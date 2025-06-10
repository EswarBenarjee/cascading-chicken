export function parseStyle(styleString) {
  return styleString.split(";").reduce((acc, style) => {
    const [property, value] = style.split(":").map((s) => s && s.trim());
    if (property && value) {
      const camelCaseProperty = property.replace(/-([a-z])/g, (_, char) =>
        char.toUpperCase()
      );
      acc[camelCaseProperty] = value;
    }
    return acc;
  }, {});
}
