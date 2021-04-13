import { useParams } from "react-router";
import useFetch from "./hooks/useFetch";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, error, isPending } = useFetch(
    "http://localhost:8000/blogs/" + id
  );
  const history = useHistory();

  const handleDeleteClick = async () => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete("http://localhost:8000/blogs/" + blog.id);
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          ).then(() => history.push("/"));
        }
      });
    } catch (e) {
      console.log(e);
      alert("An error occurred while deleting");
    }
  };

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <div className="detail-header">
            <h2>{blog.title}</h2>
            <Link 
            to={`/form/${blog.id}/edit`} 
            className="editBtn">
              Edit
              </Link>
            <button onClick={handleDeleteClick} className="deleteBtn">Delete</button>
          </div>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
