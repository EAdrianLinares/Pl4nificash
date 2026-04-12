
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from './layouts/MainLayout';

import Login from './pages/login';
import Dashboard from "./pages/Dashboard"
{/*import Register from "./pages/Register";
import Movimientos from "./pages/Movimientos";*/}



function App() {
  return (
    
      <Routes>

        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />
        {/*<Route path="/register" element={<Register />} />*/}

        {/* Rutas privadas con layout */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/*<Route path="/movimientos" element={<Movimientos />} />*/}
        </Route>

      </Routes>
    

  )

}

export default App;
