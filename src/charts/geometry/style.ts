import { ChannelValues } from '../types';

export function channelStyles(index: number, channels: Partial<ChannelValues>) {
  const { stroke: S, fill: F } = channels;
  return {
    ...(S && { stroke: S[index] }),
    ...(F && { fill: F[index] }),
  };
}

export function groupChannelStyles([index]: number[], channels: Partial<ChannelValues>) {
  return channelStyles(index, channels);
}
