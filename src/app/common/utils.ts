export function getEnumNames(enumInstance) {
  const enumKeys = Object.keys(enumInstance);

  return enumKeys.splice(enumKeys.length / 2).map(key => ({
    value: enumInstance[key],
    name: key,
  }));
}
