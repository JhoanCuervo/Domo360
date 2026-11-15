const DeletePropierties = <
  T extends Record<string, unknown>,
  K extends keyof T = never,
>(
  jsonData: T,
  properties?: K[],
): Omit<T, K> => {
  const result = { ...jsonData };
  properties &&
    properties.forEach((property) => {
      delete result[property];
    });

  delete result._rowIndex;
  delete result._delete;
  delete result._save;

  return result;
};

export default DeletePropierties;
