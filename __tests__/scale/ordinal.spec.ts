import { createOrdinal } from '../../src/charts/scale';

describe('createOrdinal', () => {
  test('createOrdinal(options) returns a one-to-one scale', () => {
    const s = createOrdinal({
      domain: ['a', 'b', 'c'],
      range: ['red', 'yellow', 'blue'],
    });
    expect(s.fn('a')).toBe('red');
    expect(s.fn('b')).toBe('yellow');
    expect(s.fn('c')).toBe('blue');
  });

  test('Ordinal scale will mode map.', () => {
    const s = createOrdinal({
      domain: ['a', 'b', 'c', 'd', 'e'],
      range: ['red', 'yellow', 'blue'],
    });
    expect(s.fn('d')).toBe('red');
    expect(s.fn('e')).toBe('yellow');
  });
});
