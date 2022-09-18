import { createChannel, createChannels } from './channel';
import { rect } from './shape';
import { channelStyles } from './style';
import { createGeometry } from './geometry';
import { ChannelValues, Coordinate, Renderer, Scales } from '../types';

const channels = createChannels({
  x: createChannel({ name: 'x', scale: 'band', optional: false }),
  y: createChannel({ name: 'y', scale: 'band', optional: false }),
});

function render(
  renderer: Renderer,
  I: number[],
  scales: Scales,
  values: Partial<ChannelValues>,
  directStyles: Record<string, string>,
  coordinate: Coordinate,
) {
  const defaults = {};
  const { x, y } = scales;
  const { x: X = [], y: Y = [] } = values;
  const width = x.bandWidth?.() || 0;
  const height = y.bandWidth?.() || 0;

  return Array.from(I, i => {
    return rect(renderer, coordinate, {
      ...defaults,
      ...directStyles,
      ...channelStyles(i, values),
      x1: X[i],
      y1: Y[i],
      x2: X[i] + width,
      y2: Y[i] + height,
    } as any);
  });
}

export const cell = createGeometry(channels, render);
