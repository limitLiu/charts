import { createTime, interpolateNumber } from '../../src/charts/scale';

describe('createTime', () => {
  test('createTime(options) returns scale map Date linearly', () => {
    const s = createTime({
      domain: [new Date(2000, 0, 1), new Date(2000, 0, 2)],
      range: [0, 960],
      interpolate: interpolateNumber,
    });

    expect(s.fn(new Date(2000, 0, 1, 5))).toBe(200);
    expect(s.fn(new Date(2000, 0, 1, 16))).toBe(640);
    expect(s.fn(new Date(2000, 0, 2))).toBe(960);
  });
});
