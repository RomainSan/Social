//React
import { useRef, useState } from "react";
//Mui
import {Button, TextField } from "@mui/material";
//Firebase
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../utils/firebase.config";
export default function SignUp() {
  const registerEmail = useRef();
  const registerPassword = useRef();
  const [displayName, setDisplayName] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    // try create new user
    try {
      await auth
        .createUserWithEmailAndPassword(
          registerEmail.current.value,
          registerPassword.current.value
        )
        // then create display name with pseudo input value
        .then(async (userAuth) => {
          await userAuth.user.updateProfile({
            // same as displayName = displayName
            displayName,
          });
          // add user in users database
          const ref = doc(db, "users", userAuth.user.uid);
          await setDoc(ref, {
            email: registerEmail.current.value.toLowerCase().trim(),
            pseudo: displayName.toLowerCase().trim(),
            friendList: [],
          });

          // reload page
          window.location.reload();

          // navigate to home if router
          // navigate("/");
        });
    } catch (error) {
      // message if email already in use
      if (error.code === "auth/email-already-in-use") {
        console.log("Email already in use");
      }
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
      onSubmit={(e) => handleSignIn(e)}
    >
      <TextField
        label="Pseudo"
        margin="dense"
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <TextField
        label="eMail"
        type="email"
        margin="dense"
        inputRef={registerEmail}
      />
      <TextField
        label="Mot de Passe"
        type="password"
        margin="dense"
        inputRef={registerPassword}
      />
      <Button type="submit" variant="contained" size="large">
        créer un compte
      </Button>
    </form>
  );
}
