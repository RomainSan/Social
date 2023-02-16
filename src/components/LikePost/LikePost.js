//React
import { useContext } from "react";
//Mui
import { FavoriteRounded } from "@mui/icons-material";
import { Badge, IconButton } from "@mui/material";
//Provider
import { UserContext } from "../User/User";
//Redux
import { useDispatch } from "react-redux";
import { getPosts, likePost } from "../../actions/post.action";
import { grey } from "@mui/material/colors";
export default function LikePost(props) {
  const { currentUser } = useContext(UserContext);

  //Check if user already like the post
  const res = props.post.like
    ? props.post.like
        .filter((item) => item.userId === currentUser.uid)
        .map((item) => item.userId)
    : [];

  //Redux
  const dispatch = useDispatch();

  const handleLikePost = async () => {
    let data = [];
    let newData = [];

    if (res.includes(currentUser.uid)) {
      //Dislike
      data = [...props.post.like];
      newData = data.filter((el) => el.userId !== currentUser.uid);
      await dispatch(likePost(props.post.id, newData));
    } else {
      //Like
      data = [...props.post.like, { userId: currentUser.uid }];
      await dispatch(likePost(props.post.id, data));
    }
    dispatch(getPosts());
  };
  return (
    <IconButton onClick={handleLikePost}>
      {res.includes(currentUser.uid) ? (
        <Badge badgeContent={props.post.like.length} color="error" max={999}>
          <FavoriteRounded color="primary" />
        </Badge>
      ) : (
        <Badge badgeContent={props.post.like.length} color="error">
          <FavoriteRounded sx={{ color: grey[300] }} />
        </Badge>
      )}
    </IconButton>
  );
}
