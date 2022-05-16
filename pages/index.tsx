import type { NextPage } from "next";
import Head from "next/head";
import { useContext, useEffect } from "react";
import LoginRegisterForm from "../components/LoginRegisterForm/LoginRegisterForm";
import FormContainer from "../components/util/formContainer/FormContainer";
import { UserContext } from "../contexts/UserContext";

const Home: NextPage = () => {
  const { isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    isLoggedIn();
  }, [isLoggedIn]);

  return (
    <>
      <Head>
        <title>Entrar / Cadastrar - Cryptofile</title>
        <meta name="description" content="Cryptofile" />
      </Head>

      <FormContainer>
        <LoginRegisterForm />
      </FormContainer>
    </>
  );
};

export default Home;
