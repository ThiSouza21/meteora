import { useContext } from "react";
import { ContextAuthorization } from "../Contexts/AuthContext.tsx";

export function useAuth() {
  const context = useContext(ContextAuthorization);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
