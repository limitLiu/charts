import { createIdentity } from '../../src/core/scale';

describe('identity', () => {
  test('identity()', () => {
    const i = createIdentity();
    expect(i(1)).toBe(1);
    expect(i(true)).toBe(true);
    expect(i('hello')).toBe('hello');
    expect(i({ a: 1 })).toEqual({ a: 1 });
  });
});
