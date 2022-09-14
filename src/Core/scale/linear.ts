import { normalize, tickStep, nice, floor, ceil, ticks } from '../utils';
import { LinearParams } from '../types';

export function createLinear<T>({
  domain: [d0, d1],
  range: [r0, r1],
  interpolate,
}: LinearParams<number, T>) {
  const scale = (x: number) => {
    const t = normalize(x, d0, d1);
    return interpolate?.(t, r0, r1);
  };
  scale.ticks = (tickCount: number) => ticks(d0, d1, tickCount);
  scale.nice = (tickCount: number) => {
    const step = tickStep(d0, d1, tickCount);
    [d0, d1] = nice([d0, d1], {
      floor: x => floor(x, step),
      ceil: x => ceil(x, step),
    });
  };
  return scale;
}

export function interpolateNumber(t: number, start: number, stop: number): number {
  return start * (1 - t) + stop * t;
}
