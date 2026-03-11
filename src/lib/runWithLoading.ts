/**
 * Runs an async/sync function and keeps a loading flag true for at least `ms` ms.
 * Use with button loading state for better perceived feedback.
 */
export function runWithLoading(
  setLoading: (v: boolean) => void,
  fn: () => void | Promise<void>,
  ms = 1200
): void {
  setLoading(true);
  Promise.resolve(fn()).finally(() => {
    setTimeout(() => setLoading(false), ms);
  });
}
