import { AddComment, getPosts } from "../../actions/post.action";
import {
  TextField,
  Button,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItemButton,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import { UserContext } from "../User/User";
import { grey } from "@mui/material/colors";

export default function CommentPost({ postId, commentList, comment }) {
  const { currentUser } = useContext(UserContext);
  const commentRef = useRef();
  const dispatch = useDispatch();

  const handleCommentPost = async (e) => {
    e.preventDefault();
    if (commentRef.current.value != "") {
      if (commentList != "") {
        const data = [
          ...commentList,
          {
            id_user: currentUser.uid,
            user_name: currentUser.displayName,
            content: commentRef.current.value,
          },
        ];
        await dispatch(AddComment(data, postId));
      } else {
        const newData = [
          {
            id_user: currentUser.uid,
            user_name: currentUser.displayName,
            content: commentRef.current.value,
          },
        ];
        await dispatch(AddComment(newData, postId));
      }
      commentRef.current.value = "";
    }
    dispatch(getPosts());
  };

  return (
    <Box>
      <form
        style={{ display: "flex", flexFlow: "column", padding: "10px" }}
        onSubmit={(e) => handleCommentPost(e)}
      >
        <TextField
          variant="filled"
          inputRef={commentRef}
          label="comment"
          margin="normal"
        ></TextField>
        <Button
          type="submit"
          variant="contained"
          sx={{ width: "fit-content", alignSelf: "end" }}
        >
          comment
        </Button>
      </form>
      <List sx={{ maxHeight: "400px", overflowY: "auto" }}>
        {commentList?.length > 0 &&
          commentList.map((comment, index) => (
            <ListItem key={index} sx={{ background: index % 2 && grey[100] }}>
              <ListItemAvatar>
                <Avatar>{comment.user_name[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={comment.user_name}
                secondary={comment.content}
              ></ListItemText>
            </ListItem>
          ))}
      </List>
      <Button onClick={() => comment(false)} sx={{ width: "100%", my: "0" }}>
        close
      </Button>
    </Box>
  );
}
