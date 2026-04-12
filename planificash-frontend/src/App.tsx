
import {  Routes, Route } from "react-router-dom";
import { MainLayout } from './layouts/MainLayout';
import PrivateRoute from './routes/PrivateRoutes'

import Login from './pages/login';
import Dashboard from "./pages/Dashboard"
import Register from "./pages/Register";
import Movimientos from "./pages/Movimientos";



function App() {
  return (
    
      <Routes>

        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas privadas con layout */}
        <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/movimientos" element={<Movimientos />} />
        </Route>
        </Route>

      </Routes>
    

  )

}

export default App;
