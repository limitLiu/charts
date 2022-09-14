import { createSVGElement, mount, applyAttributes } from '../utils';
import { Context } from '../types';

export function shape(
  tag: keyof SVGElementTagNameMap,
  context: Context,
  attributes: Record<string, any>,
) {
  const { group } = context;
  const element = createSVGElement(tag);
  applyAttributes(element, attributes);
  if (group) {
    mount(group, element);
  }
  return element;
}

export function line(context: Context, attributes: Record<string, any>) {
  return shape('line', context, attributes);
}

export function circle(context: Context, attributes: Record<string, any>) {
  return shape('circle', context, attributes);
}

export function text(context: Context, attributes: Record<string, any>) {
  const { text, ...rest } = attributes;
  const textElement = shape('text', context, rest);
  textElement.textContent = text;
  return textElement;
}

export function rect(context: Context, attributes: Record<string, any>) {
  const { width, height, x, y } = attributes;
  return shape('rect', context, {
    ...attributes,
    width: Math.abs(width),
    height: Math.abs(height),
    x: width > 0 ? x : x + width,
    y: height > 0 ? y : y + height,
  });
}

export function path(context: Context, attributes: Record<string, any>) {
  const d: (string | number)[][] = attributes.d;
  return shape('path', context, { ...attributes, d: d.flat().join(' ') });
}

export function ring(context: Context, attributes: Record<string, any>) {
  const { cx, cy, r1, r2, ...styles } = attributes;
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
