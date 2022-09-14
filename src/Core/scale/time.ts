import { createLinear } from './linear';
import { TimeParams } from '../types';

export function createTime<T>({ domain, ...rest }: TimeParams<T>) {
  const transform = (x: Date) => x.getTime();
  const transformedDomain = domain.map(transform);
  const linear = createLinear({ domain: transformedDomain, ...rest });
  const scale = (x: Date) => linear(transform(x));
  scale.nice = (tickCount: number) => linear.nice(tickCount);
  scale.ticks = (tickCount: number) => linear.ticks(tickCount).map(d => new Date(d));
  return scale;
}
