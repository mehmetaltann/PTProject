import { useState, useCallback } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:1623/api/v1/";

const useFetchdata = () => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const getData = useCallback(async (route, setData) => {
    const response = await axios.get(`${BASE_URL}${route}`);
    setData(response.data);
  }, []);

  const postData = useCallback(async (route, data) => {
    const response = await axios
      .post(`${BASE_URL}${route}`, data)
      .then((response) => setMessage(response.data.message))
      .catch((err) => {
        setError(err.response.data.message);
      });
  }, []);

  const deleteData = useCallback(async (route, id) => {
    const response = await axios
      .delete(`${BASE_URL}${route}${id}`)
      .then((response) => setMessage(response.data.message))
      .catch((err) => {
        setError(err.response.data.message);
      });
  }, []);

  return { message, error, getData, postData, deleteData };
};

export default useFetchdata;
