import { normalize, tickStep, nice, floor, ceil, ticks } from '../utils';
import { LinearParams, Scale } from '../types';

export function createLinear<T>({
  domain: [d0, d1],
  range: [r0, r1],
  interpolate,
}: LinearParams<number, T>): Scale {
  const fn = (x: number) => {
    const t = normalize(x, d0, d1);
    return interpolate?.(t, r0, r1);
  };
  const ticksFn = (tickCount: number) => ticks(d0, d1, tickCount);
  const niceFn = (tickCount = 0) => {
    const step = tickStep(d0, d1, tickCount);
    [d0, d1] = nice([d0, d1], {
      floor: x => floor(x, step),
      ceil: x => ceil(x, step),
    });
  };
  return { fn, ticks: ticksFn, nice: niceFn };
}

export function interpolateNumber(t: number, start: number, stop: number): number {
  return start * (1 - t) + stop * t;
}
