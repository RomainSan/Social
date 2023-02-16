//Mui
import { MoreVert } from "@mui/icons-material";
import { IconButton } from "@mui/material";
//Redux
import { useDispatch } from "react-redux";
import { deletePost, getPosts } from "../../actions/post.action";

export default function DeletePost({ id }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await dispatch(deletePost(id));
    getPosts();
  };
  return (
    <IconButton onClick={handleDelete}>
      <MoreVert sx={{ color: "#fff" }}></MoreVert>
    </IconButton>
  );
}
