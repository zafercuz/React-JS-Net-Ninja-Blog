import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    setTimeout(async () => {
      try {
        const response = await axios.get(url, {
          cancelToken: cancelToken.token,
        });
        setData(response.data);
        setIsPending(false);
        setError(null);
      } catch (e) {
        if (axios.isCancel(e)) {
          console.log("Fetch aborted");
        } else {
          setIsPending(false);
          setError("Could not fetch the data for that resource");
        }
      }

      return () => {
        cancelToken.cancel();
      };
    }, 1000);
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
