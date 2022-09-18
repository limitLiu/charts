import { createLinear } from './linear';
import { Scale, TimeParams } from '../types';

export function createTime<T>({ domain, ...rest }: TimeParams<T>): Scale {
  const transform = (x: Date) => x.getTime();
  const transformedDomain = domain.map(transform);
  const linear = createLinear({ domain: transformedDomain, ...rest });
  const fn = (x: Date) => linear.fn(transform(x));
  const nice = (tickCount = 0) => linear.nice?.(tickCount);
  const ticks = (tickCount: number) => (linear.ticks?.(tickCount) || []).map(d => new Date(d));
  return { fn, ticks, nice };
}
