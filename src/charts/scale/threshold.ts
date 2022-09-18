import { DistributionalParams, Scale } from '../types';
import { binarySearch } from '../utils/scale';

export function createThreshold<T>({ domain, range }: DistributionalParams<T>): Scale {
  const n = Math.min(domain.length, range.length - 1);
  const fn = (x: number) => {
    const index = binarySearch(domain, x);
    return range[index === -1 ? n : index];
  };
  const thresholds = () => domain;
  return { fn, thresholds };
}
