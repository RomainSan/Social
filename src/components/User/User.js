//React
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//Firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/firebase.config";
export const UserContext = createContext();

export function UserContextProvider(props) {
  const [currentUser, setCurrentUser] = useState();
  const [loadingData, setLoadingData] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
      setLoadingData(false);
    });

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, navigate }}>
      {!loadingData && props.children}
    </UserContext.Provider>
  );
}
