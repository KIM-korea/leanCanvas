import { useState, useCallback } from "react";
export default function useApiRequest(apiFunction, options) {

  const {
    initialData = null,
  } = options || {};//options 객체에서 initailData를 구조분해 할당 + 기본값으로 꺼냄

  const [Item, setItem] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //options: {onSuccess, onError}
  const execute = useCallback(async (params, executeOptions) => {
    const { onSuccess, onError } = executeOptions || {};
    try {
      setIsLoading(true);
      setError(null);

      const result = await new Promise(resolver => setTimeout(() => resolver(true), 1000));//그냥 1초 대기
      console.log(result);
      const response = await apiFunction(params);//params는 객체
      setItem(response.data);
      if (onSuccess) {
        onSuccess(response);
      }
    } catch (err) {
      setError(err);
      if (onError) {
        onError(err);
      }
    } finally {
      setIsLoading(false);
    }
  }, [apiFunction]);
  return { isLoading, error, execute, Item };
}