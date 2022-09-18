import { createChannel, createChannels } from './channel';
import { createGeometry } from './geometry';
import { text as shapeText } from './shape';
import { ChannelValues, Coordinate, Renderer, Scales } from '../types';
import { channelStyles } from './style';

const channels = createChannels({
  rotate: createChannel({ name: 'rotate' }),
  fontSize: createChannel({ name: 'fontSize' }),
  text: createChannel({ name: 'text', optional: false }),
});

function render(
  renderer: Renderer,
  I: number[],
  _: Scales,
  values: Partial<ChannelValues>,
  directStyles: Record<string, string>,
  coordinate: Coordinate,
) {
  const defaults = {
    rotate: 0,
    fontSize: 14,
  };

  const { x: X = [], y: Y = [], text: T = [], rotate: R = [], fontSize: FS = [] } = values;
  return Array.from(I, i =>
    shapeText(renderer, coordinate, {
      ...directStyles,
      ...channelStyles(i, values),
      x: X[i],
      y: Y[i],
      rotate: R[i] || defaults.rotate,
      fontSize: FS[i] || defaults.fontSize,
      text: T[i],
    } as any),
  );
}

export const text = createGeometry(channels, render);
