import { createThreshold } from './threshold';
import { DistributionalParams } from '../types';

export function createQuantile<T>({ domain, range, ...rest }: DistributionalParams<T>) {
  const n = range.length - 1;
  const sorted = domain.sort((a, b) => a - b);
  const step = (sorted.length - 1) / (n + 1);
  const quantile = Array(n)
    .fill(0)
    .map((_, index) => {
      const i = (index + 1) * step;
      const i0 = Math.floor(i);
      const i1 = i0 + 1;
      const v0 = sorted[i0];
      const v1 = sorted[i1];
      return v0 * (i1 - i) + v1 * (i - i0);
    });
  return createThreshold({ domain: quantile, range, ...rest });
}
