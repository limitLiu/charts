import { DistributionalParams } from '../types';
import { binarySearch } from '../utils/scale';

export function createThreshold<T>({ domain, range }: DistributionalParams<T>) {
  const n = Math.min(domain.length, range.length - 1);
  const scale = (x: number) => {
    const index = binarySearch(domain, x);
    return range[index === -1 ? n : index];
  };
  scale.thresholds = () => domain;
  return scale;
}
