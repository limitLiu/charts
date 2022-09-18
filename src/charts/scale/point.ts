import { createBand } from './band';
import { OrdinalParams } from '../types';

export function createPoint<T, U extends number>(options: OrdinalParams<T, U>) {
  return createBand({ ...options, padding: 1 });
}
