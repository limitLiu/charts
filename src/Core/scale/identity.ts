export function createIdentity<T>() {
  return (x: T): T => x;
}
