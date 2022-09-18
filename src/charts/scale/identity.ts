import { Scale } from '../types';

export function createIdentity<T>(): Scale {
  return { fn: (x: T): T => x };
}
