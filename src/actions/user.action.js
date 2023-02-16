import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../utils/firebase.config";

export const GET_USERS = "GET_USERS";
export const ADD_FRIEND = "ADD_FRIEND";

export const getUsers = (id) => {
  return async (dispatch) => {
    try {
      await getDocs(collection(db, "users")).then((res) => {
        dispatch({
          type: GET_USERS,
          payload: res.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }))
            .filter((psd) => psd.pseudo.includes(id)),
        });
      });
    } catch (err) {
      return console.log(err);
    }
  };
};

export const addFriend = (id, data) => {
  return async (dispatch) => {
    try {
      await updateDoc(doc(db, "users", id), { friendList: data });
      dispatch({
        type: ADD_FRIEND,
        payload: { data },
      });
    } catch (err) {
      console.log(err);
    }
  };
};
