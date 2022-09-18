import { createChannels, createChannel } from './channel';
import { createGeometry } from './geometry';
import { link as shapeLink } from './shape';
import { channelStyles } from './style';
import { ChannelValues, Coordinate, Renderer, Scales } from '../types';

const channels = createChannels({
  x1: createChannel({ name: 'x1', optional: false }),
  y1: createChannel({ name: 'y1', optional: false }),
});

function render(
  renderer: Renderer,
  I: number[],
  _: Scales,
  values: Partial<ChannelValues>,
  directStyles: Record<string, string>,
  coordinate: Coordinate,
) {
  const defaults = {};

  const { x: X = [], y: Y = [], x1: X1 = [], y1: Y1 = [] } = values;
  return Array.from(I, i =>
    shapeLink(renderer, coordinate, {
      ...defaults,
      ...directStyles,
      ...channelStyles(i, values),
      x1: X[i],
      y1: Y[i],
      x2: X1[i],
      y2: Y1[i],
    } as any),
  );
}

export const link = createGeometry(channels, render);
