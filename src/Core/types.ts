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

export interface Transformer {
  fn: TransformerFn;
  type: () => string;
}

export type TransformerFn = (array: [number, number]) => [number, number];

export type CanvasOptions = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type TransformOptions = {
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number
};

export interface Coordinate {
  fn: (...args: any[]) => any;
  isPolar: () => boolean;
  isTranspose: () => boolean;
  center: () => number[]
}

export type CoordinateParams = {
  transforms: ((arg: CanvasOptions) => Transformer[])[]
} & Partial<CanvasOptions>;
