// In future there will be another functions

// eslint-disable-next-line import/prefer-default-export
export const requireObjectKeysType = (
  obj: any,
  keys: string[],
  expectedType: string = 'string'
): boolean => keys.every(key => typeof obj[key] === expectedType);
