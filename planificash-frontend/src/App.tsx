import Login from './pages/login';
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard"
import PrivateRoute from './routes/PrivateRoutes';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard"
        element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
    </Routes>
  )

}

export default App;
