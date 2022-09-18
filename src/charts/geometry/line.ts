import { createChannel, createChannels } from './channel';
import { line as shapeLine } from './shape';
import { ChannelValues, Coordinate, Renderer, Scales } from '../types';
import { groupChannelStyles } from './style';
import { createGeometry } from './geometry';
import { group } from '../utils';

const channels = createChannels({ z: createChannel({ name: 'z' }) });

function render(
  renderer: Renderer,
  I: number[],
  _: Scales,
  values: Partial<ChannelValues>,
  directStyles: Record<string, string>,
  coordinate: Coordinate,
) {
  const defaults = {};

  const { x: X, y: Y, z: Z } = values;

  const series = Z ? group(I, i => Z[i]).values() : [I];
  return Array.from(series, I =>
    shapeLine(renderer, coordinate, {
      ...defaults,
      ...directStyles,
      ...groupChannelStyles(I, values),
      X,
      Y,
      I,
      fill: 'none',
    } as any),
  );
}

export const line = createGeometry(channels, render);
