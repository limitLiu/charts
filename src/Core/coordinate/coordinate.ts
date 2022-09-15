import { compose } from "../utils/coordinate";
import { Coordinate, CoordinateParams } from "../types";

export function createCoordinate({
                                   transforms: coordinates = [], x = 0, y = 0, width = 0, height = 0
                                 }: CoordinateParams): Coordinate {
  const transforms = coordinates.flatMap((coordinate) => coordinate({ x, y, width, height }));
  const fn = compose(...transforms.map(t => t.fn));
  const types: string[] = transforms.map(t => t.type());
  const isPolar = () => types.indexOf('polar') !== -1;
  const isTranspose = () => types.reduce((acc, type) => acc !== (type === 'transpose'), false);
  const center = () => [x + width / 2, y + height / 2];
  return { fn, isPolar, isTranspose, center };
}
