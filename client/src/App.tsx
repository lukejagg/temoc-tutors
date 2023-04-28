import "./App.css";
import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login/login";
import { Home } from "./pages/Home/home";
import { Account } from "./pages/Account/account";
import { SignUp } from "./pages/SignUp/signup";
import { TutorLogin } from "./pages/Tutor Login/tutor-login";
import { TutorSearch } from "./pages/TutorSearch/tutor-search";
import { TutorSignUp } from "./pages/TutorSignUp/tutor-sign-up";
import { TutorConfirm } from "./pages/TutorSearch/components/tutor-confirm";
import Meeting from './components/meeting/meeting';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/tutorlogin" element={<TutorLogin />} />
        <Route path="/tutorsearch" element={<TutorSearch />} />
        <Route path = "/tutorsignup" element={<TutorSignUp/>}/>
        <Route path="/account" element={<Account />}/>
        <Route path="/meet" element={<Meeting />} />
        <Route path="/confirmation/appointment" element={<TutorConfirm />} />
      </Routes>
    </Router>
  );
};

export default App;
