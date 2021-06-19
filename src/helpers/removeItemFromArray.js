export const removeItemFromArray = (item, array) => {
  const idx = array.indexOf(item);
  return [
    ...array.slice(0, idx),
    ...array.slice(idx + 1),
  ];
};
