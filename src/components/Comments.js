import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveComments
} from "../actions/actions";
import { useParams } from "react-router-dom";
const Comments = () => {
  const posts = useSelector(state => state),
    { dataReducer } = posts,
    { post_details } = dataReducer;
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(retrieveComments(id));

  }, [dispatch, id]);

  return (
    <div className="container-fluid">
      <div className="row">
        {post_details.length > 0 ? post_details.map((list, index) => (
          <div className="col-sm-4" style={{ "marginBottom": "10px" }} key={index}>
            <div className="card">
              <div className="card-header">
              </div>
              <div className="card-body">
                <h6><b>Name : </b>{list.name}</h6>
                <h6><b>Email : </b> {list.email}</h6>
                <p><b>Comments : </b> {list.body}</p>
              </div>

            </div>
          </div>
        )) : (<h2>No Comments Available</h2>)
        }
      </div>
    </div >
  );
};

export default Comments;
