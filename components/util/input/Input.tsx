import { FC } from "react";
import styles from "./Input.module.scss";

interface Props {
  type: string;
  id: string;
  label: string;
  value?: any;
  onChange?: (e: any) => void;
}

const Input: FC<Props> = ({ type, id, label, value, onChange }) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={styles.input}
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
    </div>
  );
};

export default Input;
