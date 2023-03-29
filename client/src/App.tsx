import "./App.css";
import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login/login";
import { Home } from "./pages/Home/home";
// import { Profile } from "./pages/Profile/profile";
// import { SignUp } from "./pages/SignUp/signup";

const App: React.FC = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      {/* <Route path="/profile" element={<Profile />}/>
      <Route path="/signup" element={<SignUp />}/> */}
    </Routes>
  </Router>
  );
};

export default App;
