//React
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
//Material
import { Box } from "@mui/material";
//Components
import HomePage from "./components/HomePage/HomePage";
import Settings from "./components/Settings/Settings";
import Users from "./components/Users/Users";
import Navigation from "./components/Navigation/Navigation";
import SignUp from "./components/SignUp";
import Login from "./components/LogIn";
//Provider
import { UserContext } from "./components/User/User";
//Firebase
function App() {
  const { currentUser } = useContext(UserContext);

  return (
    <Box className="App">
      <Navigation />
      <Routes>
        {currentUser ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/users" element={<Users />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        )}
      </Routes>
    </Box>
  );
}

export default App;
