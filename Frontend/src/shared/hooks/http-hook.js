import { useState, useCallback } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }

        setIsLoading(false);

        return data;
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
        throw err;
      }
    },
    [],
  );

  const clearError = () => {
    setError(null);
  };

  return { isLoading, error, sendRequest, clearError };
};
