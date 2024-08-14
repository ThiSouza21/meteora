import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes.tsx";
import { AuthContext } from "../Contexts/AuthContext";
import { ErrorInputContext } from "../Contexts/ErrorInput";

function App() {
  return (
    <ErrorInputContext>
      <BrowserRouter>
        <AuthContext>
          <Routes />
        </AuthContext>
      </BrowserRouter>
    </ErrorInputContext>
  );
}

export default App;
