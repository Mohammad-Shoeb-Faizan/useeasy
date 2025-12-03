import { useEasyCore } from "./useEasyCore";

export function useEasyAsync(asyncFn, deps = []) {
  return useEasyCore(asyncFn, { deps });
}
