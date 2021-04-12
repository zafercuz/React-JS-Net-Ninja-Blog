import { useParams } from "react-router";
import useFetch from "./useFetch";
import { useHistory } from "react-router-dom";
import axios from "axios";

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, error, isPending } = useFetch(
    "http://localhost:8000/blogs/" + id
  );
  const history = useHistory();

  const handleDeleteClick = async () => {
    try {
      await axios.delete("http://localhost:8000/blogs/" + blog.id);
      history.push("/");
    } catch (e) {
      console.log(e);
      alert("An error occurred while deleting");
    }
  };

  const handleEditClick = () => {
    console.log("Edit Form");
  }

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <div className="detail-header">
            <h2>{blog.title}</h2>
            <button onClick={handleEditClick} style={{marginLeft: "auto"}} className="editBtn">Edit</button>
            <button onClick={handleDeleteClick} style={{marginLeft: "15px"}} className="deleteBtn">Delete</button>
          </div>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
