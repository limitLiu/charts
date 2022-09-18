import { LinearParams, Scale } from '../types';
import { createLinear } from './linear';
import { nice, ticks } from '../utils';

export function createLog({ domain, base = Math.E, ...rest }: LinearParams<number, number>): Scale {
  const transform = (x: number) => Math.log(x);
  let linear = createLinear({ domain: domain.map(transform), ...rest });
  const fn = (x: number) => linear.fn?.(transform(x)) || 0;

  const ticksFn = (tickCount = 5) => {
    const [min, max] = domain.map(x => log(x, base));
    return ticks(min, max, tickCount).map(x => base ** x);
  };

  const niceFn = () => {
    domain = nice(domain, {
      floor: x => base ** Math.floor(log(x, base)),
      ceil: x => base ** Math.ceil(log(x, base)),
    });
    linear = createLinear({ domain: domain.map(transform), ...rest });
  };
  return { fn, ticks: ticksFn, nice: niceFn };
}

export function log(n: number, base: number) {
  return Math.log(n) / Math.log(base);
}
