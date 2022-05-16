import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import styles from "./Header.module.scss";

const Header = () => {
  const { userName, resetUser } = useContext(UserContext);
  const router = useRouter();

  const logout = () => {
    window.localStorage.removeItem("token");
    resetUser();
    router.push("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>
          <span>Crypto</span>file
        </h1>
      </div>

      <div>
        {userName ? (
          <p className={styles.logout} onClick={logout} title="Encerrar sessão">
            Olá, {userName}
          </p>
        ) : (
          "Login"
        )}
      </div>
    </header>
  );
};

export default Header;
