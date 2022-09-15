import { CanvasOptions } from "../types";
import { curry } from "../utils";
import { reflectX, translate, transpose as transposeT } from "./transforms";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function coordinate(transformOptions: undefined, canvasOptions: CanvasOptions) {
  return [
    transposeT(),
    translate(-0.5, -0.5),
    reflectX(),
    translate(0.5, 0.5),
  ];
}

export const transpose = curry(coordinate);
