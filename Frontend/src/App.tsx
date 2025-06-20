import { Route, Routes } from "react-router-dom"
import Signup from "./pages/Signup"
import { Signin } from "./pages/Signin"
import PrivateRoute from "./components/auth/PrivateRoute"
import DashBoard from "./pages/DashBoard"
import ReportsPage from "./pages/ReportsPage"
import BudgetPage from "./pages/BudgetPage"


function App() {
  

  return (
   <Routes>
     <Route path="/" element={<Signin/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/signin" element={<Signin/>}/>
    <Route path="/dashboard" element={<PrivateRoute><DashBoard/></PrivateRoute>}/>
    <Route path="/reports" element={<PrivateRoute><ReportsPage /></PrivateRoute>} />
    <Route path="/budget" element={<BudgetPage />} />

   </Routes>
  )
}

export default App
