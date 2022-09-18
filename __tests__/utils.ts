import { cartesian, createCoordinate } from '../src/charts/coordinate';
import { createRenderer } from '../src/charts/renderer';
import {
  CanvasOptions,
  ChannelValues,
  Geometry,
  Scales,
  Shape,
  Styles,
  Transformer,
} from '../src/charts/types';

export function createDiv() {
  const div = document.createElement('div');
  document.body.appendChild(div);
  return div;
}

export function mount(parent: HTMLElement, child?: Node) {
  if (parent && child) {
    parent.appendChild(child);
  }
}

export function getAttributes(node: SVGElement, attributes: string[]) {
  return attributes.reduce((acc: Record<string, any>, cur: string) => {
    acc[cur] = node.getAttribute(cur);
    return acc;
  }, {});
}

type PlotParams = {
  width?: number;
  height?: number;
  index: number[];
  geometry: Geometry;
  scales: Scales;
  channels: Partial<ChannelValues>;
  transforms?: ((arg: CanvasOptions) => Transformer[])[];
  styles: Styles;
  get?: (d: Shape[]) => Shape;
};

export function plot({
  index,
  width = 600,
  height = 400,
  scales,
  channels,
  styles,
  geometry,
  transforms = [cartesian(void 0)],
  get = (d: Shape[]) => d[0],
}: PlotParams) {
  const renderer = createRenderer(width, height);
  const coordinate = createCoordinate({
    width,
    height,
    x: 0,
    y: 0,
    transforms,
  });
  const shapes = geometry.fn(renderer, index, scales, channels, styles, coordinate);
  mount(createDiv(), renderer.node());
  const shape = get(shapes) as SVGElement;
  return {
    toHasAttributes(expectedAttributes: Record<string, string>) {
      const keys = Object.keys(expectedAttributes);
      const renderedAttributes = keys.reduce((o, k) => {
        o[k] = shape.getAttribute(k) || '';
        return o;
      }, {} as Record<string, string>);
      if (keys.indexOf('tagName') !== -1) {
        renderedAttributes.tagName = shape.tagName;
      }
      expect(renderedAttributes).toEqual(expectedAttributes);
    },
  };
}
