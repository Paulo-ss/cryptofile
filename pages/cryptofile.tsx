import type { NextPage } from "next";
import Head from "next/head";
import { useContext, useEffect } from "react";
import EncryptFiles from "../components/encryptFiles/EncryptFiles";
import FormContainer from "../components/util/formContainer/FormContainer";
import { UserContext } from "../contexts/UserContext";

const Cryptofile: NextPage = () => {
  const { verifyUser } = useContext(UserContext);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  return (
    <>
      <Head>
        <title>Encriptografar Arquivos - Cryptofile</title>
        <meta name="description" content="Encriptografar arquivos" />
      </Head>

      <FormContainer>
        <EncryptFiles />
      </FormContainer>
    </>
  );
};

export default Cryptofile;
