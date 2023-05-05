import { useState, useEffect } from "react";
import axios from "axios";

const useAxios = ({ url, method, body = null, headers = null }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);

  const fetchData = async () => {
    await axios[method](
      `http://localhost:1623/api/v1/${url}`,
      JSON.parse(headers),
      JSON.parse(body)
    )
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setloading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [method, url, body, headers]);

  return { fetchData, response, error, loading };
};

export default useAxios;
