import {
  Channels,
  ChannelValues,
  Coordinate,
  Geometry,
  Renderer,
  RenderFn,
  Scales,
} from '../types';

export function createGeometry(channels: Channels, render: RenderFn): Geometry {
  const fn = (
    renderer: Renderer,
    I: number[],
    scales: Scales,
    values: Partial<ChannelValues>,
    styles: Record<string, string>,
    coordinate: Coordinate,
  ) => {
    for (const [key, { optional, scale }] of Object.entries(channels)) {
      if (!optional) {
        if (!values[key]) throw new Error(`Missing Channel: ${key}.`);
        if (scale === 'band' && (!scales[key] || !scales[key].bandWidth)) {
          throw new Error(`${key} channel needs band scale.`);
        }
      }
    }
    return render(renderer, I, scales, values, styles, coordinate);
  };
  return { fn, channels: () => channels };
}
