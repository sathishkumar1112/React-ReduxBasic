import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrievePost, deletePost, filterPosts
} from "../actions/actions";
import { useHistory, Link } from "react-router-dom";
import { isEmpty } from 'lodash';

const PostList = () => {
  let history = useHistory();
  const posts = useSelector(state => state),
    { dataReducer } = posts,
    { post_details, filter_posts, message } = dataReducer;
  const dispatch = useDispatch();
  const [groupByPost, setGroupByPost] = useState([]);
  const [filterPostList, setFilterPostList] = useState([]);
  const [userId, setUserId] = useState('')
  const [error, setError] = useState(false)
  useEffect(() => {
    dispatch(retrievePost());
  }, [dispatch]);
  useEffect(() => {
    if (!isEmpty(post_details)) {
      setGroupByPost(post_details);
    }
    if (!isEmpty(filter_posts)) {
      setFilterPostList(filter_posts)
    }

  }, [filter_posts, post_details]);
  const editPost = (e, id) => {
    history.push("/posts/" + id + "/edit");
  }
  const deleteValue = (event, id) => {
    dispatch(deletePost(id));

  }
  const groupBy = (data) => {
    if (data.length > 0) {
      const mapped = data.map((obj, index) => obj.userId);
      const filtered = mapped.filter((userId, index) => mapped.indexOf(userId) === index)
      return filtered;
    }
  }

  const userOptions = (value) => {
    if (value.length > 0) {
      const group = groupBy(value);
      const opt = group?.map((data) => (
        <option key={data} value={data}>
          {data}
        </option>
      ))
      return opt;
    }
    else {
      return (<option>no values</option>)
    }
  }

  const handleOnChange = (e) => {
    if (e.target.value === '') {
      dispatch(retrievePost());

    }
    else {
      setUserId(e.target.value)
      dispatch(filterPosts(e.target.value))
    }


  }

  return (
    <div className="container-fluid">
      <div className="submit-form">
        <div className="form-group">
          <label htmlFor="title">Select Users</label>
          <select className="form-control" onChange={handleOnChange} name="userId" value={userId}>
            <option>Display all</option>
            {userOptions(groupByPost)}
          </select>
        </div>

      </div>

      <div className="row">
        {filter_posts.length > 0 ? filter_posts.map((list, index) => (
          <div className="col-sm-4" style={{ "marginBottom": "10px" }} key={index}>
            <div className="card">
              <div className="card-header">
                <button className="btn" onClick={(e) => editPost(e, list.id)}> Edit</button>
                <button className="btn" onClick={(e) => deleteValue(e, list.id)}> delete</button>

              </div>
              <div className="card-body">
                <h6><b>UserId : </b>{list.userId}</h6>
                <h6><b>Title : </b> {list.title}</h6>
                <p><b>Body : </b> {list.body}</p>
                <Link to={"/posts/" + list.id + "/comments"}>get comments</Link>
              </div>

            </div>
          </div>
        )) :
          <>
            {post_details.length > 0 && post_details.map((list, i) => (
              <div className="col-sm-4" style={{ "marginBottom": "10px" }} key={i}>
                <div className="card">
                  <div className="card-header">
                    <button className="btn" onClick={(e) => editPost(e, list.id)}> Edit</button>
                    <button className="btn" onClick={(e) => deleteValue(e, list.id)}> delete</button>

                  </div>
                  <div className="card-body">
                    <h6><b>UserId : </b>{list.userId}</h6>
                    <h6><b>Title : </b> {list.title}</h6>
                    <p><b>Body : </b> {list.body}</p>
                    <Link to={"/posts/" + list.id + "/comments"}>get comments</Link>
                  </div>

                </div>
              </div>
            ))}
          </>
        }
      </div>
    </div >
  );
};

export default PostList;
