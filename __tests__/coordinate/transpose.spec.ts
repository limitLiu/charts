import { cartesian, createCoordinate, transpose } from "../../src/core/coordinate";

describe('transpose', () => {
  test('transpose()', () => {
    const c = createCoordinate({
      width: 200,
      height: 300,
      x: 0,
      y: 0,
      transforms: [transpose(void 0), cartesian(void 0)],
    });

    expect(c.fn([0.5, 1])).toEqual([0, 150]);
    expect(c.fn([0.4, 1])).toEqual([0, 120]);
    expect(c.isPolar()).toBeFalsy();
    expect(c.isTranspose()).toBeTruthy();
  });
});
