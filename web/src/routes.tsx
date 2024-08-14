import { Routes, Route } from "react-router-dom";

import { Login } from "../pages/Login";
import { Sign } from "../pages/Sign";
import { Home } from "../pages/Home";
import { PrivateRoute } from "./PrivateRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Route index path="login" element={<Login />} />
        <Route path="sign" element={<Sign />} />
        <Route
          path="home"
          element={<PrivateRoute isPrivate element={<Home />} />}
        />
      </Route>
    </Routes>
  );
}
