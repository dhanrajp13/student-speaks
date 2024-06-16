import React from "react";
import Form from "./components/Form";
import { useAuth } from "./contexts/AuthContext";
import Admin from "./components/AdminPanel";

const App = () => {
  const [auth] = useAuth();

  return auth?.user && auth?.user?.role === "admin" ? <Admin /> : <Form />;
};

export default App;
