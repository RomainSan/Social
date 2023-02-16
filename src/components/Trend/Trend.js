//React
import { useContext, useState } from "react";
//Mui
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Box,
  IconButton,
  Badge,
  Typography,
} from "@mui/material";
import { grey, red } from "@mui/material/colors";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";

//Provider
import { UserContext } from "../User/User";
//Components
import LikePost from "../LikePost/LikePost";
import DeletePost from "../DeletePost/DeletePost";
import CommentPost from "../CommentPost/CommentPost";
//Redux
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post.action";
import { useEffect } from "react";

export default function Trend(props) {
  const dispatch = useDispatch();
  const { currentUser } = useContext(UserContext);
  const [comment, setComment] = useState(false);
  const [com, setCom] = useState();

  const handleDelete = async () => {
    await dispatch(deletePost(props.post.id));
  };

  const dateFormater = (date) => {
    let days = Math.floor((new Date() - new Date(date)) / (1000 * 3600 * 24));
    if (days === 0) {
      return "today";
    } else if (days === 1) {
      return "yesterday";
    } else {
      return days + " days ago";
    }
  };
  
  useEffect(() => {
    setCom(
      props.post.comments.filter((item) => item.id_user === currentUser.uid)
    );
  }, []);

  const openComment = () => {
    if (comment) {
      setComment(false);
    } else {
      setComment(true);
    }
  };

  return (
    <Card sx={{ my: 2, boxShadow: 5 }}>
      <CardHeader
        sx={{ bgcolor: "primary.main", color: "#fff" }}
        title={props.post.author}
        action={
          props.post.id_user == currentUser.uid && (
            <DeletePost id={props.post.id} />
          )
        }
        avatar={
          <Avatar sx={{ bgcolor: red[500] }}>{props.post.author[0]}</Avatar>
        }
      />
      <CardContent>
        <Typography sx={{ wordWrap: "break-word" }}>
          {props.post.content}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "bottom",
        }}
      >
        <Box>
          <Chip
            label={"Posted " + dateFormater(props.post.date)}
            sx={{ background: "#fff", color: "secondary.dark" }}
            size="small"
          />
        </Box>
        <Box>
          <IconButton onClick={openComment}>
            <Badge
              badgeContent={props.post.comments.length}
              color="error"
              max={999}
            >
              <NotesRoundedIcon sx={{ color: grey[500] }} />
            </Badge>
          </IconButton>
          <LikePost post={props.post} />
        </Box>
      </CardActions>
      {comment && (
        <CommentPost
          postId={props.post.id}
          commentList={props.post.comments}
          comment={() => setComment()}
        />
      )}
    </Card>
  );
}
