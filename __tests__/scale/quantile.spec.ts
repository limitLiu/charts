import { createQuantile } from '../../src/charts/scale';

describe('createQuantile', () => {
  test('createQuantile(options) finds right interval based on rank and returns corresponding value in range', () => {
    const s = createQuantile({
      domain: [3, 6, 7, 8, 8, 10, 13, 15, 16, 20],
      range: ['a', 'b', 'c', 'd'],
    });

    expect(s.fn(3)).toBe('a');
    expect(s.fn(7.1)).toBe('a');
    expect(s.fn(8)).toBe('b');
    expect(s.fn(8.9)).toBe('b');
    expect(s.fn(9)).toBe('b');
    expect(s.fn(13)).toBe('c');
    expect(s.fn(14.9)).toBe('d');
    expect(s.fn(20)).toBe('d');
  });
});
