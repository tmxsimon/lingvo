import { useState, useEffect } from "react";
import api from "../lib/api";

export default function useFetch<T>(url: string): {
  data: T | null;
  loading: boolean;
  error: string | null;
} {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    api
      .get(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setError(`An error occurred: ${err}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}
