import { Channel, Channels } from '../types';

export function createChannels(options: Channels = {}): Channels {
  return {
    x: createChannel({ name: 'x', optional: false }),
    y: createChannel({ name: 'y', optional: false }),
    stroke: createChannel({ name: 'stroke' }),
    fill: createChannel({ name: 'fill' }),
    ...options,
  };
}

export function createChannel({ name, optional = true, ...rest }: Channel) {
  return {
    name,
    optional,
    ...rest,
  };
}
