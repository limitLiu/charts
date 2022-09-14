import { createOrdinal } from './ordinal';
import { band } from '../utils';
import { OrdinalParams } from '../types';

export function createBand<T, U extends number>(options: OrdinalParams<T, U>) {
  const { bandRange, bandWidth, step } = band(options);
  const scale = createOrdinal({ ...options, range: bandRange }) as any;
  scale.bandWidth = () => bandWidth;
  scale.step = () => step;
  return scale;
}
