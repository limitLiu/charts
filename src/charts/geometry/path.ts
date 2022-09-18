import { createChannel, createChannels } from './channel';
import { path as shapePath } from './shape';
import { ChannelValues, Coordinate, Renderer, Scales, Styles } from '../types';
import { channelStyles } from './style';
import { createGeometry } from './geometry';

const channels = createChannels({
  d: createChannel({ name: 'd', optional: false, scale: 'identity' }),
  fill: createChannel({ name: 'fill' }),
  stroke: createChannel({ name: 'stroke' }),
});

function render(
  renderer: Renderer,
  I: number[],
  _: Scales,
  values: Partial<ChannelValues>,
  directStyles: Styles,
  coordinate: Coordinate,
) {
  const defaults = {};
  const { d: D } = values;

  return Array.from(I, i =>
    shapePath(renderer, coordinate, {
      ...defaults,
      ...directStyles,
      ...channelStyles(i, values),
      d: D?.[i] || [],
    } as any),
  );
}

export const path = createGeometry(channels, render);
