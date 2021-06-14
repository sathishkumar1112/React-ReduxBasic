import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPosts } from "../actions/actions";

const AddPosts = () => {
  const initialPostsState = {
    title: "",
    body: "",
    userId: 1
  };
  const [posts, setPosts] = useState(initialPostsState);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

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
    e.preventDefault()
    const { title, body, userId } = posts;
    const errors = validate(title, body);
    if (errors) {
      dispatch(createPosts(title, body, userId))
      setSubmitted(true);
    }
    else {
      alert('Form can not be null');
    }
  };

  const newPosts = () => {
    setPosts(initialPostsState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newPosts}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <form onSubmit={savePosts}>
            <div className="form-group">
              <label htmlFor="title">Post Title</label>
              <input
                type="text"
                className="form-control"
                id="title"

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

            <button type='submit' className="btn btn-success">
              Submit
          </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddPosts;
