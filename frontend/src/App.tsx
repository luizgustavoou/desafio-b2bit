import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signin from "./views/Signin";
import HomeView from "./views/Home";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { auth } = useAuth();

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path={"/"} element={<Navigate to={"/signin"} />} />
          <Route
            path={"/home"}
            element={auth ? <HomeView /> : <Navigate to={"/signin"} />}
          />
          <Route
            path={"/signin"}
            element={!auth ? <Signin /> : <Navigate to={"/home"} />}
          />
          <Route path="*" element={<Navigate to={"/home"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
