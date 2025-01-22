function flattenObject(nestedObj, prefix = "") {
  if (typeof nestedObj !== "object" || nestedObj === null) {
    return prefix ? { [prefix]: nestedObj } : nestedObj;
  }

  return Object.entries(nestedObj).reduce((flat, [key, value]) => {
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      return { ...flat, ...flattenObject(value, newKey) };
    }

    return { ...flat, [newKey]: value };
  }, {});
}
