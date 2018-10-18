export const stripData = (entities) => {
  return entities.map(({ data }) => data);
};

export const generateId = (name: string) => {
  return name.replace(/[\s\(\).\[\]{\};]/gi, '_');
};