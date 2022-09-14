import { LinearParams } from '../types';
import { createLinear } from './linear';
import { nice, ticks } from '../utils';

export function createLog<T>({ domain, base = Math.E, ...rest }: LinearParams<number, T>) {
  const transform = (x: number) => Math.log(x);
  let linear = createLinear({ domain: domain.map(transform), ...rest });
  const scale = (x: number) => linear(transform(x));

  scale.ticks = (tickCount = 5) => {
    const [min, max] = domain.map(x => log(x, base));
    return ticks(min, max, tickCount).map(x => base ** x);
  };

  scale.nice = () => {
    domain = nice(domain, {
      floor: x => base ** Math.floor(log(x, base)),
      ceil: x => base ** Math.ceil(log(x, base)),
    });
    linear = createLinear({ domain: domain.map(transform), ...rest });
  };
  return scale;
}

export function log(n: number, base: number) {
  return Math.log(n) / Math.log(base);
}
