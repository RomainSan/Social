import { GET_POST, ADD_POST, DELETE_POST } from "../actions/post.action";

const initialState = {};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POST:
      return action.payload;
    case ADD_POST:
      return [action.payload, ...state];
    case DELETE_POST:
      return state.filter((post) => post.id !== action.payload.postId);
    default:
      return state;
  }
}
