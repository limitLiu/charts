import { area as pathArea, line as pathLine, ring as pathRing } from './d';
import { Renderer } from '../types';

export function contour(renderer: Renderer, { points, ...styles }: { points: string[] }) {
  const end = points.length;
  const mid = end / 2;
  const contour = renderer.path({ d: pathArea(points), ...styles, stroke: 'none' });
  const outerStroke = renderer.path({ d: pathLine(points.slice(0, mid)), ...styles, fill: 'none' });
  const innerStroke = renderer.path({
    d: pathLine(points.slice(mid, end)),
    ...styles,
    fill: 'none',
  });
  return [innerStroke, contour, outerStroke];
}

export function ring(
  renderer: Renderer,
  { cx, cy, r1, r2, ...styles }: { cx: number; cy: number; r1: number; r2: number },
) {
  const ring = renderer.path({
    ...styles,
    d: pathRing([
      [cx, cy],
      [r1, r2],
    ]),
    stroke: 'none',
  });
  const innerStroke = renderer.circle({ ...styles, fill: 'none', r: r1, cx, cy });
  const outerStroke = renderer.circle({ ...styles, fill: 'none', r: r2, cx, cy });
  return [innerStroke, ring, outerStroke];
}
