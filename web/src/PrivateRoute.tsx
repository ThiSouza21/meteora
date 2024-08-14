import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type PrivateRouteProps = {
  element: React.ReactElement;
  isPrivate?: boolean;
};

export function PrivateRoute({ element, isPrivate }: PrivateRouteProps) {
  const { authorization, loading } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (isPrivate && !authorization) {
    return <Navigate to="/login" />;
  }

  return element;
}
