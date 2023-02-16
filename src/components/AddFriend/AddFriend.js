//React
import { useContext, useState, useEffect } from "react";
//Mui
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
import { IconButton } from "@mui/material";
//Provider
import { UserContext } from "../User/User";
//Firebase
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase.config";
//Redux
import { useDispatch } from "react-redux";
import { addFriend } from "../../actions/user.action";

export default function AddFriend(props) {
  const { currentUser } = useContext(UserContext);
  const [user, setUser] = useState(props.user.id);
  const [userRef, setUserRef] = useState();
  const dispatch = useDispatch();

  const dataArray = async () => {
    const ref = await getDocs(collection(db, "users")).then((res) =>
      res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
    const filterRef = await ref.filter((user) => user.id === currentUser.uid);
    const friendsRef = await filterRef.map((item) => item.friendList)[0];
    setUserRef(friendsRef);
  };
  useEffect(() => {
    dataArray();
  }, []);
  
  const handleAddFriend = async () => {
    const ref = await getDocs(collection(db, "users")).then((res) =>
      res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
    const filterRef = ref.filter((user) => user.id === currentUser.uid);
    const friendsRef = filterRef.map((item) => item.friendList)[0];

    if (friendsRef?.includes(user)) {
      const data = [...friendsRef];
      const newData = data.filter((el) => el !== user);
      await dispatch(addFriend(currentUser.uid, newData));
    } else {
      const data = [...friendsRef, user];
      await dispatch(addFriend(currentUser.uid, data));
    }
    dataArray();
  };
  return (
    <IconButton onClick={handleAddFriend}>
      {userRef?.includes(user) ? (
        <HowToRegRoundedIcon
          sx={{
            padding: "5px",
            borderRadius: "50%",
            background: "green",
            color: "#fff",
          }}
        />
      ) : (
        <PersonAddAlt1RoundedIcon sx={{ padding: "5px" }} />
      )}
    </IconButton>
  );
}
