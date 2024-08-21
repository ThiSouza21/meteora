/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState } from "react";
import { api } from "../src/api.tsx";
import { ISuccess } from "../interfaces/ISuccess.ts";
import { IError } from "../interfaces/IError.ts";
import { AxiosResponse } from "axios";
import { useError } from "../hooks/useError.tsx";

import { useNavigate } from "react-router-dom";

interface Props {
  children?: React.ReactNode;
}

interface AuthContextType {
  authorization: boolean;
  handleLogin: (
    e: React.FormEvent<HTMLFormElement>,
    inputEmail: string,
    inputPassword: string
  ) => void;
  loading: boolean;
}

export const ContextAuthorization = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthContext({ children }: Props) {
  const [authorization, setAuthorization] = useState(false);
  const [loading, setLoading] = useState(true);
  const { setError } = useError();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await api().get("/auth/check");
        if (response.status === 200) {
          setAuthorization(true);
        } else {
          handleLogout();
          setAuthorization(false);
        }
      } catch (error) {
        if (error) {
          await handleLogout();
          setAuthorization(false);
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>,
    inputEmail: string,
    inputPassword: string
  ) => {
    e.preventDefault();

    if (!inputEmail || !inputPassword) {
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

    if (!inputEmail.length) {
      setError((prev) => ({ ...prev, email: "Digite seu email!" }));
      return;
    }
    if (!inputPassword.length) {
      setError((prev) => ({ ...prev, password: "Digite sua senha!" }));
      return;
    }

    const email = inputEmail;
    const password = inputPassword;

    setLoading(true);
    try {
      const dataResponse: AxiosResponse<ISuccess> | AxiosResponse<IError> =
        await api().post(
          "/auth/login",
          JSON.stringify({
            email,
            senha: password,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

      if ("error" in dataResponse.data) {
        const { error } = dataResponse.data;
        throw new Error(error.message);
      }

      if ("success" in dataResponse.data) {
        setError({});
        setLoading(false);
        setAuthorization(true);
        navigate("/home");
      }
    } catch (error) {
      setAuthorization(false);
      setLoading(false);

      if (error instanceof Error) {
        return console.log(error.message);
      }

      return alert(error);
    }
  };

  const handleLogout = async () => {
    setLoading(true);

    try {
      await api().get("/auth/logout");
    } catch (error) {
      if (error) {
        setAuthorization(false);
        setLoading(false);
        navigate("/login");
      }
    }
  };

  return (
    <ContextAuthorization.Provider
      value={{ authorization, handleLogin, loading }}
    >
      {children}
    </ContextAuthorization.Provider>
  );
}
