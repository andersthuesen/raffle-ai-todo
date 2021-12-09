import { useState, useEffect, useCallback } from "react";
import ky from "ky";

// Define abstract data structure (discriminated union).
type LoadingResult = {
  type: "loading";
};
type SuccessResult<T> = {
  type: "success";
  data: T;
};
type ErrorResult<E> = {
  type: "error";
  error: E;
};

type Result<T, E> = SuccessResult<T> | ErrorResult<E> | LoadingResult;

export const useData = <T>(url: string) => {
  const [result, setResult] = useState<Result<T, Error>>({ type: "loading" });

  const fetchData = useCallback(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const request = ky.get(url, { signal }).json<T>();
    request
      .then((data) => {
        setResult({ type: "success", data });
      })
      .catch((error) => {
        setResult({ type: "error", error });
      });

    return controller.abort;
  }, [url]);

  // fetch data on request
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return result;
};
