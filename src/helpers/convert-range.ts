const convertRange = (start: number, end: number) => {
  const newStart = start * 10 + 1;
  const newEnd = Math.max(newStart + 9, end);
  return [newStart, newEnd];
};

export default convertRange;
