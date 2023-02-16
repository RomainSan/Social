import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase.config";

export const GET_POST = "GET_POST";
export const ADD_POST = "ADD_POST";
export const LIKE_POST = "LIKE_POST";
export const DELETE_POST = "DELETE_POST";
export const COMMENT_POST = "COMMENT_POST";

export const getPosts = () => {
  return async (dispatch) => {
    try {
      await getDocs(collection(db, "posts")).then((res) => {
        dispatch({
          type: GET_POST,
          payload: res.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
        });
      });
    } catch (err) {
      return console.log(err);
    }
  };
};
export const addPost = (data) => {
  return async (dispatch) => {
    try {
      await addDoc(collection(db, "posts"), data).then(() => {
        dispatch({ type: ADD_POST, payload: data });
      });
    } catch (err) {
      return console.log(err);
    }
  };
};
export const AddComment = (data, postId) => {
  return async (dispatch) => {
    try {
      await updateDoc(doc(db, "posts", postId), { comments: data });
      dispatch({
        type: COMMENT_POST,
        payload: { data },
      });
    } catch (err) {
      console.log(err);
    }
  };
};
export const deletePost = (postId) => {
  return async (dispatch) => {
    try {
      await deleteDoc(doc(db, "posts", postId));
      dispatch({
        type: DELETE_POST,
        payload: { postId },
      });
    } catch (err) {
      console.log(err);
    }
  };
};
export const likePost = (postId, data) => {
  return async (dispatch) => {
    try {
      await updateDoc(doc(db, "posts", postId), { like: data });
      dispatch({
        type: LIKE_POST,
        payload: { data },
      });
    } catch (err) {
      console.log(err);
    }
  };
};
