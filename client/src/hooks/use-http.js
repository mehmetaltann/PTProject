import axios from "axios";
import { useState, useCallback } from "react";

const useHttp = () => {
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(true);

  const sendRequest = useCallback(
    async ({ url, method, body = null, headers = null }, applyData) => {
      await axios[method](`http://localhost:1623/api/v1/${url}`, body, headers)
        .then((res) => {
          applyData(res.data);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setloading(false);
        });
    },
    []
  );

  return {
    loading,
    error,
    setError,
    sendRequest,
  };
};

export default useHttp;
