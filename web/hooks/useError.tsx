import { useContext } from "react";
import { ContextErrorInput } from "../Contexts/ErrorInput";

export function useError() {
  const context = useContext(ContextErrorInput);
  if (context === undefined) {
    throw new Error("useError must be used within an AuthProvider");
  }
  return context;
}
