//React
import { useContext, useState } from "react";
//Mui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { purple } from "@mui/material/colors";
import { Box } from "@mui/system";
//Components
import { UserContext } from "../User/User";
//Firebase
import { auth, db } from "../../utils/firebase.config";
import { signOut } from "firebase/auth";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";

export default function Settings() {
  const { currentUser, navigate } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(true);
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch {
      alert("error");
    }
  };

  const deleteAccount = async () => {
    const userPost = await getDocs(collection(db, "posts")).then((res) =>
      res.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((item) => item.id_user === currentUser.uid)
        .map((ids) => ids.id)
    );

    const promises = userPost.map((docId) =>
      deleteDoc(doc(db, "posts", docId))
    );

    auth.currentUser.delete();
    await deleteDoc(doc(db, "users", currentUser.uid));
    await Promise.all(promises);
    handleClose();
    window.location.reload();
    navigate("/");
  };

  return (
    <Box
      sx={{
        width: "80%",
        maxWidth: "800px",
        margin: "0 auto",
        marginTop: "50px",
      }}
    >
      <Typography variant="h2">Hey {currentUser.displayName}</Typography>
      <Typography>Your ID : {currentUser.uid}</Typography>

      <Button variant="contained" color="error" onClick={() => logOut()}>
        logout
      </Button>
      <Button
        variant="contained"
        sx={{ background: purple[500] }}
        onClick={handleClose}
      >
        delete account
      </Button>
      <Dialog
        open={open}
        fullScreen={fullScreen}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <DialogTitle>Delete account</DialogTitle>
        <DialogContent>
          Do you really want to delete your account and all your posts ?
          <span style={{ color: "red" }}>This action is irreversible</span>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpen(false)}>
            No
          </Button>
          <Button
            sx={{ transition: "all .5s", "&:hover": { background: "red" } }}
            variant="contained"
            onClick={() => deleteAccount()}
          >
            Yes, I want to delete my account
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
