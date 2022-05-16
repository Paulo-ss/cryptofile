import { FC } from "react";
import styles from "./Button.module.scss";

interface Props {
  type: "button" | "submit" | "reset";
  title: string;
  color: "success" | "info" | "danger";
}

const Button: FC<Props> = ({ type, title, color }) => {
  return (
    <button className={`${styles.button} ${styles[color]}`} type={type}>
      {title}
    </button>
  );
};

export default Button;
