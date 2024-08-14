import React, { createContext, useEffect, useState } from "react";
import { api } from "../src/api.tsx";
import { ISuccess } from "../interfaces/ISuccess.ts";
import { IError } from "../interfaces/IError.ts";
import { AxiosResponse } from "axios";
import { useError } from "../hooks/useError.tsx";
import { jwtDecode } from "jwt-decode";

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
    setLoading(false);

    const token = localStorage.getItem("token");

    const checkToken = () => {
      if (token) {
        try {
          const decoded = jwtDecode(token);
          const now = Date.now() / 1000;

          const isTokenExpired = decoded.exp ? decoded.exp < now : true;

          if (isTokenExpired) {
            return handleLogout();
          }

          api().defaults.headers.Authorization = `Bearer ${token}`;
          setAuthorization(true);
        } catch (error) {
          if (error) handleLogout();
        }
      }

      setLoading(false);
    };

    checkToken();
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
          }
        );
      console.log("3");

      if ("error" in dataResponse.data) {
        const { error } = dataResponse.data;
        throw new Error(error.message);
      }

      const { success } = dataResponse.data;

      localStorage.setItem("token", success.accessToken);
      api().defaults.headers.Authorization = success.accessToken;
      setError({});
      setLoading(false);
      setAuthorization(true);
      navigate("/home");
    } catch (error) {
      setAuthorization(false);
      setLoading(false);

      if (error instanceof Error) {
        return console.log(error.message);
      }

      return alert(error);
    }
  };

  const handleLogout = () => {
    setLoading(true);

    setAuthorization(false);
    localStorage.removeItem("token");
    api().defaults.headers.Authorization = "";
    setLoading(false);
  };

  return (
    <ContextAuthorization.Provider
      value={{ authorization, handleLogin, loading }}
    >
      {children}
    </ContextAuthorization.Provider>
  );
}
