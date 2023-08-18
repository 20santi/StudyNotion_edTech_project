import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/FogotPassword";
import ConformationPage from "./pages/ConformationPage";
import UpdatePassword from "./pages/UpdatePassword";
import CompleteUpdatePassword from "./pages/CompleteUpdatePassword";
import Navbar from "./Comon/Navbar";
import Dashboard from "./pages/Dashboard";
import EnrolledCourses from "./components/Core/Dashboard/EnrolledCourses";
import PrivateRoute from "./components/Core/Auth/Privateroute";
import MyProfile from "./components/Core/Dashboard/MyProfile";
import Setting from "./components/Core/Dashboard/Settings";
import { useSelector } from "react-redux";
import AddCourse from "./components/Core/Dashboard/AddCourse";

function App() {

  const {user} = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col">
      <div>
        <Navbar/>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup/>}/>
        <Route path="verify-email" element={<VerifyEmail/>}/>
        <Route path="forgot-password" element={<ForgotPassword/>}/>
        <Route path="/conformationPage/:email" element={<ConformationPage/>}/>
        <Route path="update-password/:id" element={<UpdatePassword/>}/>
        <Route path="/password-updated" element={<CompleteUpdatePassword/>}/>
        <Route path="myprofile" element={<MyProfile/>}/>

        {/* nested routes */}
        <Route element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        }>
          <Route path="dashboard/my-profile" element={<MyProfile/>}/>
          <Route path="dashboard/settings" element={<Setting/>}/>
          <Route path="dashboard/enrolled-courses" element={<EnrolledCourses/>}/>

          { token && (
            user.accountType === "Instructor" && (
              <Route path="dashboard/add-course" element={<AddCourse/>}/>
            ))
          }
        </Route>
      </Routes>
    </div>
  );
}

export default App;
