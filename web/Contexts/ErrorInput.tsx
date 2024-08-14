import React, { createContext, ReactNode, useState } from "react";

interface Props {
  children?: ReactNode;
}

interface AuthContextType {
  error: { email?: string; password?: string; nome?: string };
  setError: React.Dispatch<
    React.SetStateAction<{ email?: string; password?: string; nome?: string }>
  >;
}

export const ContextErrorInput = createContext<AuthContextType | undefined>(
  undefined
);

export function ErrorInputContext({ children }: Props) {
  const [error, setError] = useState<{
    email?: string;
    password?: string;
    nome?: string;
  }>({});

  return (
    <ContextErrorInput.Provider value={{ error, setError }}>
      {children}
    </ContextErrorInput.Provider>
  );
}
