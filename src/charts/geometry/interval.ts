import { createChannel, createChannels } from './channel';
import { ChannelValues, Coordinate, Renderer, Scales } from '../types';
import { channelStyles } from './style';
import { rect } from './shape';
import { createGeometry } from './geometry';

const channels = createChannels({
  x: createChannel({ name: 'x', scale: 'band', optional: false }),
  y1: createChannel({ name: 'y1', optional: false }),
  z: createChannel({ name: 'z', scale: 'band' }),
});

function render(
  renderer: Renderer,
  I: number[],
  scales: Scales,
  values: Partial<ChannelValues>,
  directStyles: Record<string, string>,
  coordinate: Coordinate,
) {
  const defaults = {
    x: 0,
    z: 0,
  };
  const { x, z } = scales;
  const { x: X = [], y: Y = [], y1: Y1 = [], z: Z = [] } = values;
  const groupWidth = x.bandWidth?.() || 0;
  const intervalWidth = z ? z.bandWidth?.() || 0 : 1;
  const width = groupWidth * intervalWidth;
  return Array.from(I, i => {
    const { z: dz, x: dx, ...restDefaults } = defaults;
    const offset = (Z[i] || dz) * groupWidth;
    const x1 = (X[i] || dx) + offset;
    return rect(renderer, coordinate, {
      ...restDefaults,
      ...directStyles,
      ...channelStyles(i, values),
      x1,
      y1: Y[i],
      x2: x1 + width,
      y2: Y1[i],
    } as any);
  });
}

export const interval = createGeometry(channels, render);
