import styles from "./Loading.module.scss";
import ReactDOM from "react-dom";

const Loading = () => {
  return ReactDOM.createPortal(
    <div className={styles.loading}>
      <span className={styles.spinner}></span>
    </div>,
    document.getElementById("loading")!
  );
};

export default Loading;
