import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import useFetch from "./hooks/useFetch";
import Swal from 'sweetalert2';

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
  const { data, error, isPending: isFetchPending } = useFetch(
    apiType === "edit" ? "http://localhost:8000/blogs/" + blogId : "cancel"
  );

  useEffect(() => {
    // Set initial form values to blank incase the URL is for Creation
    setTitle("");
    setBody("");
    setAuthor("mario"); // Defaulted to "mario" as its the default author

    // If NOT null then, assign the values fetched from Server to the Forms
    if (data !== null && apiType === "edit") {
      setTitle(data.title);
      setBody(data.body);
      setAuthor(data.author);
    }
  }, [apiType, data]);

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
        await axios.put("http://localhost:8000/blogs/" + blogId, {
          ...blog,
        });
      Swal.fire(
        apiType === "post" ? 'Created!' : "Edited!",
        `Your file has been ${apiType === "post" ? "Created" : "Edited"}.`,
        'success'
      ).then(() => {
        setIsPending(false);
        history.push("/");
      });
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
