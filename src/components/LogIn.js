//React
import { useRef, useContext } from "react";
//Mui
import { Button, TextField } from "@mui/material";
//FireBase
import { auth } from "../utils/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { UserContext } from "./User/User";

export default function Login() {
  const { navigate } = useContext(UserContext);
  // inputs ref
  const loginEmail = useRef();
  const loginPassword = useRef();

  const handleLogIn = async (e) => {
    e.preventDefault();
    // try sign in
    try {
      await signInWithEmailAndPassword(
        auth,
        loginEmail.current.value,
        loginPassword.current.value
      );

      // window.location.reload();
      navigate("/");
    } catch (error) {
      // message if incorrect password or email
      console.log(error);
    }
  };
  return (
    <form
      style={{
        display: "flex",
        flexFlow: "column",
        position: "absolute",
        top: "40%",
        left: "50%",
        transform: "translate(-50%)",
      }}
      onSubmit={(e) => handleLogIn(e)}
    >
      <TextField
        type="email"
        label="eMail"
        margin="dense"
        inputRef={loginEmail}
      />
      <TextField
        type="password"
        label="Mot de Passe"
        margin="dense"
        inputRef={loginPassword}
      />
      <Button type="submite" variant="contained" size="large">
        se connecter
      </Button>
    </form>
  );
}
