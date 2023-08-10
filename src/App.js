import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import MyProfile from "./pages/MyProfile";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup/>}/>
        <Route path="verify-email" element={<VerifyEmail/>}/>
        <Route path="myprofile" element={<MyProfile/>}/>
      </Routes>
    </div>
  );
}

export default App;
