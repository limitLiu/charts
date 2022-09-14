export type Context = {
  node?: SVGElement;
  group?: SVGGElement;
};

export type TransformFn = 'scale' | 'translate' | 'rotate';

export type Domain<T> = T[];

export type Range<T> = T[];

export interface MathLike {
  floor: (n: number) => number;

  ceil: (n: number) => number;
}

export type LinearParams<T, U> = {
  domain: Domain<T>;
  range: Range<U>;
  base?: number;
  interpolate?: (t: number, start: U, stop: U) => U;
};

export type OrdinalParams<T, U> = { domain: Domain<T>; range: Range<U>; padding?: number };

export type TimeParams<U> = LinearParams<Date, U>;

export type DistributionalParams<T> = { domain: number[]; range: T[] };
