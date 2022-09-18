type Curry<T extends Function> = T extends (...args: infer Args) => infer ReturnValue
  ? Args extends []
    ? () => ReturnValue
    : Args extends [infer Fst, ...infer Rest]
    ? (arg: Fst) => Rest extends [] ? ReturnValue : Curry<(...args: Rest) => ReturnValue>
    : never
  : never;

export function curry<T extends (...args: any) => any, P extends Parameters<T>>(
  fn: T,
  args: P[] = [],
): Curry<T> {
  if (!fn.length || fn.length === args.length) return fn(...args);
  return ((arg: any) => curry(fn, [...args, arg])) as any;
}

export function identity<T>(x: T) {
  return x;
}

export function compose(...fns: ((...args: any[]) => any)[]) {
  return fns.reduce(
    (a, b) =>
      (...args: any) =>
        b(a(...args)),
    identity,
  );
}
