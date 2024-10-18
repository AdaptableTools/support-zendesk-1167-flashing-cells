export function isObject(o: unknown): o is Record<string, unknown> {
  return !Array.isArray(o) && typeof o === 'object';
}

export function isDefined<T extends undefined | unknown>(o: T): o is Exclude<T, undefined> {
  return o !== undefined;
}
