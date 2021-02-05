import { requireObjectKeysType } from './validation';

describe('Validation functions', () => {
  describe('requireObjectKeysType', () => {
    it('Should return true', () => {
      const keys = {
        name: 'MoneyIgos',
        pass: 'M00n1g',
      };

      const result = requireObjectKeysType(keys, ['name', 'pass'], 'string');

      expect(result).toBe(true);
    });

    it('Should return false', () => {
      const keys = {
        name: 'MoneyIgos',
        pass: 23,
      };

      const result = requireObjectKeysType(keys, ['name', 'pass'], 'string');

      expect(result).toBe(false);
    });
  });
});
