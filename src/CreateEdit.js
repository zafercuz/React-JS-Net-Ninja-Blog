import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import useFetch from "./hooks/useFetch";

const CreateEdit = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("mario");
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();
  const params = useParams();
  const apiType = params.type;
  const blogId = params.id;

  // For Edit Instance
  const [isFetchPending, setIsFetchPending] = useState(true);
  const [error, setError] = useState(null);
  const { data: blog, error2, isPending2 } = useFetch(
    apiType === "edit" ? "http://localhost:8000/blogs/" + blogId : "cancel"
  );
  
  useEffect(() => {
    setTitle("");
    setBody("");
    setAuthor("");

    if (apiType === "edit") {
      const cancelToken = axios.CancelToken.source();

      setTimeout(async () => {
        try {
          const response = await axios.get(
            "http://localhost:8000/blogs/" + blogId,
            {
              cancelToken: cancelToken.token,
            }
          );
          // Update the values of the form
          setTitle(response.data.title);
          setBody(response.data.body);
          setAuthor(response.data.author);

          setIsFetchPending(false);
          setError(null);
        } catch (e) {
          if (axios.isCancel(e)) {
            console.log("Fetch aborted");
          } else {
            setIsFetchPending(false);
            setError("Could not fetch the data for that resource");
          }
        }

        return () => {
          cancelToken.cancel();
        };
      }, 1000);
    }
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blog = { title, body, author };

    setIsPending(true);

    try {
      if (apiType === "post")
        await axios.post("http://localhost:8000/blogs", {
          ...blog,
        });
      else
        axios.put("http://localhost:8000/blogs/" + blogId, {
          ...blog,
        });
      setIsPending(false);
      history.push("/");
    } catch (e) {
      console.log(e);
      setIsPending(false);
    }
  };

  return (
    <>
      <div className="create">
        {(() => {
          if (isFetchPending && apiType === "edit")
            return <div>Loading...</div>;
          else if (error) return <div>{error}</div>;
          else
            return (
              <>
                <h2>{apiType === "post" ? "Add a New " : "Edit "}Blog</h2>
                <form onSubmit={handleSubmit}>
                  <label>Blog Title:</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label>Blog Body:</label>
                  <textarea
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                  ></textarea>
                  <label>Blog Author:</label>
                  <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  >
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                  </select>
                  {!isPending && (
                    <button>{apiType === "post" ? "Add" : "Edit"} Blog</button>
                  )}
                  {isPending && (
                    <button disabled>
                      {apiType === "post" ? "Adding" : "Editing"} Blog...
                    </button>
                  )}
                </form>
              </>
            );
        })()}
      </div>
    </>
  );
};

export default CreateEdit;
