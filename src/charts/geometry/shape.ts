import { ChannelValues, Coordinate, Renderer } from '../types';
import { line as pathLine, area as pathArea, sector as pathSector } from './d';
import { contour, ring } from './primitive';
import { dist, equal, sub } from '../utils/geometry';

export function circle(
  renderer: Renderer,
  coordinate: Coordinate,
  { cx, cy, r, ...styles }: Partial<ChannelValues>,
) {
  const [px, py] = coordinate.fn([cx, cy]);
  return renderer.circle({ cx: px, cy: py, r, ...styles } as any);
}

export function text(
  renderer: Renderer,
  coordinate: Coordinate,
  { x, y, rotate, text, ...styles }: Partial<ChannelValues>,
) {
  const [px, py] = coordinate.fn([x, y]);
  renderer.save();
  renderer.translate(px, py);
  renderer.rotate(rotate);
  const textEle = renderer.text({ text, x: 0, y: 0, ...styles } as any);
  renderer.restore();
  return textEle;
}

export function link(
  renderer: Renderer,
  coordinate: Coordinate,
  { x1, y1, x2, y2, ...styles }: Partial<ChannelValues>,
) {
  const [p0, p1] = [
    [x1, y1],
    [x2, y2],
  ].map(coordinate.fn);
  return renderer.line({ x1: p0[0], y1: p0[1], x2: p1[0], y2: p1[1], ...styles } as any);
}

export function line(
  renderer: Renderer,
  coordinate: Coordinate,
  { X = [], Y = [], I: I0 = [], ...styles }: Partial<ChannelValues>,
) {
  const I = coordinate.isPolar() ? [...I0, I0[0]] : I0;
  const points = I.map(i => coordinate.fn([X[i], Y[i]]));
  const d = pathLine(points);
  return renderer.path({ d, ...styles } as any);
}

export function area(
  renderer: Renderer,
  coordinate: Coordinate,
  { X1 = [], Y1 = [], X2 = [], Y2 = [], I: I0 = [], ...styles }: Partial<ChannelValues>,
) {
  const I = coordinate.isPolar() ? [...I0, I0[0]] : I0;
  const points = [...I.map(i => [X1[i], Y1[i]]), ...I.map(i => [X2[i], Y2[i]]).reverse()].map(
    coordinate.fn,
  );

  if (coordinate.isPolar()) {
    return contour(renderer, { points, ...styles });
  }
  return renderer.path({ d: pathArea(points), ...styles } as any);
}

export function rect(
  renderer: Renderer,
  coordinate: Coordinate,
  { x1, y1, x2, y2, ...styles }: Partial<ChannelValues>,
) {
  const v0 = [x1, y1];
  const v1 = [x2, y1];
  const v2 = [x2, y2];
  const v3 = [x1, y2];

  const vs = coordinate.isTranspose() ? [v3, v0, v1, v2] : [v0, v1, v2, v3];
  const ps = vs.map(coordinate.fn);
  const [p0, p1, p2, p3] = ps;
  if (!coordinate.isPolar()) {
    const [width, height] = sub(p2, p0);
    const [x, y] = p0;
    return renderer.rect({ x, y, width, height, ...styles } as any);
  }

  const center = coordinate.center();
  const [cx, cy] = center;
  if (!(equal(p0, p1) && equal(p2, p3))) {
    return renderer.path({ d: pathSector([center, ...ps]), ...styles } as any);
  }

  const r1 = dist(center, p2);
  const r2 = dist(center, p0);

  return ring(renderer, { cx, cy, r1, r2, ...styles });
}

export function path(renderer: Renderer, _: Coordinate, others: Partial<ChannelValues>) {
  return renderer.path({ ...others } as any);
}
