import { createThreshold } from './threshold';
import { DistributionalParams } from '../types';

export function createQuantize<T>({ domain: [d0, d1], range, ...rest }: DistributionalParams<T>) {
  const n = range.length - 1;
  const step = (d1 - d0) / (n + 1);
  const quantized = Array(n)
    .fill(0)
    .map((_, i) => step * (i + 1));
  return createThreshold({ domain: quantized, range, ...rest });
}
