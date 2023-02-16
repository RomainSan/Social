//React
import { useState, useEffect, useContext } from "react";
//Mui
import { Box } from "@mui/material";
//Provider
import { UserContext } from "../User/User";
//Components
import Trend from "../Trend/Trend";
//Firebase
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase.config";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/post.action";
import { getUsers } from "../../actions/user.action";

export default function HomePage() {
  const posts = useSelector((state) => state.postReducer);
  const dispatch = useDispatch();
  const { currentUser } = useContext(UserContext);
  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    const res = async () => {
      const ref = await getDocs(collection(db, "users")).then((res) =>
        res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      const filterRef = await ref.filter((user) => user.id === currentUser.uid);
      const friendsRef = await filterRef.map((item) => item.friendList)[0];
      setFriendList(friendsRef);
      dispatch(getUsers());
      dispatch(getPosts(friendList));
    };
    res();
  }, []);

  return (
    <Box
      sx={{
        width: "95%",
        maxWidth: "700px",
        margin: "70px auto",
        marginTop: "0",
        borderRadius: "3px",
      }}
    >
      {posts?.length > 0 &&
        posts
          .sort((a, b) => b.date - a.date)
          .map(
            (post, index) =>
              friendList?.includes(post.id_user) ||
              (post.id_user === currentUser.uid && (
                <Trend post={post} key={index} />
              ))
          )}
    </Box>
  );
}
