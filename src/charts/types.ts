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

export interface Scale {
  fn: (...args: any[]) => any;
  bandWidth?: () => number;
  step?: () => number;
  ticks?: (t: number) => (Date | number)[];
  nice?: (t?: number) => void;
  thresholds?: () => number[];
}

export type Scales = Record<string, Scale>;

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
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
};

export interface Coordinate {
  fn: (...args: any[]) => any;
  isPolar: () => boolean;
  isTranspose: () => boolean;
  center: () => number[];
}

export type CoordinateParams = {
  transforms: ((arg: CanvasOptions) => Transformer[])[];
} & Partial<CanvasOptions>;

export type Shape = SVGElement | SVGElement[];

export interface Geometry {
  fn: (renderer: Renderer, index: number[], ...args: any[]) => Shape[];
  channels: () => Partial<Channels>;
}

export interface Channel {
  name: string;
  optional?: boolean;
  scale?: string;
}

export type Channels = {
  [P: string]: Channel;
};

export type ChannelValues = {
  x: number[];
  y: number[];
  x1: number[];
  y1: number[];
  fill: string[];
  stroke: string[];
  I: number[];
  X: number[];
  Y: number[];
  [K: string]: any;
};

export type Styles = Record<string, string | number>;

export interface SVGProperty {
  x: number;
  y: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  cx: number;
  cy: number;
  r: number;
  dx: number;
  dy: number;
  rotate: string;
  lengthAdjust: string;
  textLength: string;
  text: string;
  fontSize: number;
  fill: string;
  fontFamily: string;
  pathLength: number;
  stroke: string;
  width: number;
  height: number;
  d: (string | number)[][];
  strokeWidth: number;
  r1: number;
  r2: number;
}

export type SVGOptional<T extends Partial<SVGProperty>> = Pick<T, keyof SVGProperty>;

export type ShapeParams = Omit<SVGProperty, 'd'> & { d?: string };

export interface Renderer {
  line: <T extends Partial<SVGProperty>>(opts: SVGOptional<T>) => SVGElement;
  circle: <T extends Partial<SVGProperty>>(opts: SVGOptional<T>) => SVGElement;
  text: <T extends Partial<SVGProperty>>(opts: SVGOptional<T>) => SVGElement;
  rect: <T extends Partial<SVGProperty>>(opts: SVGOptional<T>) => SVGElement;
  path: <T extends Partial<SVGProperty>>(opts: SVGOptional<T>) => SVGElement;
  ring: <T extends Partial<SVGProperty>>(opts: SVGOptional<T>) => SVGElement[];
  restore: () => void;
  save: () => void;
  scale: (sx: number, sy: number) => void;
  rotate: (theta: number) => void;
  translate: (tx: number, ty: number) => void;
  node: () => SVGElement | undefined;
  group: () => SVGGElement | undefined;
}

export type RenderFn = (
  renderer: Renderer,
  I: number[],
  scales: Scales,
  values: any,
  styles: any,
  coordinate: Coordinate,
) => Shape[];
