import { FC, ReactNode } from "react";
import styles from "./FormContainer.module.scss";

interface Props {
  children: ReactNode;
}

const FormContainer: FC<Props> = ({ children }) => {
  return <section className={styles.formContainer}>{children}</section>;
};

export default FormContainer;
