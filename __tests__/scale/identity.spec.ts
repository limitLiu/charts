import { createIdentity } from '../../src/charts/scale';

describe('identity', () => {
  test('identity()', () => {
    const i = createIdentity();
    expect(i.fn(1)).toBe(1);
    expect(i.fn(true)).toBe(true);
    expect(i.fn('hello')).toBe('hello');
    expect(i.fn({ a: 1 })).toEqual({ a: 1 });
  });
});
