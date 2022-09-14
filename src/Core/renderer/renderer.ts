import { createContext } from './context';
import { line, circle, text, rect, path, ring } from './shape';
import { restore, save, scale, translate, rotate } from './transform';

export function createRenderer(width: number, height: number) {
  const ctx = createContext(width, height);
  return {
    line: (opts: Record<string, any>) => line(ctx, opts),
    circle: (opts: Record<string, any>) => circle(ctx, opts),
    text: (opts: Record<string, any>) => text(ctx, opts),
    rect: (opts: Record<string, any>) => rect(ctx, opts),
    path: (opts: Record<string, any>) => path(ctx, opts),
    ring: (opts: Record<string, any>) => ring(ctx, opts),
    restore: () => restore(ctx),
    save: () => save(ctx),
    scale: (sx: number, sy: number) => scale(ctx, sx, sy),
    rotate: (theta: number) => rotate(ctx, theta),
    translate: (tx: number, ty: number) => translate(ctx, tx, ty),
    node: () => ctx.node,
    group: () => ctx.group,
  };
}
