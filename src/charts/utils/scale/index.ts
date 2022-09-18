import { Domain, MathLike, OrdinalParams } from '../../types';

export function normalize(value: number, start: number, stop: number) {
  return (value - start) / (stop - start);
}

export function tickStep(min: number, max: number, count: number) {
  const e10 = Math.sqrt(50);
  const e5 = Math.sqrt(10);
  const e2 = Math.sqrt(2);

  const step0 = Math.abs(max - min) / Math.max(0, count);
  let step1 = 10 ** Math.floor(Math.log(step0) / Math.LN10);
  const error = step0 / step1;
  if (error >= e10) {
    step1 *= 10;
  } else if (error >= e5) {
    step1 *= 5;
  } else if (error >= e2) {
    step1 *= 2;
  }
  return step1;
}

export function ticks(min: number, max: number, count: number) {
  const step = tickStep(min, max, count);
  const start = Math.ceil(min / step);
  const stop = Math.floor(max / step);
  const n = Math.ceil(stop - start + 1);
  return Array(n)
    .fill(0)
    .map((_, i) => {
      return round((start + i) * step);
    });
}

export function round(n: number) {
  return Math.round(n * 1e12) / 1e12;
}

export function nice<T extends number>(domain: Domain<T>, interval: MathLike) {
  const [min, max] = domain;
  return [interval.floor(min), interval.ceil(max)];
}

export function ceil(n: number, base: number) {
  return base * Math.ceil(n / base);
}

export function floor(n: number, base: number) {
  return base * Math.floor(n / base);
}

export function band<T, U extends number>({ domain, range, padding }: OrdinalParams<T, U>) {
  const [r0, r1] = range;
  const n = domain.length;
  const step = (r1 - r0) / (n + (padding || 0));
  const bandWidth = step * (1 - (padding || 0));
  const interval = step - bandWidth;
  const x = (_: unknown, i: number) => r0 + interval + step * i;
  return {
    step,
    bandWidth,
    bandRange: Array(n).fill(0).map(x),
  };
}

export function binarySearch(array: number[], x: number, lo = 0, hi = array.length) {
  let i = lo;
  let j = hi;
  while (i < j) {
    const mid = (i + j) >>> 1;
    if (array[mid] < x) {
      i = mid + 1;
    } else {
      j = mid;
    }
  }
  return i;
}
