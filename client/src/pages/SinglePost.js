import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MainContext from '../MainContext'

const SinglePost = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("/api/posts/" + id, post)
      .then((resp) => {
        if (!resp.data) {
          navigate("/");
          return;
        }
        setPost(resp.data);
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error);
        navigate("/");
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleForm = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };



  return (
    <div className="container">
      <div className="singlePost">
        <div className="title">
          <h1>{post.title}</h1>
        </div>

        <div className="image">
          <img src={post.image} alt={post.image} />
        </div>

        <div className="content"> {post.content}</div>
      </div>
      <div className="funds">
        <p>{post.all_sum}</p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>Vardas</label>
          <input type='text' name={post.name} onChange={(e) => handleForm(e)} />
          <label>Aukotina Suma</label>
          <input type='number' onChange={(e) => handleForm(e)} />
          <button >Paaukoti</button>
        </form>
      </div>
    </div>
  );
};

export default SinglePost;
