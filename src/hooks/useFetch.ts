import axios from "axios";
import { useEffect, useState } from "react";

type method = "GET" | "POST" | "DELETE" | "PATCH" | "PUT";

const useFetch = <T>(method: method, url: string, data?: {}, headers?: {}) => {
  const [response, setResponse] = useState<T | any>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAxios();
  }, []);

  const fetchAxios = () => {
    axios({
      method,
      url,
      data,
      headers,
      withCredentials: true,
    })
      .then((res) => setResponse(res.data.data))
      .catch((err) => setError(err))
      .finally(() => {
        setLoading(false);
      });
  };

  return { response, error, loading };
};
export default useFetch;
