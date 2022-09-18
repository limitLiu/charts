export function group<T>(array: T[], key: (d: T) => string = d => d as string) {
  const keyGroups = new Map();
  for (const item of array) {
    const k = key(item);
    const g = keyGroups.get(k);
    if (g) {
      g.push(item);
    } else {
      keyGroups.set(k, [item]);
    }
  }
  return keyGroups;
}

export function equal([x0, y0]: number[], [x1, y1]: number[]) {
  return closeTo(x0, x1) && closeTo(y0, y1);
}

export function closeTo(a: number, b: number, tol = 1e-5) {
  return Math.abs(a - b) < tol;
}

export function dist([x0, y0]: number[], [x1 = 0, y1 = 0]: number[] = []) {
  return Math.sqrt((x0 - x1) ** 2 + (y0 - y1) ** 2);
}

export function sub([x1, y1]: number[], [x0, y0]: number[]) {
  return [x1 - x0, y1 - y0];
}

export function angleBetween(v0: number[], v1: number[]) {
  const a0 = angle(v0);
  const a1 = angle(v1);
  if (a0 < a1) return a1 - a0;
  return Math.PI * 2 - (a0 - a1);
}

export function angle([x, y]: number[]) {
  return Math.atan2(y, x);
}
