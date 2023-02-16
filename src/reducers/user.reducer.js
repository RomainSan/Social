import { GET_USERS, ADD_FRIEND } from "../actions/user.action";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return action.payload;
    case ADD_FRIEND:
      return state.filter((user) => user.id !== action.payload);
    default:
      return state;
  }
}
