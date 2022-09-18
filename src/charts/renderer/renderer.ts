import { createContext } from './context';
import { line, circle, text, rect, path, ring } from './shape';
import { restore, save, scale, translate, rotate } from './transform';
import { Renderer, SVGOptional, SVGProperty } from '../types';

export function createRenderer(width: number, height: number): Renderer {
  const ctx = createContext(width, height);
  return {
    line: <T extends Partial<SVGProperty>>(opts: SVGOptional<T>) => line(ctx, opts),
    circle: <T extends Partial<SVGProperty>>(opts: SVGOptional<T>) => circle(ctx, opts),
    text: <T extends Partial<SVGProperty>>(opts: SVGOptional<T>) => text(ctx, opts),
    rect: <T extends Partial<SVGProperty>>(opts: SVGOptional<T>) => rect(ctx, opts),
    path: <T extends Partial<SVGProperty>>(opts: SVGOptional<T>) => path(ctx, opts),
    ring: <T extends Partial<SVGProperty>>(opts: SVGOptional<T>) => ring(ctx, opts),
    restore: () => restore(ctx),
    save: () => save(ctx),
    scale: (sx: number, sy: number) => scale(ctx, sx, sy),
    rotate: (theta: number) => rotate(ctx, theta),
    translate: (tx: number, ty: number) => translate(ctx, tx, ty),
    node: () => ctx.node,
    group: () => ctx.group,
  };
}
