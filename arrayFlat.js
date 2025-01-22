function flattenArray(nestedArray, depth = Infinity) {
  if (!Array.isArray(nestedArray)) return nestedArray;
  if (depth === 0) return nestedArray;

  return nestedArray.reduce((flat, current) => {
    if (Array.isArray(current) && depth > 0) {
      return flat.concat(flattenArray(current, depth - 1));
    }

    return flat.concat(current);
  }, []);
}
