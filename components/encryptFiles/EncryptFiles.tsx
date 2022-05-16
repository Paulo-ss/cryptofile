import styles from "./EncryptFiles.module.scss";
import CryptoJS from "crypto-js";
import { useState } from "react";
import Input from "../util/input/Input";
import Button from "../util/button/Button";
import { v4 as uuid } from "uuid";
import Loading from "../util/loading/Loading";
import Notification from "../util/notification/Notification";

const EncryptFiles = () => {
  const [encFile, setEncFile] = useState({ url: "", filename: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [isNotificationOpened, setIsNotificationOpened] = useState(false);

  const closeNotification = () => {
    setIsNotificationOpened(false);
  };

  const encrypt = (file: any) => {
    const reader = new FileReader();

    reader.onload = () => {
      const key = uuid();

      // @ts-ignore
      const wordArray = CryptoJS.lib.WordArray.create(reader.result);
      const encrypted = CryptoJS.AES.encrypt(wordArray, key).toString();

      const encFile = new Blob([encrypted]);
      const url = window.URL.createObjectURL(encFile);
      setEncFile({ url, filename: `(Encriptografado)${file.name}.txt` });
    };

    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setIsLoading(true);
    const selectedFile = e.target[0].files[0];

    if (selectedFile) {
      encrypt(selectedFile);
    }

    setIsLoading(false);
    setIsNotificationOpened(true);
  };

  return (
    <>
      {isLoading && <Loading />}

      <div className={styles.encryptFiles}>
        <form onSubmit={handleSubmit}>
          <Input
            type="file"
            id="file"
            label="Selecione um arquivo para criptografar"
            onChange={(_: any) => setIsFileSelected(true)}
          />

          {isFileSelected && (
            <Button
              type="submit"
              color="success"
              title="Criptografar arquivo"
            />
          )}
        </form>

        {encFile.url && (
          <div className={styles.downloadEncFile}>
            <a
              className={styles.downloadBtn}
              href={encFile.url}
              target="_blank"
              rel="noreferrer"
              download={encFile.filename}
            >
              Baixar arquivo criptografado
            </a>
          </div>
        )}
      </div>

      {isNotificationOpened && (
        <Notification
          notificationObject={{
            message: "Arquivo criptografado com sucesso!",
            color: "success",
            closeNotification,
          }}
        />
      )}
    </>
  );
};

export default EncryptFiles;
