import { FormEvent, useContext, useEffect, useState } from "react";
import { FetchContext } from "../../contexts/FetchContext";
import Button from "../util/button/Button";
import Input from "../util/input/Input";
import styles from "./LoginRegisterForm.module.scss";
import Loading from "../util/loading/Loading";
import { useRouter } from "next/router";

const LoginRegisterForm = () => {
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [nameRegister, setNameRegister] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const { isLoading, data, request, resetData } = useContext(FetchContext);
  const router = useRouter();

  useEffect(() => {
    if (data?.token) {
      window.localStorage.setItem("token", data.token);
      resetData();
      router.push("/cryptofile");
    }
  }, [data, router, resetData]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    await request("http://192.168.1.32/user-auth", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailLogin,
        password: passwordLogin,
      }),
    });
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    await request("http://192.168.1.32/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameRegister,
        email: emailRegister,
        password: passwordRegister,
      }),
    });
  };

  return (
    <>
      <div className={styles.loginRegisterContainer}>
        <form className={styles.form} onSubmit={handleLogin}>
          <h3>Entrar</h3>

          <Input
            type="email"
            id="email"
            label="E-Mail"
            value={emailLogin}
            onChange={(e: any) => setEmailLogin(e.target.value)}
          />
          <Input
            type="password"
            id="password"
            label="Senha"
            value={passwordLogin}
            onChange={(e: any) => setPasswordLogin(e.target.value)}
          />

          <Button type="submit" title="Entrar" color="success" />
        </form>

        <span className={styles.divider}></span>

        <form className={styles.form} onSubmit={handleRegister}>
          <h3>Cadastrar</h3>

          <Input
            type="text"
            id="name"
            label="Nome"
            value={nameRegister}
            onChange={(e: any) => setNameRegister(e.target.value)}
          />
          <Input
            type="email"
            id="email"
            label="E-Mail"
            value={emailRegister}
            onChange={(e: any) => setEmailRegister(e.target.value)}
          />
          <Input
            type="password"
            id="password"
            label="Senha"
            value={passwordRegister}
            onChange={(e: any) => setPasswordRegister(e.target.value)}
          />

          <Button type="submit" title="Cadastrar" color="success" />
        </form>
      </div>

      {isLoading && <Loading />}
    </>
  );
};

export default LoginRegisterForm;
