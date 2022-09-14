import { createSVGElement, mount, applyTransform } from '../utils';
import { Context, TransformFn } from '../types';

export function transform(tag: TransformFn, context: Context, ...params: any[]) {
  const { group } = context;
  group && applyTransform(group, `${tag}(${params.join(', ')})`);
}

export function translate(context: Context, tx: number, ty: number) {
  transform('translate', context, tx, ty);
}

export function rotate(context: Context, theta: number) {
  transform('rotate', context, theta);
}

export function scale(context: Context, sx: number, sy: number) {
  transform('scale', context, sx, sy);
}

export function save(context: Context) {
  const { group } = context;
  const newG = createSVGElement('g');
  group && mount(group, newG);
  context.group = newG as SVGGElement;
}

export function restore(context: Context) {
  const { group } = context;
  if (group) {
    const { parentNode } = group;
    context.group = parentNode as SVGGElement;
  }
}
