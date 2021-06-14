import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePosts, retrievePostById } from "../actions/actions";
import { useParams } from "react-router-dom";
const EditPosts = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const get_posts = useSelector(state => state),
    { dataReducer } = get_posts,
    { post_details } = dataReducer;
  const [posts, setPosts] = useState({
    id: "",
    title: "",
    body: "",
    userId: ""
  });
  useEffect(() => {
    dispatch(retrievePostById(id));
    setPosts({
      id: post_details.id,
      title: post_details.title,
      body: post_details.body,
      userId: post_details.userId
    })
  }, [dispatch, id, post_details.body, post_details.id, post_details.title, post_details.userId]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setPosts({ ...posts, [name]: value });
  };
  function validate(title, body) {
    if (title.length === 0) {
      return false
    }
    else if (body.length === 0) {
      return false
    }
    else {
      return true;
    }
  }
  const savePosts = (e) => {
    e.preventDefault();
    const { id, title, body, userId } = posts;
    const errors = validate(title, body);
    if (errors) {
      dispatch(updatePosts(id, title, body, userId))
    }
    else {
      alert('Form can not be null');
    }

    // window.location.href = '/';
  };



  return (
    <div className="submit-form">
      <div>
        <div className="form-group">
          <label htmlFor="title">Post Title </label>
          <input
            type="text"
            className="form-control"
            id="title"
            required
            value={posts.title}
            onChange={handleInputChange}
            name="title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Post Message</label>
          <textarea className="form-control" rows="5" id="comment"
            value={posts.body}
            onChange={handleInputChange}
            name="body" />

        </div>
        <button onClick={(e) => savePosts(e)} className="btn btn-success">
          Submit
          </button>
      </div>
    </div>
  );
};

export default EditPosts;

