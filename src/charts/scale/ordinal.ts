import { OrdinalParams, Scale } from '../types';

export function createOrdinal<T, U>({ domain, range }: OrdinalParams<T, U>): Scale {
  const map = new Map(domain.map((d, i) => [d, i]));
  return {
    fn: (x: T) => {
      const index = map.get(x) || 0;
      return range[index % range.length];
    },
  };
}
