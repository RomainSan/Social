//React
import { useContext, useState, useEffect } from "react";
//Mui
import {
  Card,
  CardActions,
  CardHeader,
  Avatar,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
//Provider
import { UserContext } from "../User/User";
//Components
import AddFriend from "../AddFriend/AddFriend";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../actions/user.action";

export default function Users() {
  const { currentUser } = useContext(UserContext);
  const usersArray = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("No user");

  const handleSearchUser = async (e) => {
    if (e.length >= 3) {
      dispatch(getUsers(e.toLowerCase()));
    } else {
      dispatch(getUsers());
    }
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
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TextField
          sx={{ margin: "0 auto" }}
          onChange={(e) => handleSearchUser(e.target.value)}
          label="username"
          id="field"
        ></TextField>
      </Box>
      {usersArray?.length > 0 ? (
        usersArray.map(
          (item, index) =>
            item.id !== currentUser.uid && (
              <Card
                key={index}
                sx={{
                  my: 2,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <CardHeader
                  title={item.pseudo}
                  avatar={<Avatar />}
                  sx={{ textTransform: "capitalize" }}
                />
                <CardActions>
                  <AddFriend user={item}/>
                </CardActions>
              </Card>
            )
        )
      ) : (
        <Typography color="primary.light" sx={{ my: 5, textAlign: "center" }}>
          {message}
        </Typography>
      )}
    </Box>
  );
}
