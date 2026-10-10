import { createBrowserRouter } from "react-router-dom";
import Signup from "./features/auth/pages/Signup";
import Login from "./features/auth/pages/Login";
import Protected_auth from "./features/auth/components/Protected_auth";
import IR_Home from "./features/interview/pages/Home";
import Interview_user from "./features/interview/pages/interview";
import Resume_home from "./Components/Resume_home";
import Homepage from "./Components/Homepage";


export const router = createBrowserRouter([
    // Login-page
    { path: "/login", element: <Login /> },

    // SignUp-page
    { path: "/signup", element: <Signup /> },

    // InterviewReport-HomePage
    { path: "/InterviewReport-Home", element: <Protected_auth> <IR_Home/> </Protected_auth> },

    // InterviewReport-User
    { path: "/interview/:interviewID", element: <Protected_auth> <Interview_user/> </Protected_auth> },

    // Resume Home-page
    { path: "/resume", element: <Protected_auth> <Resume_home/> </Protected_auth> },
    
    // Main Home-page
    { path: "/", element:<Homepage/>}

]) 
