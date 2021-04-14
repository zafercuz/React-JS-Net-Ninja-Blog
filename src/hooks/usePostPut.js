import { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

// Type = "post" or "put"
const usePostPut = (url) => {
  const [isPending, setIsPending] = useState(false);
  const [errorPostUpdate, setErrorPostUpdate] = useState(null);
  const [status, setStatus] = useState(null);

  const setAsyncTimeout = (cb, timeout = 0) => new Promise(resolve => {
    setTimeout(() => {
      cb();
      resolve();
    }, timeout);
  });

  const handlePostUpdate = async (apiType, data, message, link, history) => {
    // If the URL passed is "cancel" then that would mean to
    // not do the fetching function
    if (url !== "cancel" && data !== null) {
      const cancelToken = axios.CancelToken.source();

      setIsPending(true);

      await setAsyncTimeout(async () => {
        try {
          if (apiType === "post") {
            await axios.post(url, {
              ...data,
            });
          } else {
            await axios.put(url, {
              ...data,
            });
          }
          setIsPending(false);
          setErrorPostUpdate(null);
          setStatus(apiType === "post" ? 201 : 200);
          Swal.fire(
            apiType === "post" ? 'Created!' : "Edited!",
            message,
            'success'
          ).then(() => {
            history.push(link);
          });
        } catch (e) {
          if (axios.isCancel(e)) {
            console.log("Fetch aborted");
          } else {
            setIsPending(false);
            setErrorPostUpdate("Could not fetch the data for that resource");
            setStatus(400);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: "Something went wrong!",
            })
          }
        }

        return () => {
          cancelToken.cancel();
        };
      }, 1000);

    }
  };

  return { isPending, handlePostUpdate, status };
};

export default usePostPut;
