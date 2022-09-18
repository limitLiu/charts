import { createSVGElement, mount, applyAttributes } from '../utils';
import { Context, ShapeParams, SVGOptional, SVGProperty } from '../types';

export function shape(
  tag: keyof SVGElementTagNameMap,
  context: Context,
  attributes: Partial<ShapeParams>,
) {
  const { group } = context;
  const element = createSVGElement(tag);
  applyAttributes(element, attributes);
  if (group) {
    mount(group, element);
  }
  return element;
}

export function line<T extends Partial<SVGProperty>>(context: Context, attributes: SVGOptional<T>) {
  return shape('line', context, { ...attributes, d: '' });
}

export function circle<T extends Partial<SVGProperty>>(
  context: Context,
  attributes: SVGOptional<T>,
) {
  return shape('circle', context, { ...attributes, d: '' });
}

export function text<T extends Partial<SVGProperty>>(context: Context, attributes: SVGOptional<T>) {
  const { text, ...rest } = attributes;
  const textElement = shape('text', context, { ...rest, d: '' });
  textElement.textContent = text || '';
  return textElement;
}

export function rect<T extends Partial<SVGProperty>>(context: Context, attributes: SVGOptional<T>) {
  const { width = 0, height = 0, x = 0, y = 0 } = attributes;
  return shape('rect', context, {
    ...attributes,
    d: '',
    width: Math.abs(width),
    height: Math.abs(height),
    x: width > 0 ? x : x + width,
    y: height > 0 ? y : y + height,
  });
}

export function path<T extends Partial<SVGProperty>>(context: Context, attributes: SVGOptional<T>) {
  const d = attributes.d;
  return shape('path', context, { ...attributes, d: d?.flat().join(' ') || '' });
}

export function ring<T extends Partial<SVGProperty>>(context: Context, attributes: SVGOptional<T>) {
  const { cx, cy, r1 = 0, r2 = 0, ...styles } = attributes;
  const { stroke, strokeWidth, fill } = styles;
  const defaultStrokeWidth = 1;
  const innerStroke = circle(context, {
    fill: 'transparent',
    stroke: stroke || fill,
    strokeWidth,
    cx,
    cy,
    r: r1,
  });

  const ring = circle(context, {
    ...styles,
    strokeWidth: r2 - r1 - (strokeWidth || defaultStrokeWidth),
    stroke: fill,
    fill: 'transparent',
    cx,
    cy,
    r: (r1 + r2) / 2,
  });

  const outerStroke = circle(context, {
    fill: 'transparent',
    stroke: stroke || fill,
    cx,
    cy,
    r: r2,
  });
  return [innerStroke, ring, outerStroke];
}
