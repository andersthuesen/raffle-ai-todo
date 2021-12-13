import { useState, useEffect, useCallback } from "react";

export type PendingResult = {
  type: "pending";
};

export type ResolvedResult<T> = {
  type: "resolved";
  data: T;
};

export type RejectedResult = {
  type: "rejected";
  error: Error;
};

export type Result<T> = ResolvedResult<T> | RejectedResult | PendingResult;

export const usePromise = <T>(fn: () => Promise<T>) => {
  const [result, setResult] = useState<Result<T>>({ type: "pending" });

  const resolve = useCallback(() => {
    fn()
      .then((data) => {
        setResult({ type: "resolved", data });
      })
      .catch((error) => {
        setResult({ type: "rejected", error });
      });
  }, [fn]);

  // fetch data on request
  useEffect(() => resolve(), [resolve]);

  return result;
};
