// /*
import "./style.scss"
import { router } from "./Routes"
import { RouterProvider } from "react-router-dom"
import { AuthProvider } from "./features/auth/auth_context"
import { InterviewProvider } from "./features/interview/interviewcontext"

function App() {

  return (
    <AuthProvider>
      <InterviewProvider>
        <RouterProvider router={router} />
      </InterviewProvider>
    </AuthProvider>
  )
}

export default App
// */

// import Homepage from "./Components/Homepage"
// import Resume_home from "./Components/Resume_home";

// function App() {

//   return (
//     <main>
//       {/* <Homepage /> */}
//       {/* <Resume_home /> */}

//     </main>
//   )
// }

// export default App