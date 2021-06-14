import {
  CREATE_POSTS,
  RETRIEVE_POSTS,
  RETRIEVE_POSTS_BY_ID,
  UPDATE_POSTS,
  FILTER_BY_USERS,
  COMMENTS,
  DELETE_POSTS
} from "../actions/types";

const initialState = {
  post_details: [],
  datafetched: false,
  loading: false,
  filter_posts: [],
  message: '',
  isDeleted: false
};


const dataReducer = (state = initialState, action) => {

  switch (action.type) {
    case CREATE_POSTS:
      return {
        ...state,
        post_details: action.payload,
        datafetched: true
      };

    case RETRIEVE_POSTS:
      return {
        ...state,
        post_details: action.payload,
      };
    case RETRIEVE_POSTS_BY_ID:
      return {
        ...state,
        post_details: action.payload,
      };

    case UPDATE_POSTS:
      return state.map((value) => {
        if (state.id === action.payload.id) {
          return {
            ...value,
            ...action.payload
          };
        } else {
          return state;
        }
      });
    case FILTER_BY_USERS:
      return {
        ...state,
        filter_posts: action.payload,
      };
    case COMMENTS:
      return {
        ...state,
        post_details: action.payload,
      };
    case DELETE_POSTS:
      return {
        ...state,
        message: 'Post deleted',
        isDeleted: true
      };

    default:
      return state;
  }
};

export default dataReducer;
