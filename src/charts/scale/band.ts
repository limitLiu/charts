import { createOrdinal } from './ordinal';
import { band } from '../utils';
import { OrdinalParams, Scale } from '../types';

export function createBand<T, U extends number>(options: OrdinalParams<T, U>): Scale {
  const { bandRange, bandWidth, step } = band(options);
  const fn = createOrdinal({ ...options, range: bandRange }).fn;
  return { fn, bandWidth: () => bandWidth, step: () => step };
}
