//React
import { useContext, useRef } from "react";
//Mui
import {
  TextField,
  Button,
  Card,
} from "@mui/material";
//Provider
import { UserContext } from "../User/User";
//Redux
import { useDispatch } from "react-redux";
import { addPost, getPosts } from "../../actions/post.action";
import { Box } from "@mui/system";

export default function Post({ click }) {
  const { currentUser } = useContext(UserContext);
  const postField = useRef();
  const postFieldDesktop = useRef();
  //Redux
  const dispatch = useDispatch();

  const handlePost = async (e) => {
    e.preventDefault();
    const data = {
      id_user: currentUser.uid,
      author: currentUser.displayName,
      content: postField.current.value,
      date: Date.now(),
      comments: [],
      like: [],
    };
    if (postField.current.value !== "") {
      // Dispatch
      await dispatch(addPost(data));
      postField.current.value = "";
    }
    dispatch(getPosts());
    click(false);
  };

  const handlePostDesktop = async (e) => {
    e.preventDefault();
    const data = {
      id_user: currentUser.uid,
      author: currentUser.displayName,
      content: postFieldDesktop.current.value,
      date: Date.now(),
      comments: [],
      like: [],
    };
    if (postFieldDesktop.current.value !== "") {
      // Dispatch
      await dispatch(addPost(data));
      postFieldDesktop.current.value = "";
    }
    dispatch(getPosts());
    click(false);
  };

  return (
    <>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 3,
          bgcolor: "primary.main",
        }}
      >
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.2)",
          }}
          onClick={() => click(false)}
        ></Box>
        <Card
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "50vw",
          }}
        >
          <form
            style={{
              display: "flex",
              flexFlow: "column",
              padding: "20px",
              position: "sticky",
              borderRadius: "3px",
              boxShadow: "3",
            }}
            onSubmit={(e) => handlePostDesktop(e)}
          >
            <TextField
              label="Post"
              maxRows={4}
              multiline
              margin="normal"
              inputRef={postFieldDesktop}
            ></TextField>
            <Button
              type="submit"
              sx={{
                transition: "all 1s",
                width: "fit-content",
                alignSelf: "end",
                "&:hover": { bgcolor: "primary.light" },
              }}
              variant="contained"
            >
              Send
            </Button>
          </form>
        </Card>
      </Box>
      {/* MOBILE */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
        }}
      >
        <Box
          sx={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
            background: "rgba(37, 109, 133, 0.8)",
            backdropFilter: "blur(2px)",
            zIndex: 2,
          }}
        >
          <form
            style={{
              top: "40%",
              display: "flex",
              flexFlow: "column",
              padding: "20px",
              position: "sticky",
              borderRadius: "3px",
              boxShadow: "3",
            }}
            onSubmit={(e) => handlePost(e)}
          >
            <TextField
              variant="filled"
              label="Post"
              maxRows={4}
              multiline
              margin="normal"
              inputRef={postField}
              color="white"
            ></TextField>
            <Button
              type="submit"
              sx={{
                transition: "all 1s",
                width: "fit-content",
                alignSelf: "end",
                "&:hover": { bgcolor: "primary.light" },
              }}
              variant="contained"
            >
              Send
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
}
