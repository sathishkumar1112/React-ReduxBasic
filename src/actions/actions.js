import {
  CREATE_POSTS,
  RETRIEVE_POSTS,
  RETRIEVE_POSTS_BY_ID,
  UPDATE_POSTS,
  DELETE_POSTS,
  COMMENTS,
  FILTER_BY_USERS
} from "./types";
import axios from 'axios';
const BASEURL = "https://jsonplaceholder.typicode.com/";
export const createPosts = (title, body, userId) => async (dispatch) => {
  try {
    const data = { "title": title, "body": body, "userId": userId }
    const res = await axios.post(BASEURL + 'posts', data)
    dispatch({
      type: CREATE_POSTS,
      payload: res.data,
    });
    console.log(res);

  } catch (err) {
    console.log(err);
  }
};

export const retrievePost = () => async (dispatch) => {
  try {
    const res = await axios.get(BASEURL + 'posts');
    dispatch({
      type: RETRIEVE_POSTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
export const retrievePostById = (id) => async (dispatch) => {
  try {

    const res = await axios.get(BASEURL + 'posts/' + id);
    dispatch({
      type: RETRIEVE_POSTS_BY_ID,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updatePosts = (id, title, body, userId) => async (dispatch) => {
  try {
    const data = { "id": id, "title": title, "body": body, "userId": userId }
    let headers = {
      'Content-type': 'application/json; charset=UTF-8',
    }
    const res = await axios.patch(BASEURL + 'posts/', data, { headers });
    dispatch({
      type: UPDATE_POSTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
export const filterPosts = (id) => async (dispatch) => {
  try {

    const res = await axios.get(BASEURL + 'users/' + id + '/posts');
    dispatch({
      type: FILTER_BY_USERS,
      payload: res.data,
    });


  } catch (err) {
    console.log(err);
  }
};
export const retrieveComments = (id) => async (dispatch) => {
  try {
    const res = await axios.get(BASEURL + 'posts/' + id + '/comments');
    dispatch({
      type: COMMENTS,
      payload: res.data,
    });


  } catch (err) {
    console.log(err);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    let res = await axios.delete(BASEURL + 'posts/' + id);
    console.log(res);
    dispatch({
      type: DELETE_POSTS,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};




