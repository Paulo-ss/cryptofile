import { FC, useContext, useEffect } from "react";
import styles from "./Notification.module.scss";
import { FetchContext } from "../../../contexts/FetchContext";

interface Props {
  notificationObject?: {
    closeNotification: () => void;
    message: string;
    color: "success" | "info" | "danger";
  };
}

const Notification: FC<Props> = ({ notificationObject }) => {
  const { data, error, isNotificationOpened } = useContext(FetchContext);

  useEffect(() => {
    if (notificationObject) {
      setTimeout(() => {
        notificationObject.closeNotification();
      }, 3000);
    }
  }, [notificationObject]);

  if (notificationObject) {
    return (
      <div
        className={`${styles.notification} ${styles[notificationObject.color]}`}
      >
        {notificationObject.message}
      </div>
    );
  }

  return (
    <>
      {error && isNotificationOpened && (
        <div className={`${styles.notification} ${styles.danger}`}>{error}</div>
      )}

      {data && isNotificationOpened && (
        <div className={`${styles.notification} ${styles.success}`}>
          {data.message || "Bem-vindo ao Cryptofile!"}
        </div>
      )}
    </>
  );
};

export default Notification;
