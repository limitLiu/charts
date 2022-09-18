import { createGeometry } from './geometry';
import { createChannel, createChannels } from './channel';
import { group } from '../utils';
import { ChannelValues, Coordinate, Renderer, Scales, Styles } from '../types';
import { groupChannelStyles } from './style';
import { area as shapeArea } from './shape';

const channels = createChannels({
  x1: createChannel({ name: 'x1', optional: false }),
  y1: createChannel({ name: 'y1', optional: false }),
  z: createChannel({ name: 'z' }),
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
  const { x: X, y: Y, z: Z, x1: X1, y1: Y1 } = values;
  const series = Z ? group(I, i => Z[i]).values() : [I];
  return Array.from(series, I =>
    shapeArea(renderer, coordinate, {
      ...defaults,
      ...directStyles,
      ...groupChannelStyles(I, values),
      X1: X,
      Y1: Y,
      X2: X1,
      Y2: Y1,
      I,
    } as any),
  );
}

export const area = createGeometry(channels, render);
