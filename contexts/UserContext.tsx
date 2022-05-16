import { createContext, FC, ReactNode, useState } from "react";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";

interface UserContextData {
  userName: string;
  verifyUser: () => void;
  isLoggedIn: () => void;
  resetUser: () => void;
}

interface TokenPayload {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface Props {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextData);

const UserContextProvider: FC<Props> = ({ children }) => {
  const [userName, setUserName] = useState("");
  const router = useRouter();

  const verifyUser = () => {
    const token = window.localStorage.getItem("token");

    if (!token) {
      setUserName("");
      router.push("/");
      return;
    }

    const payload: TokenPayload = jwt_decode(token);
    setUserName(payload.user.name);
  };

  const resetUser = () => {
    setUserName("");
  };

  const isLoggedIn = () => {
    const token = window.localStorage.getItem("token");

    if (token) {
      router.push("/cryptofile");
    }
  };

  return (
    <UserContext.Provider
      value={{ userName, verifyUser, isLoggedIn, resetUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
