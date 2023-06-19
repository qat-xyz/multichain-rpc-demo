export const getPropertyByPath = (obj: any, path: string[]): any | undefined => {
  const prop = path.shift();

  if (prop && obj.hasOwnProperty(prop)) {
    const value = obj[prop];
    return path.length === 0 ? value : getPropertyByPath(value, path);
  }

  return undefined;
};
