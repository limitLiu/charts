import { createCoordinate } from "../../src/core/coordinate";
import { cartesian } from "../../src/core/coordinate";

describe('cartesian', () => {
  test('cartesian()', () => {
    const c = createCoordinate({
      width: 200,
      height: 300,
      x: 0,
      y: 0,
      transforms: [cartesian(void 0)],
    });
    expect(c.fn([0.5, 0.5])).toEqual([100, 150]);
    expect(c.isPolar()).toBeFalsy();
    expect(c.isTranspose()).toBeFalsy();
  });
});
