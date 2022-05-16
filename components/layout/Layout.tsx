import { FC, ReactNode } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Container from "../util/container/Container";
import Notification from "../util/notification/Notification";
import styles from "./Layout.module.scss";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className={styles.app}>
      <Container>
        <Header />

        <main className={styles.appMainContent}>
          <Notification />

          {children}
        </main>

        <Footer />
      </Container>
    </div>
  );
};

export default Layout;
