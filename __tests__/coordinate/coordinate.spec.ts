import { createCoordinate } from "../../src/core/coordinate";

describe('coordinate', () => {
  test('createCoordinate(options) returns a identity function without transforms', () => {
    const c = createCoordinate({
      transforms: [],
    });

    expect(c.fn(1)).toBe(1);
    expect(c.fn(2)).toBe(2);
  });
});
