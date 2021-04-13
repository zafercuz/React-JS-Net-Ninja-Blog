import { useState, useEffect } from "react";
import axios from "axios";

// Type = "post" or "put"
const usePostPut = (url) => {
  // const [data, setData] = useState(null);
  // const [isPending, setIsPending] = useState(true);
  // const [error, setError] = useState(null);

  // const post = () => {
  //   console.log("Post");
  // }

  // useEffect(() => {
  //   // If the URL passed is "cancel" then that would mean to
  //   // not do the fetching function
  //   if (url !== "cancel" && data !== null) {
  //     const cancelToken = axios.CancelToken.source();

  //     setTimeout(async () => {
  //       try {

  //         if (apiType === "post") {
  //           const response = await axios.post(url, {
  //             ...passedData,
  //           });
  //           console.log(response);
  //         }
  //         else {
  //           const response = axios.put(url, {
  //             ...passedData,
  //           });
  //         }
  //         // const response = await axios.get(url, {
  //         //   cancelToken: cancelToken.token,
  //         // });
  //         setData({ "status": "Ok" });
  //         setIsPending(false);
  //         setError(null);
  //       } catch (e) {
  //         if (axios.isCancel(e)) {
  //           console.log("Fetch aborted");
  //         } else {
  //           setIsPending(false);
  //           setError("Could not fetch the data for that resource");
  //         }
  //       }

  //       return () => {
  //         cancelToken.cancel();
  //       };
  //     }, 1000);
  //   }
  // }, [url]);

  // return { data, isPending, error };
};

export default usePostPut;