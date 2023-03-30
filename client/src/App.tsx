import "./App.css";
import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login/login";
import { Home } from "./pages/Home/home";
import { Dashboard } from "./pages/Dashboard/dashboard";
import { Account } from "./pages/Account/account";
import { SignUp } from "./pages/SignUp/signup";

const App: React.FC = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/signup" element={<SignUp />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/account" element={<Account />}/>
    </Routes>
  </Router>
  );
};

export default App;