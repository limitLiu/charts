import { createChannel, createChannels } from './channel';
import { channelStyles } from './style';
import { circle } from './shape';
import { ChannelValues, Coordinate, Renderer, Scales } from '../types';

export function point(
  renderer: Renderer,
  I: number[],
  _: Scales,
  channels: Partial<ChannelValues>,
  directStyles: Record<string, string>,
  coordinate: Coordinate,
) {
  const defaults = {
    r: 3,
    fill: 'none',
  };

  const { x: X = [], y: Y = [], r: R = [] } = channels;

  return Array.from(I, i => {
    const { r: dr, ...restDefaults } = defaults;
    const r = R[i] || dr;
    return circle(renderer, coordinate, {
      ...restDefaults,
      ...directStyles,
      ...channelStyles(i, channels),
      cx: X[i],
      cy: Y[i],
      r,
    } as any);
  });
}

point.channels = () =>
  createChannels({
    r: createChannel({ name: 'r' }),
  });
