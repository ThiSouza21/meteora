/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { api } from "../src/api";
import { AxiosResponse } from "axios";
import { ISuccess } from "../interfaces/ISuccess";
import { IError } from "../interfaces/IError";
import { InputLogin } from "../Components/InputLogin.tsx";
import { useError } from "../hooks/useError.tsx";

const WrapperContainerSign = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  height: auto;
  min-height: 100svh;
`;

const WrapperHeroSign = styled.div`
  background-color: #b5e0bc;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100svh;

  > img {
    height: clamp(2em, 20svw, 60em);
  }

  @media screen and (max-width: 700px) {
    display: none;
  }
`;

const WrapperFormSign = styled.div`
  background-color: #ffffff;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100svh;
  gap: 1em;

  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;

const ContainerFormSign = styled.div`
  background-color: #ffffff;
  width: 100%;
  max-width: min(80%, 98em);
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: clamp(1em, 4svw, 5em);

  > form {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    gap: clamp(0.3em, 1svw, 2em);
    width: 100%;
  }

  > form input {
    width: 100%;
    padding: 0.8em 1.4em;
    font-size: clamp(0.8em, 1svw, 2.8em);
    border-radius: 2px;
    border: none;
    background-color: #ecf2f7;
  }
`;

const TitleContainerSign = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: start;

  > h1 {
    font-weight: 600;
    font-size: clamp(1.8em, 2.8svw, 4.8em);
  }

  > p {
    font-size: clamp(0.8em, 1svw, 2.6em);
  }
`;

const ContainerButton = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
  gap: 1em;
  > button {
    width: 100%;
    padding: 0.8em;
    margin-top: 3em;
    font-size: clamp(0.6em, 1svw, 2.8em);
    border-radius: 2px;
    border: none;
    background-color: #74fd8b;
  }

  > p {
    font-size: clamp(0.7em, 1svw, 2.6em);
  }

  > p > span > a {
    color: #74fd8b;
    text-decoration: none;
  }
`;

export function Sign() {
  const inputRefName = useRef<HTMLInputElement | null>(null);
  const inputRefEmail = useRef<HTMLInputElement | null>(null);
  const inputRefPasword = useRef<HTMLInputElement | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, setError } = useError();
  const navigate = useNavigate();

  useEffect(() => {
    if (!initialized) {
      setInitialized(true);
      return;
    }

    if (!nome.length) {
      setError((prev) => ({ ...prev, nome: "Digite seu nome!" }));
    } else {
      setError((prev) => ({ ...prev, nome: "" }));
    }
  }, [nome]);

  useEffect(() => {
    if (!initialized) {
      setInitialized(true);
      return;
    }

    if (!email.length) {
      setError((prev) => ({ ...prev, email: "Digite seu email!" }));
    } else {
      setError((prev) => ({ ...prev, email: "" }));
    }
  }, [email]);

  useEffect(() => {
    if (!initialized) {
      setInitialized(true);
      return;
    }

    if (!password.length) {
      setError((prev) => ({ ...prev, password: "Digite sua senha!" }));
    } else {
      setError((prev) => ({ ...prev, password: "" }));
    }
  }, [password]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    inputName: string,
    inputEmail: string,
    inputPassword: string
  ) => {
    e.preventDefault();

    if (!inputName || !inputEmail || !inputPassword) {
      return;
    }

    if (!inputEmail.length && !inputPassword.length && !inputName.length) {
      setError((prev) => ({
        ...prev,
        nome: "Digite seu nome!",
        email: "Digite seu email!",
        password: "Digite sua senha!",
      }));
      return;
    }

    if (!inputEmail.length && !inputPassword.length) {
      setError((prev) => ({
        ...prev,
        email: "Digite seu email!",
        password: "Digite sua senha!",
      }));
      return;
    }

    if (!inputName.length && !inputEmail.length) {
      setError((prev) => ({
        ...prev,
        nome: "Digite seu nome!",
        email: "Digite seu email!",
      }));
      return;
    }

    if (!inputName.length && !inputPassword.length) {
      setError((prev) => ({
        ...prev,
        nome: "Digite seu nome!",
        password: "Digite sua senha!",
      }));
      return;
    }

    if (!inputName.length) {
      setError((prev) => ({ ...prev, nome: "Digite seu nome!" }));
      return;
    }

    if (!inputEmail.length) {
      setError((prev) => ({ ...prev, email: "Digite seu email!" }));
      return;
    }
    if (!inputPassword.length) {
      setError((prev) => ({ ...prev, password: "Digite sua senha!" }));
      return;
    }

    const name = inputName;
    const email = inputEmail;
    const password = inputPassword;

    try {
      const dataResponse: AxiosResponse<ISuccess> | AxiosResponse<IError> =
        await api().post(
          "/usuarios",
          JSON.stringify({
            nome: name,
            email,
            senha: password,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

      if ("error" in dataResponse.data) {
        const { error } = dataResponse.data;
        throw new Error(error.message);
      }

      const { success } = dataResponse.data;

      localStorage.setItem("token", success.accessToken);
      setError({});

      api().defaults.headers.Authorization = success.accessToken;
      navigate("/login");
    } catch (error) {
      if (error instanceof Error) {
        return console.log(error.message);
      }

      return alert(error);
    }
  };

  return (
    <WrapperContainerSign>
      <WrapperHeroSign>
        <img src="/assets/login/image-hero-login.svg" alt="Imagem Sign" />
      </WrapperHeroSign>
      <WrapperFormSign>
        <ContainerFormSign>
          <TitleContainerSign>
            <h1>Bem vindo!</h1>
            <p>Faça seu cadastro para acessar a plataforma.</p>
          </TitleContainerSign>
          <form
            action="/auth/sign"
            method="post"
            onSubmit={(e) => handleSubmit(e, nome, email, password)}
          >
            <InputLogin
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              nameLabel="Nome"
              ref={inputRefName}
              type="text"
              placeholder="Digite seu nome..."
              error={error.nome ? { message: error.nome, type: "text" } : null}
            />
            <InputLogin
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              nameLabel="Email"
              type="email"
              ref={inputRefEmail}
              placeholder="Digite seu email..."
              error={
                error.email ? { message: error.email, type: "email" } : null
              }
            />

            <InputLogin
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              nameLabel="Senha"
              type="password"
              ref={inputRefPasword}
              placeholder="Digite sua senha..."
              error={
                error.password
                  ? { message: error.password, type: "password" }
                  : null
              }
            />

            <ContainerButton>
              <button className="buttonLogin" type="submit">
                Enviar
              </button>
              <p>
                Já tem uma conta?{" "}
                <span>
                  <NavLink to="/login">Logar-se</NavLink>
                </span>
              </p>
            </ContainerButton>
          </form>
        </ContainerFormSign>
      </WrapperFormSign>
    </WrapperContainerSign>
  );
}
